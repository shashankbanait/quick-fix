# QuickFix Backend

QuickFix backend API built with Express.js and MongoDB.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend folder with your MongoDB URI:
```
MONGODB_URI=mongodb+srv://shashankbanaittv:<db_password>@cluster0.bpjfl8w.mongodb.net/quickfix
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `GET /api/services/provider/:providerId` - Get services by provider
- `POST /api/services` - Create service (protected)
- `PUT /api/services/:id` - Update service (protected)
- `DELETE /api/services/:id` - Delete service (protected)

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings/my-bookings` - Get user's bookings (protected)
- `GET /api/bookings/:id` - Get booking details (protected)
- `PUT /api/bookings/:id/status` - Update booking status (protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (protected)

### Ratings
- `GET /api/ratings/service/:serviceId` - Get service ratings
- `GET /api/ratings/provider/:providerId` - Get provider ratings
- `POST /api/ratings` - Create rating (protected)
- `GET /api/ratings/my-ratings` - Get my ratings (protected)
- `PUT /api/ratings/:id` - Update rating (protected)
- `DELETE /api/ratings/:id` - Delete rating (protected)
