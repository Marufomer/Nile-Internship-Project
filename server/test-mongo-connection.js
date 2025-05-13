const mongoose = require('mongoose');

// Connect without deprecated options
mongoose.connect('mongodb://localhost:27017/nile')
.then(() => console.log("✅ Connected to MongoDB (nile)"))
.catch((err) => {
  console.error("❌ Connection failed:", err);
  console.log("\nPossible causes:");
  console.log("1. MongoDB is not installed or not running");
  console.log("2. MongoDB is running on a different port");
  console.log("3. Network/firewall issues\n");
  
  console.log("Troubleshooting steps:");
  console.log("1. Install MongoDB from https://www.mongodb.com/try/download/community");
  console.log("2. Make sure MongoDB service is running");
  console.log("3. Check if MongoDB is accessible via MongoDB Compass");
}); 