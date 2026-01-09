# QuickFix API Testing Guide

## 📋 Using Postman or REST Client

This guide provides example requests for testing the QuickFix API.

---

## 🔐 Authentication Flow

### 1. Register a New User

```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "5551234567",
  "userType": "customer",
  "city": "New York",
  "state": "NY"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "customer"
  }
}
```

**Store the token for protected requests!**

---

### 2. Login

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "customer"
  }
}
```

---

### 3. Get Current User

```http
GET http://localhost:5000/api/auth/me
Authorization: Bearer <YOUR_TOKEN_HERE>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "5551234567",
    "address": null,
    "city": "New York",
    "state": "NY",
    "userType": "customer",
    "createdAt": "2025-11-15T10:00:00Z"
  }
}
```

---

### 4. Update Profile

```http
PUT http://localhost:5000/api/auth/profile
Authorization: Bearer <YOUR_TOKEN_HERE>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "phone": "5559876543",
  "address": "123 Main Street",
  "city": "Boston",
  "state": "MA",
  "zipCode": "02101"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe Updated",
    "email": "john@example.com",
    "phone": "5559876543",
    "address": "123 Main Street",
    "city": "Boston",
    "state": "MA",
    "zipCode": "02101"
  }
}
```

---

## 🔧 Services Management

### 1. Create Service (Provider Only)

```http
POST http://localhost:5000/api/services
Authorization: Bearer <PROVIDER_TOKEN>
Content-Type: application/json

{
  "serviceName": "Electrician",
  "description": "Licensed electrician with 10+ years of experience. Specializing in residential wiring, repairs, and installations.",
  "basePrice": 85,
  "experience": 10,
  "serviceArea": "Downtown Manhattan",
  "certifications": ["Licensed", "Insured", "EPA Certified"]
}
```

**Response (201):**
```json
{
  "success": true,
  "service": {
    "_id": "507f1f77bcf86cd799439012",
    "providerId": "507f1f77bcf86cd799439011",
    "serviceName": "Electrician",
    "description": "Licensed electrician...",
    "basePrice": 85,
    "experience": 10,
    "isAvailable": true,
    "serviceArea": "Downtown Manhattan",
    "certifications": ["Licensed", "Insured", "EPA Certified"],
    "rating": 0,
    "totalReviews": 0,
    "createdAt": "2025-11-15T10:30:00Z"
  }
}
```

---

### 2. Get All Services

```http
GET http://localhost:5000/api/services
```

**With filters:**
```http
GET http://localhost:5000/api/services?serviceName=Electrician&minPrice=50&maxPrice=150&search=residential
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "services": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "providerId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Smith",
        "email": "john@example.com"
      },
      "serviceName": "Electrician",
      "description": "Licensed electrician...",
      "basePrice": 85,
      "experience": 10,
      "rating": 4.8,
      "totalReviews": 12
    }
  ]
}
```

---

### 3. Get Service by ID

```http
GET http://localhost:5000/api/services/507f1f77bcf86cd799439012
```

**Response (200):**
```json
{
  "success": true,
  "service": {
    "_id": "507f1f77bcf86cd799439012",
    "providerId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Smith",
      "phone": "5551234567"
    },
    "serviceName": "Electrician",
    "description": "Licensed electrician...",
    "basePrice": 85,
    "experience": 10,
    "rating": 4.8,
    "totalReviews": 12
  }
}
```

---

### 4. Update Service

```http
PUT http://localhost:5000/api/services/507f1f77bcf86cd799439012
Authorization: Bearer <PROVIDER_TOKEN>
Content-Type: application/json

{
  "basePrice": 95,
  "isAvailable": true,
  "description": "Updated description here"
}
```

---

### 5. Delete Service

```http
DELETE http://localhost:5000/api/services/507f1f77bcf86cd799439012
Authorization: Bearer <PROVIDER_TOKEN>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

---

## 📅 Bookings Management

### 1. Create Booking (Customer Only)

```http
POST http://localhost:5000/api/bookings
Authorization: Bearer <CUSTOMER_TOKEN>
Content-Type: application/json

{
  "serviceId": "507f1f77bcf86cd799439012",
  "bookingDate": "2025-12-20",
  "bookingTime": "14:00",
  "location": "123 Main Street, New York, NY 10001",
  "description": "Need to fix the kitchen outlet and install new light fixture"
}
```

**Response (201):**
```json
{
  "success": true,
  "booking": {
    "_id": "507f1f77bcf86cd799439013",
    "customerId": "507f1f77bcf86cd799439020",
    "serviceId": "507f1f77bcf86cd799439012",
    "providerId": "507f1f77bcf86cd799439011",
    "bookingDate": "2025-12-20T00:00:00Z",
    "bookingTime": "14:00",
    "location": "123 Main Street, New York, NY 10001",
    "description": "Need to fix the kitchen outlet...",
    "estimatedCost": 85,
    "status": "pending",
    "paymentStatus": "pending",
    "createdAt": "2025-11-15T11:00:00Z"
  }
}
```

---

### 2. Get My Bookings

```http
GET http://localhost:5000/api/bookings/my-bookings
Authorization: Bearer <YOUR_TOKEN>
```

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "customerId": {
        "_id": "507f1f77bcf86cd799439020",
        "name": "Jane Doe",
        "email": "jane@example.com"
      },
      "serviceId": {
        "_id": "507f1f77bcf86cd799439012",
        "serviceName": "Electrician"
      },
      "providerId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Smith"
      },
      "bookingDate": "2025-12-20T00:00:00Z",
      "status": "confirmed",
      "estimatedCost": 85
    }
  ]
}
```

---

### 3. Update Booking Status

```http
PUT http://localhost:5000/api/bookings/507f1f77bcf86cd799439013/status
Authorization: Bearer <PROVIDER_TOKEN>
Content-Type: application/json

{
  "status": "confirmed"
}
```

**Valid statuses:** pending, confirmed, completed, cancelled

**Response (200):**
```json
{
  "success": true,
  "booking": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "confirmed",
    "updatedAt": "2025-11-15T11:30:00Z"
  }
}
```

---

### 4. Cancel Booking

```http
PUT http://localhost:5000/api/bookings/507f1f77bcf86cd799439013/cancel
Authorization: Bearer <YOUR_TOKEN>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "booking": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "cancelled"
  }
}
```

---

## ⭐ Ratings & Reviews

### 1. Create Rating (After Booking Completed)

```http
POST http://localhost:5000/api/ratings
Authorization: Bearer <CUSTOMER_TOKEN>
Content-Type: application/json

{
  "bookingId": "507f1f77bcf86cd799439013",
  "rating": 5,
  "comment": "Excellent service! John was professional, on time, and did excellent work. Highly recommended!"
}
```

**Response (201):**
```json
{
  "success": true,
  "rating": {
    "_id": "507f1f77bcf86cd799439014",
    "bookingId": "507f1f77bcf86cd799439013",
    "customerId": "507f1f77bcf86cd799439020",
    "serviceId": "507f1f77bcf86cd799439012",
    "providerId": "507f1f77bcf86cd799439011",
    "rating": 5,
    "comment": "Excellent service!...",
    "createdAt": "2025-11-15T15:00:00Z"
  }
}
```

---

### 2. Get Service Ratings

```http
GET http://localhost:5000/api/ratings/service/507f1f77bcf86cd799439012
```

**Response (200):**
```json
{
  "success": true,
  "count": 12,
  "ratings": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "customerId": {
        "_id": "507f1f77bcf86cd799439020",
        "name": "Jane Doe"
      },
      "rating": 5,
      "comment": "Excellent service!...",
      "createdAt": "2025-11-15T15:00:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439015",
      "customerId": {
        "_id": "507f1f77bcf86cd799439021",
        "name": "Bob Smith"
      },
      "rating": 4,
      "comment": "Good work...",
      "createdAt": "2025-11-14T10:00:00Z"
    }
  ]
}
```

---

### 3. Get Provider Ratings

```http
GET http://localhost:5000/api/ratings/provider/507f1f77bcf86cd799439011
```

---

### 4. Update Rating

```http
PUT http://localhost:5000/api/ratings/507f1f77bcf86cd799439014
Authorization: Bearer <CUSTOMER_TOKEN>
Content-Type: application/json

{
  "rating": 4,
  "comment": "Updated comment: Great work, overall satisfied"
}
```

---

### 5. Delete Rating

```http
DELETE http://localhost:5000/api/ratings/507f1f77bcf86cd799439014
Authorization: Bearer <CUSTOMER_TOKEN>
```

---

## 🧪 Test Scenarios

### Scenario 1: Full Customer Journey
1. Register as customer
2. Browse services (GET /services)
3. View service details (GET /services/:id)
4. Create booking (POST /bookings)
5. View booking (GET /bookings/my-bookings)
6. When completed, leave review (POST /ratings)

### Scenario 2: Provider Journey
1. Register as provider
2. Create service (POST /services)
3. Get bookings (GET /bookings/my-bookings)
4. Confirm booking (PUT /bookings/:id/status)
5. Mark complete (PUT /bookings/:id/status)
6. View ratings received (GET /ratings/provider/:id)

### Scenario 3: Search & Filter
1. Filter by service type: `?serviceName=Electrician`
2. Filter by price: `?minPrice=50&maxPrice=150`
3. Search: `?search=residential`
4. Combine filters: `?serviceName=Electrician&minPrice=50&maxPrice=150&search=residential`

---

## 📝 Headers for Protected Requests

Always include:
```
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json
```

---

## ❌ Common Error Responses

### 400 Bad Request
```json
{
  "message": "Please provide email and password"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "message": "Service not found"
}
```

### 500 Server Error
```json
{
  "message": "Internal server error"
}
```

---

## 💡 Tips

1. **Save tokens** - Copy the token from registration/login response
2. **Use Bearer prefix** - Include "Bearer " before the token
3. **Check status codes** - 201 for created, 200 for success, 4xx for client errors
4. **Valid dates** - Use YYYY-MM-DD format for booking dates
5. **Valid times** - Use HH:MM format (24-hour) for times
6. **Valid ratings** - Only 1-5 stars allowed

---

## 🔄 Workflow Example

```
1. POST /auth/register → Get TOKEN
   ↓
2. GET /services → Browse services
   ↓
3. GET /services/:id → View details
   ↓
4. POST /bookings → Create booking
   ↓
5. PUT /bookings/:id/status → Confirm (as provider)
   ↓
6. PUT /bookings/:id/status → Mark complete (as provider)
   ↓
7. POST /ratings → Leave review (as customer)
   ↓
8. GET /ratings/service/:id → View all reviews
```

---

**Happy Testing! 🎉**

For more information, see the main README.md file.
