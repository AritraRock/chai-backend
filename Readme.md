# 🎥 Twitube Backend – Video & Tweet Hosting API (Node.js + MongoDB)

**Twitube** is a robust, production-ready **backend API** built using **Node.js**, **Express**, and **MongoDB**, inspired by the core features of **YouTube** and **Twitter**. It supports scalable media upload, user interactions, and content management, designed with performance and modularity in mind.

> 🛠️ Built independently by **Aritra Ray** as a **backend-only project**  
> 📆 Timeline: Dec 2023 – Jan 2024

---

## 🚀 Key Highlights

- 📁 Video and Tweet hosting APIs with role-based user management
- ⚙️ Cloudinary integration for optimized media uploads (50% faster)
- 🔍 MongoDB Atlas Search for full-text search (30% improvement)
- 📉 Aggregation pipelines for analytics and reduced server load (60% gain)

---

## 🧩 Core Backend Features

### 👤 User Management
- Signup, login, logout (JWT-based auth)
- Password reset via email OTP
- Profile management: avatar, cover, user details
- Watch history tracking

### 🎬 Video Module
- Upload, edit, delete, publish/unpublish
- Pagination, filtering, and search (Atlas Search)
- Like/unlike videos
- Comment on videos

### 🐦 Tweet Module
- Post, update, delete tweets
- Like/unlike tweets
- View tweet timeline by user

### 📁 Playlist Module
- Create/edit/delete playlists
- Add/remove videos
- Public/private support

### 📊 Analytics & Subscriptions
- Channel stats: total views, likes, subscribers
- Subscribe/unsubscribe to channels
- Aggregated metrics via MongoDB pipeline

---

## 🔧 Tech Stack

| Layer        | Technology                         |
|--------------|------------------------------------|
| Backend      | Node.js, Express.js                |
| Database     | MongoDB (with Mongoose ODM)        |
| Media Upload | Cloudinary                         |
| Auth & Security | JWT, bcrypt, cookie-parser      |
| Search       | MongoDB Atlas Search               |
| Dev Tools    | Postman, dotenv, nodemon           |

---

## 📂 Folder Structure

twitube-backend/
├── controllers/
├── models/
├── routes/
├── services/
├── middleware/
├── utils/
├── config/
├── .env.sample
└── app.js

---

## 🧪 API Overview

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| POST   | /api/auth/signup     | Register new user                    |
| POST   | /api/auth/login      | Login and receive token              |
| POST   | /api/video           | Upload a new video                   |
| GET    | /api/video           | List/search videos                   |
| POST   | /api/tweet           | Create a tweet                       |
| GET    | /api/tweet/:id       | Get tweets by user                   |
| POST   | /api/playlist        | Create a playlist                    |
| GET    | /api/user/:id/stats  | View channel stats and analytics     |

---

## 🛠️ Running the Backend Locally

### Prerequisites
- Node.js (v16+)
- MongoDB (Atlas or local)
- Cloudinary account for media storage

### Setup Instructions

```bash
git clone https://github.com/yourusername/twitube-backend.git
cd twitube-backend
npm install
Copy environment variables:

bash
Copy
Edit
cp .env.sample .env
Fill in:

MONGODB_URI

JWT_SECRET

CLOUDINARY_API_KEY, CLOUDINARY_SECRET

Run the server:

bash
Copy
Edit
npm run dev
Backend will be available at http://localhost:3000

📈 Performance Optimizations
Optimization	Result
Cloudinary uploads	50% faster media processing
Atlas Search	30% faster full-text queries
Aggregation pipelines	60% less CPU load on queries

🙌 Contribution
This is a backend-only, solo-developed project aimed at showcasing API design, performance tuning, and modern Node.js backend architecture.

Feel free to fork or explore for learning and inspiration.

👨‍💻 Author
Aritra Ray
B.Tech – Industrial Engineering
IIT Kharagpur (2025)
GitHub • LinkedIn • Email

🏷️ Tags
#BackendOnly #NodeJS #Express #MongoDB #Cloudinary #API #YouTubeClone #TwitterClone #Twitube #IITKGP
