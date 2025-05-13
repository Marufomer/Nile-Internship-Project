# Setting Up Cloudinary for Profile Pictures

The profile picture functionality in this application requires Cloudinary for proper image storage and retrieval. Without proper Cloudinary setup, profile pictures will not persist properly or may not display correctly.

## What is Cloudinary?

Cloudinary is a cloud-based image and video management service that provides storage, optimization, and delivery of media assets. We use it to store and serve user profile pictures.

## Steps to Configure Cloudinary

1. **Create a free Cloudinary account**
   - Visit [Cloudinary's registration page](https://cloudinary.com/users/register/free)
   - Complete the registration process
   - No credit card is required for the free plan

2. **Get your Cloudinary credentials**
   - After registration, log in to your Cloudinary dashboard
   - The dashboard will show your Cloud Name, API Key, and API Secret
   - These are the credentials you need to configure in our application

3. **Update your application's .env file**
   - We've created a utility script to make this easy
   - Run the following command from the `server` directory:
   
   ```
   node update-cloudinary-env.js YOUR_CLOUD_NAME YOUR_API_KEY YOUR_API_SECRET
   ```
   
   - Replace `YOUR_CLOUD_NAME`, `YOUR_API_KEY`, and `YOUR_API_SECRET` with your actual Cloudinary credentials

4. **Restart your application**
   - After updating the credentials, restart your application for the changes to take effect

## Troubleshooting

If you encounter any issues with profile picture uploads:

1. Verify that your Cloudinary credentials in the `.env` file are correct
2. Check the console output for any error messages related to Cloudinary
3. Make sure your Cloudinary account is active and the free tier limits haven't been reached

## Temporary Workaround

We've implemented a temporary workaround to allow the application to function without Cloudinary credentials, but:

- Profile pictures will only persist for the current session
- Images will not be properly optimized
- The solution is not suitable for production use

For the best experience, please configure Cloudinary as described above. 