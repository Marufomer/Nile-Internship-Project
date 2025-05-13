const mongoose = require('mongoose');
require('dotenv').config();

// Get MongoDB URL from environment or use default
const mongoURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/nile';

console.log('Attempting to connect to MongoDB at:', mongoURL);

mongoose.connect(mongoURL)
.then(() => {
  console.log('✅ MongoDB connection successful!');
  
  // List collections in the database
  const db = mongoose.connection.db;
  return db.listCollections().toArray();
})
.then((collections) => {
  console.log('\nCollections in the database:');
  collections.forEach(collection => {
    console.log(`- ${collection.name}`);
  });
  
  // Check for users collection
  const hasUsersCollection = collections.some(collection => collection.name === 'users');
  
  if (hasUsersCollection) {
    // Get a count of existing users
    return mongoose.connection.db.collection('users').countDocuments();
  } else {
    console.log('\n❌ No users collection found. You may need to run the seed script.');
    return 0;
  }
})
.then((userCount) => {
  if (userCount > 0) {
    console.log(`\n✅ Found ${userCount} users in the database.`);
    console.log('If you need test accounts, run: npm run seed');
  } else if (userCount === 0) {
    console.log('\n❌ No users found in the users collection.');
    console.log('Run the seed script to create demo accounts: npm run seed');
  }
  
  // Close the connection
  return mongoose.connection.close();
})
.then(() => {
  console.log('\nMongoDB connection closed.');
  process.exit(0);
})
.catch((error) => {
  console.error('\n❌ MongoDB connection error:', error.message);
  console.log('\nPossible issues:');
  console.log('1. MongoDB service is not running');
  console.log('2. MongoDB connection URL is incorrect');
  console.log('3. Network/firewall issues');
  console.log('\nTroubleshooting steps:');
  console.log('1. Make sure MongoDB is running');
  console.log('   - Windows: net start MongoDB');
  console.log('   - macOS: brew services start mongodb-community');
  console.log('   - Linux: sudo systemctl start mongod');
  console.log('2. Check your .env file for the correct MONGODB_URL');
  console.log('3. Try connecting with MongoDB Compass to test the connection');
  
  process.exit(1);
}); 