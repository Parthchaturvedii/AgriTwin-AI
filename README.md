# 🌱 AgriTwin AI – India's Digital Twin for Every Farm

AgriTwin AI is an AI-powered smart farming platform that creates a digital twin of agricultural fields. It helps farmers monitor farm conditions, receive AI-powered recommendations, visualize farm data, and improve decision-making using modern web technologies.

---

## 🚀 Features

- 🔐 Secure JWT Authentication
- 🌾 Farm Management
- 🌳 Interactive Digital Twin
- 🤖 AI Farming Recommendations
- 🌤 Weather Monitoring
- 📊 Dashboard Analytics
- 📈 Yield Visualization
- 🗺 Interactive Farm Map
- 🌱 Crop Health Monitoring
- 📱 Responsive Modern UI

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Recharts
- React Leaflet
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js

### AI
- Google Gemini API
- Fallback AI Recommendation System

---

## 📂 Project Structure

```
AgriTwin-AI
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│
├── docs
├── ai-models
└── README.md
```

---

## ⚙ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/AgriTwin-AI.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

## 🌐 API Endpoints

### Authentication

```
POST /api/auth/register

POST /api/auth/login
```

### Farms

```
GET /api/farms

POST /api/farms
```

### Dashboard

```
GET /api/dashboard
```

### Weather

```
GET /api/weather
```

### AI Recommendation

```
POST /api/ai/recommend
```

---

## 📸 Screenshots

Add screenshots here after deployment.

- Login Page
- Dashboard
- AI Recommendation
- Digital Twin
- Farm Map

---

## 🔮 Future Scope

- Satellite imagery integration
- IoT sensor connectivity
- Drone monitoring
- Real-time disease detection
- AI-based yield prediction
- Mobile application

---

## 👨‍💻 Team

**Team Name:** GENZ31413

### Team Members

- Parth Chaturvedi
- Hardik Gupta

---

## 📄 License

This project is developed for educational and hackathon purposes.