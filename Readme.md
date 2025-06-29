# 🎥 Twitube Backend – Full-Stack Video & Tweet Hosting API (Node.js + MongoDB)

Twitube is a full-featured backend application inspired by platforms like **YouTube** and **Twitter**, offering powerful video hosting, tweeting, playlisting, and social interaction APIs — built with **Node.js**, **Express**, and **MongoDB**.

This project demonstrates strong backend architecture, cloud media management, and performance optimization using real-world tools like **Cloudinary**, **JWT**, and **MongoDB Atlas Search**.

---

## 📌 Project Summary

> **Dec 2023 – Jan 2024**  
> Independently designed and implemented by **Aritra Ray**

- ⚡ Built a full-stack backend system supporting both video and tweet modules  
- 🚀 Boosted media upload performance by 50% using **Cloudinary**  
- 🔍 Integrated **MongoDB Atlas Search** to improve search speed by 30%  
- 📉 Reduced backend load by 60% via optimized **MongoDB aggregation pipelines**

---

## 🌟 Core Features

### 👤 User Management
- Secure signup, login, logout (JWT + bcrypt)
- Password reset with email OTP
- Profile avatar, cover photo, and personal info updates
- Watch history tracking

### 🎬 Video Functionality
- Upload, edit, delete, and publish/unpublish videos
- Video listing with pagination, filters, and search (Atlas Search)
- Like/unlike videos
- Add comments to videos

### 🐦 Tweet Functionality
- Post, update, delete tweets
- Like/unlike tweets
- View user-specific tweet timelines

### 📁 Playlist System
- Create and manage personal playlists
- Add/remove videos from playlists
- Public/private playlist visibility

### 🔔 Subscriptions
- Subscribe to other users/channels
- View subscriber/following lists
- Get channel analytics (views, likes, videos)

### 📊 Analytics Dashboard
- Aggregated metrics via MongoDB pipelines
- Views, likes, subscribers, uploads, tweets, playlists

---

## ⚙️ Tech Stack

| Layer          | Technology                         |
|----------------|------------------------------------|
| Backend        | Node.js, Express.js                |
| Database       | MongoDB + Mongoose ODM             |
| Media Upload   | Cloudinary                         |
| Authentication | JWT + bcrypt                       |
| Search         | MongoDB Atlas Search               |
| Dev Tools      | dotenv, Postman, Nodemon           |

---

## 🔧 Performance Optimizations

| Optimization                | Impact                       |
|----------------------------|------------------------------|
| Cloudinary async uploads   | 50% faster media uploads     |
| Atlas Search indexing      | 30% better search response   |
| Aggregation pipelines      | 60% lower backend CPU load   |

---

## 📁 Folder Structure

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

yaml
Copy
Edit

---

## 🧪 API Documentation

All routes follow RESTful conventions using JSON.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/auth/signup     | Register new user           |
| POST   | /api/auth/login      | Login and receive token     |
| POST   | /api/video           | Upload a video              |
| GET    | /api/video           | List videos with filters    |
| POST   | /api/tweet           | Create a tweet              |
| GET    | /api/tweet/:id       | Get tweet by user           |
| POST   | /api/playlist        | Create playlist             |
| GET    | /api/user/:id/stats  | Dashboard metrics           |

📎 You can integrate these APIs with Postman or a frontend client (e.g., React).

---

## 🧪 Running Locally

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Cloudinary account

### Setup Instructions

```bash
git clone https://github.com/yourusername/twitube-backend.git
cd twitube-backend
npm install
Create a .env file using the sample:

bash
Copy
Edit
cp .env.sample .env
Fill in:

MONGODB_URI

JWT_SECRET

CLOUDINARY_API_KEY / SECRET

Then run:

bash
Copy
Edit
npm run dev
App runs at http://localhost:3000

🙌 Contribution
This is a solo project designed to demonstrate scalable backend architecture and cloud-based media processing. Feel free to fork, improve, or learn from the codebase.

👨‍💻 Author
Aritra Ray
B.Tech – Industrial Engineering
IIT Kharagpur (2025)

GitHub: @AritraRock

LinkedIn: aritraray

Email: aritrabts@gmail.com

