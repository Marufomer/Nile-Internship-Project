# Setting Up Cloudinary for Image Uploads

The Smart School Management System uses Cloudinary for storing profile pictures and other images. Follow the steps below to set up Cloudinary with your project:

## 1. Create a Cloudinary Account

If you don't already have a Cloudinary account, sign up for a free account at https://cloudinary.com/users/register/free.

## 2. Get Your Cloudinary Credentials

After signing up and logging in to your Cloudinary dashboard:

1. Navigate to the Dashboard
2. Look for the "Account Details" section
3. Note down the following information:
   - Cloud Name
   - API Key
   - API Secret

## 3. Update Your .env File

Update your .env file with your Cloudinary credentials:

```env
CLOUD_NAME=your_cloud_name_here
API_KEY=your_api_key_here
API_SECRET=your_api_secret_here
```

Replace `your_cloud_name_here`, `your_api_key_here`, and `your_api_secret_here` with your actual Cloudinary credentials.

## 4. Test the Image Upload

After configuring your Cloudinary credentials, test the image upload feature when:
- Registering a new user
- Updating a user's profile picture
- Adding a student or teacher with a profile picture

If you encounter any issues with image uploads, check your server logs for Cloudinary-related errors and verify that your credentials are correctly set in the .env file.

## Need Help?

If you need help with Cloudinary setup or encounter any issues, please refer to the [Cloudinary Documentation](https://cloudinary.com/documentation) or contact the project maintainers. 