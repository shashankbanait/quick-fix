# QuickFix Frontend

React-based frontend for the QuickFix home services platform.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Features

- User authentication (Register/Login)
- Browse and search services
- View detailed service profiles
- Book services
- Manage bookings
- Leave ratings and reviews
- Service provider dashboard
- User profile management

## Project Structure

```
src/
├── components/         # Reusable components
├── pages/             # Page components
├── services/          # API services
├── context/           # React context for state management
└── styles/            # CSS stylesheets
```

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests

## Environment Variables

Create a `.env` file in the frontend directory (if needed):

```
REACT_APP_API_URL=http://localhost:5000/api
```
