const fs = require('fs');
const path = require('path');

// Create content for .env file
const envContent = `PORT=5003
MONGODB_URL=mongodb+srv://username:password@cluster0.mongodb.net/nile?retryWrites=true&w=majority
JWT_SECRET=schoolmanagementniletech123
CLOUD_NAME=your_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
`;

const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('.env file created successfully at:', envPath);
  console.log('Content:');
  console.log(envContent);
  console.log('\nIMPORTANT: Using the "nile" database as specified.');
} catch (error) {
  console.error('Error creating .env file:', error);
} 