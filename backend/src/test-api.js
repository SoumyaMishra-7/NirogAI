const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API configuration - Using the Medical Diagnosis API from RapidAPI
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const API_BASE_URL = 'https://medical-diagnosis-api.p.rapidapi.com';
const API_HOST = 'medical-diagnosis-api.p.rapidapi.com';

// Debug function to check configuration
const checkConfig = () => {
  console.log('=== API CONFIGURATION CHECK ===');
  console.log('RAPIDAPI_KEY exists:', !!RAPIDAPI_KEY);
  console.log('RAPIDAPI_KEY starts with:', RAPIDAPI_KEY ? RAPIDAPI_KEY.substring(0, 10) + '...' : 'None');
  console.log('API_BASE_URL:', API_BASE_URL);
  console.log('API_HOST:', API_HOST);
  console.log('================================');
};

// Call this when server starts
checkConfig();

// Analyze symptoms endpoint
app.post('/api/analyze-symptoms', async (req, res) => {
  console.log('\n=== NEW SYMPTOM ANALYSIS REQUEST ===');
  console.log('Request body received:', JSON.stringify(req.body, null, 2));
  
  try {
    const { symptoms, additionalInfo } = req.body;
    
    // Check if we have the required API key
    if (!RAPIDAPI_KEY || RAPIDAPI_KEY === 'your_rapidapi_key_here') {
      console.error('ERROR: Missing or invalid RapidAPI key');
      return res.status(500).json({ 
        error: 'API not configured properly',
        details: 'Missing RapidAPI key' 
      });
    }

    // Prepare request data according to the API documentation
    const requestData = {
      symptoms: symptoms.filter(s => s.isSelected).map(s => s.name),
      patientInfo: {
        age: 30, // You should collect this from users in a real app
        gender: "unknown",
        height: 170, // Default values - collect from users in real app
        weight: 70,
        medicalHistory: [],
        currentMedications: [],
        allergies: [],
        lifestyle: {
          smoking: false,
          alcohol: "occasional",
          exercise: "moderate",
          diet: "balanced"
        }
      },
      lang: "en"
    };

    console.log('Preparing API request with data:', JSON.stringify(requestData, null, 2));
    
    const options = {
      method: 'POST',
      url: `${API_BASE_URL}/analyzeSymptomsAndDiagnose`,
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': API_HOST
      },
      data: requestData,
      timeout: 15000 // 15 second timeout
    };

    console.log('Making API request to:', options.url);
    
    // Make request to the API
    const response = await axios.request(options);
    console.log('API response status:', response.status);
    console.log('API response data:', JSON.stringify(response.data, null, 2));
    
    // Process the response from the API
    if (response.data.status === 'success' && response.data.result) {
      const apiResult = response.data.result;
      
      const result = {
        conditions: apiResult.analysis.possibleConditions.map(condition => ({
          id: condition.condition.replace(/\s+/g, '_').toLowerCase(),
          name: condition.condition,
          accuracy: mapRiskLevelToAccuracy(condition.riskLevel),
          description: condition.description
        })),
        selfCareTips: [
          ...(apiResult.analysis.generalAdvice.recommendedActions || []),
          ...(apiResult.analysis.generalAdvice.lifestyleConsiderations || [])
        ],
        warningSigns: apiResult.analysis.generalAdvice.whenToSeekMedicalAttention || [],
        recommendedSpecialists: ['General Practitioner'] // Default, could be enhanced based on conditions
      };
      
      console.log('Processed result:', JSON.stringify(result, null, 2));
      res.json(result);
    } else {
      throw new Error('Invalid response format from API');
    }
    
  } catch (error) {
    console.error('ERROR in symptom analysis:');
    
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('API response error:', error.response.status);
      console.error('API response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    
    // Fallback to mock data if API fails
    console.log('Using fallback data due to API error');
    const mockResults = getFallbackResponse();
    res.json(mockResults);
  }
});

// Helper function to map risk level to accuracy percentage
function mapRiskLevelToAccuracy(riskLevel) {
  const riskMap = {
    'high': 0.8,
    'medium': 0.6,
    'low': 0.4,
    'very low': 0.2
  };
  return riskMap[riskLevel.toLowerCase()] || 0.5;
}

// Fallback response generator
function getFallbackResponse() {
  return {
    conditions: [
      { id: 'c_1', name: 'Common Cold', accuracy: 0.7 },
      { id: 'c_2', name: 'Seasonal Allergies', accuracy: 0.3 }
    ],
    selfCareTips: [
      'Get plenty of rest and stay hydrated',
      'Use over-the-counter pain relievers if needed',
      'Monitor your symptoms for changes'
    ],
    warningSigns: [
      'Difficulty breathing or shortness of breath',
      'Persistent pain or pressure in the chest',
      'Symptoms that worsen after several days'
    ],
    recommendedSpecialists: ['General Practitioner'],
    _fallback: true
  };
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Symptom Checker API is running',
    config: {
      hasApiKey: !!RAPIDAPI_KEY,
      apiKeyLength: RAPIDAPI_KEY ? RAPIDAPI_KEY.length : 0,
      apiBaseUrl: API_BASE_URL,
      apiHost: API_HOST
    }
  });
});

// Test endpoint to verify RapidAPI connection
app.get('/api/test-connection', async (req, res) => {
  try {
    // Try a simple request to check connection
    const response = await axios.get(`${API_BASE_URL}/getMedicalInformation`, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': API_HOST
      },
      params: {
        condition: 'common cold',
        lang: 'en'
      },
      timeout: 10000
    });
    
    res.json({
      status: 'Connected',
      apiStatus: response.status,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      status: 'Connection failed',
      error: error.message,
      details: error.response ? error.response.data : 'No response received'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`Connection test available at: http://localhost:${PORT}/api/test-connection`);
});