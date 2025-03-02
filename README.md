Skill-Share

Introduction

Skill-Share is a community-driven platform designed to help users share and enhance their skills through collaboration. Users can join communities, post images, comment on posts, like content, and authenticate via GitHub or email/password. The platform fosters engagement by enabling users to interact with others who share similar interests.

🚀 Project Features

1. User Authentication

-Secure registration and login using email/password.

-GitHub authentication via OAuth.

-Token-based authentication for secure API access.

2. Profile Management

Users can create and customize their profiles.

Upload and manage profile pictures.

Fetch user profiles by username.

3. Community Features

Users can create and join communities.

View all available communities.

4. Post Management

Upload images.

Retrieve all user-uploaded posts.

5. Comment & Like System

Users can comment on posts.

Retrieve all comments for a post.

Like photos to show appreciation.

6. Password Management

OTP-based registration.

Forgot and reset password functionalities.

🏗️ Project Type

Fullstack

📌 Repository Link

GitHub Repository

🖥️ Directory Structure

SKILL-SHARE/
├─ backend/
│  ├─ app.js
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ config/
├─ frontend/
│  ├─ src/
│  ├─ components/
│  ├─ pages/

🛠️ Installation & Getting Started

Backend Setup

cd backend
npm install
npm start

Frontend Setup

cd frontend
npm install
npm start

📡 API Endpoints

GET Requests

/getprofile - Get user profile

/getUserProfileByName/:username - Get profile by username

/getMyPosts - Retrieve user’s uploaded posts

/getAllComments/:postId - Get comments for a specific post

/getCommunity - Retrieve all available communities

POST Requests

/otp-register - Send OTP for registration

/sign-in - Register a user

/log-in - Login a user

/forgotPassword - Send reset password link

/resetPassword - Reset user password

/uploadPost - Upload an image

/commentPost/:postId - Comment on a post

/likePhoto/:postId - Like a photo

/makeCommunity - Create a new community

/joinCommunity/:name - Join a community

🏗️ Technology Stack

Backend: Node.js, Express.js, MongoDB, Mongoose

Authentication: Passport.js, JWT, OAuth (GitHub)

File Uploads: Multer, Cloudinary

Security: Argon2 for password hashing

Email Service: Nodemailer

Frontend: React, Tailwind CSS

Deployment: Render (Backend), Netlify (Frontend)

🎯 Future Enhancements

Implement real-time notifications for comments and likes.

Add a search feature to find specific communities and users.

Improve UI/UX for better user engagement.

🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

📜 License

This project is licensed under the ISC License.
