# SETUP_INSTRUCTIONS.md - Quick Reference

## 🚀 Quick Start Guide

### Step 1: Setup Backend

```powershell
# Navigate to backend
cd "backend"

# Install dependencies
npm install

# Create .env file with your MongoDB credentials
# Edit the MONGODB_URI with your password
```

Edit `.env` file:
```
MONGODB_URI=mongodb+srv://shashankbanaittv:<YOUR_PASSWORD>@cluster0.bpjfl8w.mongodb.net/quickfix
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

Start backend:
```powershell
npm run dev
```

✅ Backend will run on: `http://localhost:5000`

---

### Step 2: Setup Frontend (New Terminal/PowerShell Window)

```powershell
# Navigate to frontend
cd "frontend"

# Install dependencies
npm install

# Start React development server
npm start
```

✅ Frontend will open at: `http://localhost:3000`

---

## 📋 What's Included

### Backend Components
✓ Express.js server with CORS support
✓ MongoDB connection with Mongoose
✓ JWT authentication & protected routes
✓ 4 MongoDB models (User, Service, Booking, Rating)
✓ Complete REST API (19 endpoints)
✓ Error handling & validation

### Frontend Components
✓ React SPA with React Router v6
✓ Authentication context (login/register/logout)
✓ 7 main pages with responsive design
✓ API service layer with Axios
✓ Protected routes for authenticated users
✓ Comprehensive styling

---

## 🔑 Key API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/services` | Browse all services |
| POST | `/api/services` | Create service (provider) |
| POST | `/api/bookings` | Book a service |
| GET | `/api/bookings/my-bookings` | View my bookings |
| POST | `/api/ratings` | Leave a review |

---

## 👥 Testing Accounts

Create accounts by registering on the app, or test with:

**Customer Account:**
- Email: customer@test.com
- Password: password123
- Type: Customer

**Provider Account:**
- Email: provider@test.com  
- Password: password123
- Type: Service Provider

---

## 🎯 Using the Application

### As a Customer
1. Register as "Customer"
2. Browse services on Services page
3. Click "View Details" on any service
4. Click "Book This Service"
5. Fill booking details and confirm
6. Check Bookings page for status
7. After booking is completed, leave a review

### As a Service Provider
1. Register as "Service Provider"
2. Go to Dashboard
3. Click "Add New Service"
4. Fill in service details
5. Click "Create Service"
6. View customer bookings on Bookings page
7. Confirm/Decline/Complete bookings

---

## 🛠️ Troubleshooting

### Backend Won't Start
```powershell
# Clear npm cache and reinstall
rm -r node_modules
npm cache clean --force
npm install

# Then try again
npm run dev
```

### MongoDB Connection Error
- Check `.env` file has correct `MONGODB_URI`
- Verify password doesn't have special characters (URL encode if needed)
- Check IP whitelist in MongoDB Atlas: https://cloud.mongodb.com/
- Ensure network access is enabled

### Port Already in Use
```powershell
# Backend on different port
$env:PORT=5001; npm run dev

# Frontend on different port
$env:PORT=3001; npm start
```

### "localhost refused to connect"
- Ensure backend is running (check terminal 1)
- Ensure frontend is running (check terminal 2)
- Try clearing browser cache
- Check firewall isn't blocking localhost

---

## 📁 File Structure

```
Quick fix/
├── backend/
│   ├── models/              # Database schemas
│   ├── controllers/         # Business logic
│   ├── routes/              # API endpoints
│   ├── middleware/          # Auth middleware
│   ├── config/              # DB connection
│   ├── server.js            # Main server file
│   ├── package.json
│   ├── .env                 # MongoDB credentials (create this)
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, ProtectedRoute
│   │   ├── pages/           # All page components
│   │   ├── services/        # API calls
│   │   ├── context/         # AuthContext
│   │   ├── styles/          # CSS
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── README.md
│   └── public/index.html
│
└── README.md                # Full documentation
```

---

## 🔐 Environment Variables

### Backend `.env` File
```
MONGODB_URI=mongodb+srv://shashankbanaittv:PASSWORD@cluster0.bpjfl8w.mongodb.net/quickfix
JWT_SECRET=your_secret_key_here_make_it_strong
PORT=5000
NODE_ENV=development
```

Replace `PASSWORD` with your MongoDB Atlas password.

---

## 📚 npm Scripts

### Backend
```bash
npm start          # Production mode
npm run dev        # Development with nodemon (auto-reload)
```

### Frontend
```bash
npm start          # Start dev server
npm run build      # Build for production
npm test           # Run tests
```

---

## 🌐 Accessing the App

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

## 📞 Endpoints Summary

**Authentication**
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)

**Services**
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service details
- `POST /api/services` - Create service (protected)
- `PUT /api/services/:id` - Update service (protected)
- `DELETE /api/services/:id` - Delete service (protected)

**Bookings**
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings/my-bookings` - Get my bookings (protected)
- `PUT /api/bookings/:id/status` - Update status (protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (protected)

**Ratings**
- `POST /api/ratings` - Create rating (protected)
- `GET /api/ratings/service/:serviceId` - Get service reviews
- `GET /api/ratings/provider/:providerId` - Get provider reviews

---

## ✅ Verification Checklist

- [ ] Node.js installed (`node --version`)
- [ ] MongoDB Atlas account created
- [ ] `.env` file created in backend folder
- [ ] MongoDB URI in `.env` is correct
- [ ] Backend dependencies installed (`npm install`)
- [ ] Backend running on port 5000
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can register new account
- [ ] Can login successfully

---

**You're all set! Happy coding! 🚀**

For detailed documentation, see `README.md` in the project root.
