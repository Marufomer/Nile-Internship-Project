# MongoDB Setup Guide

This guide will help you set up MongoDB for your Smart School Management System. You have two options:

## Option 1: Local MongoDB Installation

### Windows Installation
1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the installation wizard
3. Choose "Complete" installation
4. Install MongoDB as a service with the default settings
5. Install MongoDB Compass (the GUI tool) when prompted
6. Complete the installation

### Start MongoDB Service
1. Open Services app on Windows (type "services" in the start menu)
2. Find "MongoDB Server" in the list
3. Make sure it's running (if not, right-click and select "Start")

### Update .env File
Use the following in your `.env` file:
```
MONGODB_URL=mongodb://localhost:27017/nile
```

## Option 2: MongoDB Atlas (Cloud Database)

If you're having trouble with local MongoDB, you can use MongoDB Atlas (free tier):

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account
2. Create a new cluster (the free tier is sufficient)
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Select Node.js as your driver and copy the connection string
6. Replace the placeholder values in the connection string:
   - Replace `<username>` with your Atlas database username
   - Replace `<password>` with your Atlas database password
   - Replace `<dbname>` with `nile`

### Set up Database Access
1. In MongoDB Atlas, go to "Database Access" under Security
2. Click "Add New Database User"
3. Create a username and password (use a secure password and remember it)
4. Set "Database User Privileges" to "Read and Write to any database"
5. Click "Add User"

### Set up Network Access
1. Go to "Network Access" under Security
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" for development (you can restrict this later)
4. Click "Confirm"

### Update .env File
Replace the MONGODB_URL in your `.env` file with the connection string from Atlas:
```
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nile?retryWrites=true&w=majority
```
(Replace `<username>` and `<password>` with your Atlas database credentials)

## Testing the Connection

To test if your MongoDB connection is working:

```bash
cd server
node check-mongo.js
```

If you see "Connected to MongoDB successfully", you're good to go!

## Troubleshooting

If you continue to have connection issues:

1. Check firewall settings - ensure MongoDB port (27017) is not blocked
2. Verify MongoDB service is running
3. Try restarting your computer
4. For Atlas: check your IP whitelist and network connection 