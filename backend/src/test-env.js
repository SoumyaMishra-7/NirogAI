// backend/src/test-env.js
require('dotenv').config();

console.log('=== ENVIRONMENT VARIABLES CHECK ===');
console.log('RAPIDAPI_KEY exists:', !!process.env.RAPIDAPI_KEY);
console.log('RAPIDAPI_KEY value:', process.env.RAPIDAPI_KEY ? process.env.RAPIDAPI_KEY.substring(0, 10) + '...' : 'NOT FOUND');
console.log('PORT:', process.env.PORT || 'Not set (using default)');
console.log('===================================');

// Test the API key format
if (process.env.RAPIDAPI_KEY) {
  const key = process.env.RAPIDAPI_KEY;
  console.log('Key length:', key.length);
  console.log('Key starts with:', key.substring(0, 10));
  console.log('Key looks like RapidAPI key:', key.startsWith('rapidapi') || key.length > 30);
}