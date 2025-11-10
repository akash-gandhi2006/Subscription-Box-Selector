# Airtel Subscription Box Selector - Setup Guide

## Quick Start

Follow these steps to get the project running on your local machine:

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Step 1: Clone and Navigate
```bash
cd airtel-subscription-box
```

### Step 2: Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   Create a `.env` file in the backend directory with:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/airtel-subscription
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FRONTEND_URL=http://localhost:3000
   ```

4. Start MongoDB (if using local installation):
   ```bash
   # On Windows
   mongod
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

5. Seed the database with sample plans:
   ```bash
   npm run seed
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

   The backend will be running on http://localhost:5000

### Step 3: Frontend Setup

1. Open a new terminal and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

   The frontend will be running on http://localhost:3000

### Step 4: Test the Application

1. Open http://localhost:3000 in your browser
2. Register a new account
3. Login with your credentials
4. Browse and select subscription plans
5. Subscribe to a plan

## API Testing

You can test the API endpoints using tools like Postman or curl:

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Get Plans
```bash
curl http://localhost:5000/api/subscriptions/plans
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check if the connection string in `.env` is correct
- For MongoDB Atlas, use the connection string from your cluster

### Port Already in Use
- Change the PORT in `.env` file
- Kill processes using the ports: `npx kill-port 3000 5000`

### CORS Issues
- Ensure the FRONTEND_URL in `.env` matches your frontend URL
- Check that both servers are running

### Module Not Found Errors
- Run `npm install` in both frontend and backend directories
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Development

### Backend Development
- Use `npm run dev` for development with auto-restart
- Check console logs for errors
- API documentation is in the README.md

### Frontend Development
- Use `npm start` for development server
- Check browser console for errors
- React DevTools recommended for debugging

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong JWT_SECRET
3. Configure MongoDB Atlas
4. Set up proper CORS origins
5. Use environment variables for all sensitive data

## Support

If you encounter any issues:
1. Check the console logs in both frontend and backend
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Check that all dependencies are installed

Happy coding! 🚀 