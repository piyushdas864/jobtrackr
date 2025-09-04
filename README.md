# JobTrackr (Fullstack)

A job tracking application. 
Built using React for frontend and (Express + MongoDB) for backend.

A complete job tracking application with 'React' frontend and (Express + MongoDB) backend.  
This repo contains both frontend and backend, ready to run locally.

---

## 🚀 Features
- User authentication with **JWT**
- Add, update, and delete job applications
- Track interview stages and statuses
- Role-based access control (admin vs user)
- MongoDB database for persistence

---

## 🛠️ Tech Stack
**Frontend:** React, Styled-components  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Auth:** JWT-based authentication  

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/jobtrackr.git
cd jobtrackr
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env   
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm start
```

---

## 🔑 Environment Variables
Create a `.env` file in the backend folder based on `.env.example`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---



## 📌 Future Improvements
- Adding job application reminders via email
- Analytics dashboard for tracking job hunt progress
---