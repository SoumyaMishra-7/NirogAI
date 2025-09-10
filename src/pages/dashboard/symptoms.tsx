import React, { useState, useEffect } from 'react';

interface Symptom {
  id: string;
  name: string;
  isSelected: boolean;
}

interface Condition {
  id: string;
  name: string;
  accuracy: number;
}

interface AnalysisResult {
  conditions: Condition[];
  selfCareTips: string[];
  warningSigns: string[];
  recommendedSpecialists: string[];
}

const SymptomChecker: React.FC = () => {
  // Predefined symptoms list
  const initialSymptoms: Symptom[] = [
    { id: 's_1', name: 'Fever', isSelected: false },
    { id: 's_2', name: 'Headache', isSelected: false },
    { id: 's_3', name: 'Cough', isSelected: false },
    { id: 's_4', name: 'Sore throat', isSelected: false },
    { id: 's_5', name: 'Fatigue', isSelected: false },
    { id: 's_6', name: 'Nausea', isSelected: false },
    { id: 's_7', name: 'Muscle aches', isSelected: false },
    { id: 's_8', name: 'Runny nose', isSelected: false },
    { id: 's_9', name: 'Shortness of breath', isSelected: false },
    { id: 's_10', name: 'Chest pain', isSelected: false },
    { id: 's_11', name: 'Dizziness', isSelected: false },
    { id: 's_12', name: 'Loss of appetite', isSelected: false },
    { id: 's_13', name: 'Skin rash', isSelected: false },
    { id: 's_14', name: 'Joint pain', isSelected: false },
  ];

  // State management
  const [symptoms, setSymptoms] = useState<Symptom[]>(initialSymptoms);
  const [customSymptom, setCustomSymptom] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  // Toggle symptom selection
  const toggleSymptom = (id: string) => {
    setSymptoms(symptoms.map(symptom => 
      symptom.id === id ? { ...symptom, isSelected: !symptom.isSelected } : symptom
    ));
  };

  // Add custom symptom
  const addCustomSymptom = () => {
    if (customSymptom.trim()) {
      const newSymptom: Symptom = {
        id: `custom_${Date.now()}`,
        name: customSymptom.trim(),
        isSelected: true
      };
      setSymptoms([...symptoms, newSymptom]);
      setCustomSymptom('');
    }
  };

  // Analyze symptoms using RapidAPI
  const analyzeSymptoms = async () => {
    const selectedSymptoms = symptoms.filter(s => s.isSelected);
    
    if (selectedSymptoms.length === 0 && additionalInfo.trim() === '') {
      setError('Please select at least one symptom or provide additional information');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // This would be replaced with actual API call to RapidAPI
      // For demonstration, we'll use mock data
      const mockResults: AnalysisResult = await mockApiCall(selectedSymptoms, additionalInfo);
      setResults(mockResults);
    } catch (err) {
      setError('Failed to analyze symptoms. Please try again later.');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock API call function (replace with actual RapidAPI integration)
  const mockApiCall = async (selectedSymptoms: Symptom[], info: string): Promise<AnalysisResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock results based on symptoms
    const hasFever = selectedSymptoms.some(s => s.name.toLowerCase().includes('fever'));
    const hasCough = selectedSymptoms.some(s => s.name.toLowerCase().includes('cough'));
    const hasHeadache = selectedSymptoms.some(s => s.name.toLowerCase().includes('headache'));
    
    let conditions: Condition[] = [];
    let selfCareTips: string[] = [];
    let warningSigns: string[] = [];
    let recommendedSpecialists: string[] = ['General Practitioner'];
    
    if (hasFever && hasCough) {
      conditions = [
        { id: 'c_1', name: 'Common Cold', accuracy: 0.7 },
        { id: 'c_2', name: 'Influenza (Flu)', accuracy: 0.6 },
        { id: 'c_3', name: 'COVID-19', accuracy: 0.4 }
      ];
      selfCareTips = [
        'Get plenty of rest and stay hydrated',
        'Use over-the-counter fever reducers like acetaminophen',
        'Gargle with warm salt water to soothe a sore throat',
        'Use a humidifier to ease congestion'
      ];
      warningSigns = [
        'Difficulty breathing or shortness of breath',
        'Persistent pain or pressure in the chest',
        'Confusion or inability to arouse',
        'Bluish lips or face'
      ];
      recommendedSpecialists.push('Infectious Disease Specialist');
    } else if (hasHeadache) {
      conditions = [
        { id: 'c_4', name: 'Tension Headache', accuracy: 0.8 },
        { id: 'c_5', name: 'Migraine', accuracy: 0.5 },
        { id: 'c_6', name: 'Sinus Headache', accuracy: 0.3 }
      ];
      selfCareTips = [
        'Rest in a quiet, dark room',
        'Apply a cold or warm compress to your head or neck',
        'Try relaxation techniques like deep breathing',
        'Consider over-the-counter pain relievers'
      ];
      warningSigns = [
        'Sudden, severe headache unlike any you\'ve had before',
        'Headache after a head injury',
        'Headache with fever, stiff neck, confusion, or seizures',
        'Headache that worsens despite treatment'
      ];
      recommendedSpecialists.push('Neurologist');
    } else {
      conditions = [
        { id: 'c_7', name: 'Generalized symptoms requiring evaluation', accuracy: 0.9 }
      ];
      selfCareTips = [
        'Monitor your symptoms closely',
        'Maintain a healthy diet and stay hydrated',
        'Get adequate rest and avoid stress'
      ];
      warningSigns = [
        'Symptoms that worsen or don\'t improve after a few days',
        'Development of new concerning symptoms',
        'Difficulty performing daily activities due to symptoms'
      ];
    }
    
    return {
      conditions,
      selfCareTips,
      warningSigns,
      recommendedSpecialists
    };
  };

  // Handle consultation action
  const handleConsultNow = () => {
    alert('Connecting you with a healthcare professional...');
    // In a real application, this would initiate a telemedicine consultation
  };

  // Handle appointment scheduling
  const handleScheduleAppointment = () => {
    alert('Opening appointment scheduler...');
    // In a real application, this would open a scheduling interface
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Symptom Checker</h1>
          <p className="text-blue-100">
            Get preliminary guidance about your symptoms. This tool provides information but is not a substitute for professional medical advice.
          </p>
        </div>

        <div className="p-6">
          {/* Symptoms Selection Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Your Symptoms</h2>
            <p className="text-gray-600 mb-4">Common symptoms:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {symptoms.map(symptom => (
                <div
                  key={symptom.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    symptom.isSelected
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => toggleSymptom(symptom.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                      symptom.isSelected
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-400'
                    }`}>
                      {symptom.isSelected && '✓'}
                    </div>
                    <span>{symptom.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Symptom Input */}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Add custom symptom:</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customSymptom}
                  onChange={(e) => setCustomSymptom(e.target.value)}
                  placeholder="Describe your symptom..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
                />
                <button
                  onClick={addCustomSymptom}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information (Optional)</h2>
            <p className="text-gray-600 mb-3">
              Provide any additional details about your symptoms, when they started, severity, etc.
            </p>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your symptoms in more detail, including when they started, severity, and any other relevant information..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={analyzeSymptoms}
              disabled={isLoading}
              className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : 'Analyze Symptoms'}
            </button>
            <button 
              onClick={handleConsultNow}
              className="flex-1 py-3 px-6 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Consult Now
            </button>
            <button 
              onClick={handleScheduleAppointment}
              className="flex-1 py-3 px-6 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Schedule Appointment
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Results Section */}
          {results && (
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h2>
              
              {/* Possible Conditions */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Possible Medical Conditions</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="space-y-3">
                    {results.conditions.map(condition => (
                      <li key={condition.id} className="flex items-start">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="font-semibold">{(condition.accuracy * 100).toFixed(0)}%</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">{condition.name}</span>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${condition.accuracy * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Self-Care Tips */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Self-Care Tips</h3>
                <div className="bg-green-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-2">
                    {results.selfCareTips.map((tip, index) => (
                      <li key={index} className="text-gray-700">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Warning Signs */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Warning Signs</h3>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="font-medium text-yellow-800 mb-2">
                    Seek immediate medical attention if you experience any of the following:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    {results.warningSigns.map((sign, index) => (
                      <li key={index} className="text-gray-700">{sign}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended Specialists */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Recommended Specialists</h3>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {results.recommendedSpecialists.map((specialist, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {specialist}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Professional Guidance */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Important Note</h3>
                <p className="text-gray-700">
                  This tool provides preliminary information only and is not a substitute for professional medical advice. 
                  Please consult with a healthcare professional for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;