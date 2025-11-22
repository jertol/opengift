// Configuration template for OpenGift
// Copy this to config.js and edit the values to customize for your needs

export const config = {
  // Personalization - Change this to your desired page title
  pageTitle: 'Your Name\'s Gift Registry',
  
  // Typography - Font configuration for the title
  titleFont: 'Playwrite South Africa',
  
  // Language - 'en' for English, 'fr' for French
  language: 'en',
  
  // Your email addresses for notifications - Add your email addresses here
  emails: [
    'your-email@example.com',
    'another-email@example.com'
  ],
  
  // Google Sheets configuration - Replace with your Google Sheets ID
  // Instructions: Create a Google Sheet and get the ID from the URL
  spreadsheetId: 'YOUR_GOOGLE_SHEETS_ID_HERE',
  
  // Revolut payment link - Replace with your actual Revolut link
  // Instructions: Get your Revolut.me link from the Revolut app
  revolutLink: 'https://revolut.me/yourusername',
};