# QuickFix - Full Stack Web Application

A comprehensive MERN (MongoDB, Express.js, React.js, Node.js) stack application that connects customers with trusted local service professionals (Electricians, Plumbers, Carpenters, Painters, and Home Cleaning experts).

## 🌟 Features

### For Customers
- 🔍 Browse and search for service providers by type, price, and location
- ⭐ View detailed profiles with ratings and reviews
- 📅 Book services with date, time, and location preferences
- 💬 Leave reviews and ratings after service completion
- 👤 Manage profile and booking history

### For Service Providers
- 🏪 Create and manage service listings
- 📊 View bookings and customer requests
- ⭐ Receive customer ratings and feedback
- 📈 Build reputation through reviews
- 🎯 Set pricing and service areas

### Core Features
- 🔐 Secure JWT-based authentication
- 🛡️ Role-based access control (Customer/Provider)
- 🔍 Advanced search and filtering
- 📱 Responsive design for all devices
- ⚡ Real-time booking updates

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** express-validator
- **Password Hashing:** bcryptjs

### Frontend
- **Library:** React.js
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Styling:** Custom CSS

## 📋 Project Structure

```
QuickFix/
├── backend/
│   ├── models/              # MongoDB schemas
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Booking.js
│   │   └── Rating.js
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── serviceController.js
│   │   ├── bookingController.js
│   │   └── ratingController.js
│   ├── routes/              # API endpoints
│   │   ├── authRoutes.js
│   │   ├── serviceRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── ratingRoutes.js
│   ├── middleware/
│   │   └── auth.js          # JWT verification
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── server.js            # Express app entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   │   ├── Navbar.js
    │   │   └── ProtectedRoute.js
    │   ├── pages/           # Page components
    │   │   ├── Home.js
    │   │   ├── Register.js
    │   │   ├── Login.js
    │   │   ├── Services.js
    │   │   ├── ServiceDetail.js
    │   │   ├── Bookings.js
    │   │   ├── Profile.js
    │   │   └── Dashboard.js
    │   ├── services/
    │   │   └── api.js       # API calls
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── styles/
    │   │   └── Navbar.css
    │   ├── App.js
    │   ├── index.js
    │   └── public/
    │       └── index.html
    ├── package.json
    ├── README.md
    └── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in backend directory:**
   ```
   MONGODB_URI=mongodb+srv://shashankbanaittv:<db_password>@cluster0.bpjfl8w.mongodb.net/quickfix
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   PORT=5000
   NODE_ENV=development
   ```

   **Important:** Replace `<db_password>` with your actual MongoDB Atlas password

4. **Start the backend server:**
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory (in a new terminal):**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

   The frontend will automatically open at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "5551234567",
  "userType": "customer", // or "provider"
  "city": "New York",
  "state": "NY"
}

Response: { success: true, token: "...", user: {...} }
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { success: true, token: "...", user: {...} }
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>

Response: { success: true, user: {...} }
```

#### Update Profile
```
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "phone": "5559876543",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001"
}

Response: { success: true, user: {...} }
```

### Services Endpoints

#### Get All Services
```
GET /services?serviceName=Electrician&minPrice=50&maxPrice=200&search=residential

Response: { success: true, count: 10, services: [...] }
```

#### Get Service by ID
```
GET /services/:id

Response: { success: true, service: {...} }
```

#### Create Service (Protected)
```
POST /services
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceName": "Electrician",
  "description": "Licensed electrician with 10 years experience",
  "basePrice": 75,
  "experience": 10,
  "serviceArea": "Downtown",
  "certifications": ["Licensed", "Insured"]
}

Response: { success: true, service: {...} }
```

#### Update Service (Protected)
```
PUT /services/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "basePrice": 85,
  "isAvailable": true
}

Response: { success: true, service: {...} }
```

#### Delete Service (Protected)
```
DELETE /services/:id
Authorization: Bearer <token>

Response: { success: true, message: "Service deleted successfully" }
```

### Bookings Endpoints

#### Create Booking (Protected)
```
POST /bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceId": "...",
  "bookingDate": "2025-12-25",
  "bookingTime": "14:00",
  "location": "123 Main St, New York",
  "description": "Need electrical repair"
}

Response: { success: true, booking: {...} }
```

#### Get My Bookings (Protected)
```
GET /bookings/my-bookings
Authorization: Bearer <token>

Response: { success: true, count: 5, bookings: [...] }
```

#### Update Booking Status (Protected)
```
PUT /bookings/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "confirmed" // pending, confirmed, completed, cancelled
}

Response: { success: true, booking: {...} }
```

#### Cancel Booking (Protected)
```
PUT /bookings/:id/cancel
Authorization: Bearer <token>

Response: { success: true, message: "Booking cancelled successfully", booking: {...} }
```

### Ratings Endpoints

#### Create Rating (Protected)
```
POST /ratings
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookingId": "...",
  "rating": 5,
  "comment": "Excellent service, very professional"
}

Response: { success: true, rating: {...} }
```

#### Get Service Ratings
```
GET /ratings/service/:serviceId

Response: { success: true, count: 10, ratings: [...] }
```

#### Get Provider Ratings
```
GET /ratings/provider/:providerId

Response: { success: true, count: 15, ratings: [...] }
```

## 🎯 Key Features Explained

### 1. Authentication & Authorization
- JWT tokens issued on login/register
- Tokens stored in localStorage on frontend
- Protected routes check authentication status
- Token verified on protected endpoints

### 2. Service Listings
- Providers can create/edit/delete services
- Customers can browse and filter services
- Search by service type, price, and keywords
- Ratings updated automatically from reviews

### 3. Booking System
- Customers can book services with specific date/time
- Providers can confirm or decline bookings
- Status tracking: pending → confirmed → completed
- Payment status tracking

### 4. Rating & Review System
- Only customers of completed bookings can rate
- Ratings automatically update service average
- Can be updated or deleted by reviewer
- Display reviews on service detail page

## 🧪 Testing the Application

### Test Account (Customer)
```
Email: customer@example.com
Password: password123
```

### Test Account (Provider)
```
Email: provider@example.com
Password: password123
```

### Manual Testing Steps

1. **Register & Login:**
   - Go to /register and create new accounts
   - Test both customer and provider roles
   - Try login with wrong credentials

2. **Browse Services:**
   - Visit /services page
   - Test filters and search
   - Click on service details

3. **Book Service:**
   - Log in as customer
   - Select a service
   - Fill booking form
   - Check bookings page

4. **Provider Dashboard:**
   - Log in as provider
   - Create new service
   - Update service details
   - View bookings

5. **Ratings:**
   - Complete a booking
   - Leave a rating on completed booking
   - Verify rating updates service average

## 🔐 Security Considerations

- Passwords hashed with bcryptjs
- JWT tokens with 30-day expiration
- Protected routes require authentication
- Password field excluded from API responses
- CORS configured for localhost
- MongoDB validation on all inputs

## 📈 Performance Optimization

- Database queries include specific fields
- Pagination ready (can be added to list endpoints)
- Indexed fields on commonly queried data
- Response compression with gzip
- Client-side caching with localStorage

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB Atlas connection string in `.env`
- Check if IP is whitelisted in MongoDB Atlas
- Ensure password doesn't contain special characters (or URL encode)

### CORS Error
- Backend CORS is configured for all origins
- Ensure frontend is calling correct backend URL

### Frontend Can't Connect to Backend
- Verify backend is running on port 5000
- Check network tab in browser DevTools
- Ensure `.env` proxy or API URL is correct

### Authentication Not Working
- Clear localStorage and try again
- Check token in browser DevTools → Application
- Verify JWT_SECRET in backend `.env`

## 🚀 Deployment

### Backend (Heroku/Railway)
1. Create git repository
2. Push to deployment platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Update API URL for production
2. Build React app
3. Deploy to hosting platform

## 📝 Next Steps & Enhancements

- [ ] Add image upload for profiles and services
- [ ] Implement real-time chat between customer and provider
- [ ] Add payment gateway integration
- [ ] Email notifications for bookings
- [ ] SMS updates for customers
- [ ] Advanced analytics for providers
- [ ] Admin dashboard
- [ ] Service completion photos/evidence
- [ ] Availability calendar for providers
- [ ] Service categories and subcategories

## 💡 Learning Outcomes

This project covers:
- MERN stack fundamentals
- RESTful API design
- JWT authentication
- MongoDB schema design
- React hooks and context
- Protected routes
- Error handling
- Form validation
- Database relationships

## 📄 License

MIT License - feel free to use for learning and development

## 🤝 Support

For issues or questions:
1. Check backend/README.md and frontend/README.md
2. Review API documentation above
3. Check MongoDB Atlas dashboard for database status
4. Verify all environment variables are set correctly

---

**Happy Coding! 🎉**

Built with ❤️ as a learning project for full-stack development.
