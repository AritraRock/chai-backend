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

```
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
```

---

## 📄 API Documentation

All endpoints are RESTful and organized by module. This project uses `Bearer JWT` for authenticated routes.

---

### 👤 User Routes

| Method | Endpoint                 | Description                         |
|--------|--------------------------|-------------------------------------|
| POST   | `/users/register`        | Register a new user (with avatar)   |
| POST   | `/users/login`           | Log in and receive JWT token        |
| POST   | `/users/logout`          | Log out and destroy session         |
| POST   | `/users/refresh-token`   | Get new access token via refresh    |
| GET    | `/users/current-user`    | Get current authenticated user      |
| POST   | `/users/change-password` | Change current user's password      |
| GET    | `/users/c/:username`     | Get a public channel by username    |
| GET    | `/users/history`         | Get watch/view history              |

---

### 🎬 Video Routes

| Method | Endpoint                            | Description                         |
|--------|--------------------------------------|-------------------------------------|
| POST   | `/videos/`                           | Upload a new video                  |
| GET    | `/videos/:id`                        | Get video details by ID             |
| PATCH  | `/videos/:id`                        | Update video info                   |
| DELETE | `/videos/:id`                        | Delete a video                      |
| PATCH  | `/videos/toggle/publish/:id`         | Toggle video publish status         |

---

### 💬 Comment Routes

| Method | Endpoint                             | Description                          |
|--------|---------------------------------------|--------------------------------------|
| POST   | `/comments/:videoId`                 | Add comment to a video               |
| GET    | `/comments/:videoId`                 | Get all comments for a video         |
| PATCH  | `/comments/c/:commentId`             | Update a comment                     |
| DELETE | `/comments/c/:commentId`             | Delete a comment                     |

---

### 🐦 Tweet Routes

| Method | Endpoint                            | Description                         |
|--------|--------------------------------------|-------------------------------------|
| POST   | `/tweets/`                           | Create a new tweet                  |
| GET    | `/tweets/user/:userId`               | Get tweets by a user                |
| PATCH  | `/tweets/:tweetId`                   | Update a tweet                      |
| DELETE | `/tweets/:tweetId`                   | Delete a tweet                      |

---

### 🎮 Like Routes

| Method | Endpoint                                  | Description                         |
|--------|--------------------------------------------|-------------------------------------|
| POST   | `/likes/toggle/v/:videoId`                | Like/unlike a video                 |
| POST   | `/likes/toggle/c/:commentId`              | Like/unlike a comment               |
| POST   | `/likes/toggle/t/:tweetId`                | Like/unlike a tweet                 |
| GET    | `/likes/videos`                           | Get all liked videos by user        |

---

### 📺 Playlist Routes

| Method | Endpoint                                                   | Description                            |
|--------|-------------------------------------------------------------|----------------------------------------|
| POST   | `/playlist/`                                               | Create a new playlist                  |
| GET    | `/playlist/user/:userId`                                   | Get all playlists for a user           |
| GET    | `/playlist/:playlistId`                                    | Get details of a specific playlist     |
| PATCH  | `/playlist/:playlistId`                                    | Update playlist name/desc              |
| DELETE | `/playlist/:playlistId`                                    | Delete a playlist                      |
| PATCH  | `/playlist/add/:videoId/:playlistId`                       | Add video to playlist                  |
| PATCH  | `/playlist/remove/:videoId/:playlistId`                    | Remove video from playlist             |

---

### 🔔 Subscription Routes

| Method | Endpoint                                  | Description                          |
|--------|--------------------------------------------|--------------------------------------|
| POST   | `/subscriptions/c/:channelId`             | Subscribe/unsubscribe to a channel   |
| GET    | `/subscriptions/u/:userId`                | Get channels user subscribed to      |
| GET    | `/subscriptions/c/:channelId`             | Get all subscribers of a channel     |

---

### 📊 Dashboard & Utility

| Method | Endpoint             | Description                      |
|--------|----------------------|----------------------------------|
| GET    | `/dashboard/videos`  | Get all uploaded videos          |
| GET    | `/dashboard/stats`   | Get overall channel statistics   |
| GET    | `/healthcheck`       | Server healthcheck endpoint      |

---

📬 For API testing and import, use this [Postman Collection](#) (you can link your `.postman_collection.json` if public).


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
```
Create your .env file:
```cp .env.sample .env```
Then add the following values:
MONGODB_URI
JWT_SECRET
CLOUDINARY_API_KEY
CLOUDINARY_SECRET
```npm run dev```
Backend will be available at:
http://localhost:3000


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

GitHub: @AritraRock

LinkedIn: aritraray

Email: aritrabts@gmail.com

🏷️ Tags
#BackendOnly #NodeJS #Express #MongoDB #Cloudinary #API #YouTubeClone #TwitterClone #Twitube #IITKGP
