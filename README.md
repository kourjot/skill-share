# 🤝 Skill-Share

## Introduction

Skill-Share is a **community-driven platform** designed to help users share and enhance their skills through collaboration. Users can:

- Join communities
- Post images
- Comment on posts
- Like content
- Authenticate via **email/password**

The platform fosters engagement by enabling users to interact with others who share similar interests.

---

## 🚀 Project Features

### 1. **User Authentication**

- 🔒 Secure registration and login using **email/password**.
- 🛡️ Token-based authentication for secure API access.

### 2. **Profile Management**

- 📝 Users can create and customize their profiles.
- 📸 Upload and manage profile pictures.
- 🔍 Fetch user profiles by username.

### 3. **Community Features**

- 👥 Users can **create** and **join** communities.
- 📜 View all available communities.

### 4. **Post Management**

- 🖼️ Upload images.
- 📤 Retrieve all user-uploaded posts.

### 5. **Comment & Like System**

- 💬 Users can **comment** on posts.
- 📝 Retrieve all comments for a post.
- ❤️ **Like** photos to show appreciation.

### 6. **Password Management**

- 🔑 OTP-based registration.
- 🔄 Forgot and reset password functionalities.

---

## Deployed App
Frontend: [https://skill-sharev8.netlify.app/](https://skill-sharev8.netlify.app/)  
Backend: [GitHub Repository](https://github.com/kourjot/skill-share/tree/main/backend)  

Database:mongodb+srv://vijaynimar:tgqH3cZeaQLrJa7w@skillshare.cwbk2.mongodb.net/?retryWrites=true&w=majority&appName=skillshare
---

---

## 🏗️ Project Type

- **Fullstack**

## 📌 Repository Link

🔗 [GitHub Repository](https://github.com/kourjot/skill-share.git)

## 🖥️ Directory Structure

```bash
SKILL-SHARE/
├─ backend/
│  ├─ app.js
│  ├─ controller/
│  ├─ middleware/
│  ├─ model/
│  ├─ router/
│  ├─ config/
├─ frontend/
│  ├─ src/
│  ├─ components/
│  ├─ pages/
```

---

## 🛠️ Installation & Getting Started

### Installation Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v18 or later) - [Download](https://nodejs.org/)
- **MongoDB** (latest version) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)
- **npm** or **yarn** (comes with Node.js)

### Backend Setup

```bash
git clone https://github.com/kourjot/skill-share.git
cd skill-share/backend
npm install
npm run test
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

### **GET Requests**

- 🔹 `/getprofile` - Get user profile
- 🔹 `/getUserProfileByName/:username` - Get profile by username
- 🔹 `/getMyPosts` - Retrieve user’s uploaded posts
- 🔹 `/getAllComments/:postId` - Get comments for a specific post
- 🔹 `/getCommunity` - Retrieve all available communities

### **POST Requests**

- 🔹 `/otp-register` - Send OTP for registration
- 🔹 `/sign-in` - Register a user
- 🔹 `/log-in` - Login a user
- 🔹 `/forgotPassword` - Send reset password link
- 🔹 `/resetPassword` - Reset user password
- 🔹 `/uploadPost` - Upload an image
- 🔹 `/commentPost/:postId` - Comment on a post
- 🔹 `/likePhoto/:postId` - Like a photo
- 🔹 `/makeCommunity` - Create a new community
- 🔹 `/joinCommunity/:name` - Join a community

---

## 🏗️ Technology Stack

### 🖥️ **Frontend:**
- ⚛️ React 19
- 🎨 Chakra UI
- 🔗 React Router v7
- 🎭 Framer Motion
- ⚡ Vite

### ⚙️ **Backend:**
- 🚀 Node.js & Express.js
- 📦 MongoDB & Mongoose

### 🔐 **Authentication & Security:**
- 🔑 JWT for secure authentication
- 🛡️ Argon2 for password hashing

### 📤 **File Uploads & Email Service:**
- 🌩️ Cloudinary for image storage
- ✉️ Nodemailer for email notifications

### 🚀 **Deployment:**
- 🌍 Backend: Render
- 💻 Frontend: Netlify

---

## 🎯 Future Enhancements

- 📢 Implement real-time notifications for comments and likes.
- 🔍 Add a search feature to find specific communities and users.
- 🎨 Improve UI/UX for better user engagement.
- 📱 Mobile responsiveness improvements.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

## 📜 License

This project is licensed under the ISC License.

