/**
 * Utility script to update Cloudinary credentials in the .env file
 * Run with: node update-cloudinary-env.js your_cloud_name your_api_key your_api_secret
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error('\x1b[31mError: Please provide all three Cloudinary credentials.\x1b[0m');
  console.log('\x1b[36mUsage: node update-cloudinary-env.js YOUR_CLOUD_NAME YOUR_API_KEY YOUR_API_SECRET\x1b[0m');
  console.log('\x1b[33mYou can find these values in your Cloudinary dashboard at https://cloudinary.com/console\x1b[0m');
  process.exit(1);
}

const [cloudName, apiKey, apiSecret] = args;

// Path to .env file
const envPath = path.join(__dirname, '.env');

try {
  // Check if .env file exists
  if (!fs.existsSync(envPath)) {
    console.error('\x1b[31mError: .env file not found.\x1b[0m');
    console.log('\x1b[36mPlease run `node create-env-file.js` first to create the .env file.\x1b[0m');
    process.exit(1);
  }

  // Read current .env file
  let envContent = fs.readFileSync(envPath, 'utf8');

  // Replace Cloudinary credentials
  envContent = envContent
    .replace(/CLOUD_NAME=.*$/m, `CLOUD_NAME=${cloudName}`)
    .replace(/API_KEY=.*$/m, `API_KEY=${apiKey}`)
    .replace(/API_SECRET=.*$/m, `API_SECRET=${apiSecret}`);

  // Write updated content back to .env file
  fs.writeFileSync(envPath, envContent);

  console.log('\x1b[32mSuccess! Cloudinary credentials updated in .env file.\x1b[0m');
  console.log('\x1b[36mRestart your server for the changes to take effect.\x1b[0m');
} catch (error) {
  console.error('\x1b[31mError updating .env file:\x1b[0m', error);
  process.exit(1);
} 