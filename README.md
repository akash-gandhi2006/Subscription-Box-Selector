# Subscription Box Selector

A full-stack MERN application for selecting and managing  subscription plans with user authentication, admin panel, and payment simulation.

## 🚀 Features

### User Features
- **User Authentication**: Register, login, and logout functionality
- **User Dashboard**: View account information and subscription status
- **Subscription Plans**: Browse and select from various plans
- **Payment Simulation**: Realistic payment flow with card and UPI options
- **Profile Management**: Update personal information
- **Subscription Management**: Cancel subscriptions and view history

### Admin Features
- **Admin Panel**: Complete plan management interface
- **Plan Management**: Create, update, and delete subscription plans
- **Feature Management**: Add/remove plan features dynamically
- **Status Control**: Activate/deactivate plans
- **Popular Plans**: Mark plans as popular for better visibility

### Technical Features
- **Responsive Design**: Modern UI that works on all devices
- **Real-time Updates**: Live subscription status updates
- **Secure Authentication**: JWT-based authentication with bcrypt
- **Input Validation**: Comprehensive form validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Smooth loading animations

## 🛠️ Tech Stack

### Frontend
- React.js 18
- React Router DOM for navigation
- Axios for API calls
- CSS3 with modern animations
- Responsive design with CSS Grid/Flexbox

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
- CORS and Helmet for security

## 📁 Project Structure

```
airtel-subscription-box/
├── frontend/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── SubscriptionPlans.js
│   │   │   ├── AdminPanel.js
│   │   │   ├── PaymentModal.js
│   │   │   └── Navbar.js
│   │   ├── context/         # Authentication context
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/                  # Node.js backend
│   ├── models/              # Mongoose models
│   │   ├── User.js
│   │   └── SubscriptionPlan.js
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   └── subscriptions.js
│   ├── middleware/          # Custom middleware
│   │   └── auth.js
│   ├── config/              # Configuration
│   │   └── config.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── setup.bat               # Windows setup script
├── setup.md                # Detailed setup guide
└── README.md
```

## ⚡ Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Automated Setup (Windows)
1. Double-click `setup.bat` to run the automated setup script
2. Follow the prompts to complete the installation

### Manual Setup

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd airtel-subscription-box/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
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

#### Frontend Setup
1. Open a new terminal and navigate to frontend directory:
   ```bash
   cd airtel-subscription-box/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 👤 Default Credentials

### Admin User
- Email: admin@airtel.com
- Password: admin123

### Regular User
- Register a new account or use:
- Email: user@example.com
- Password: password123

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Subscriptions
- `GET /api/subscriptions/plans` - Get all active plans
- `GET /api/subscriptions/plans/:id` - Get specific plan
- `POST /api/subscriptions/subscribe` - Subscribe to a plan (protected)
- `GET /api/subscriptions/my-subscription` - Get user's subscription (protected)
- `POST /api/subscriptions/cancel` - Cancel subscription (protected)

### Admin Routes
- `POST /api/subscriptions/plans` - Create new plan (admin only)
- `PUT /api/subscriptions/plans/:id` - Update plan (admin only)
- `DELETE /api/subscriptions/plans/:id` - Delete plan (admin only)

## 🎨 Features Overview

### User Dashboard
- View account information
- Check subscription status
- Update profile details
- Quick actions for common tasks

### Subscription Plans
- Browse available plans
- Compare features and pricing
- Select and subscribe to plans
- Payment simulation with multiple options

### Admin Panel
- Complete plan management
- Dynamic feature configuration
- Plan status control
- Popular plan marking

### Payment System
- Credit/Debit card simulation
- UPI payment option
- Secure payment flow
- Real-time processing feedback

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation with express-validator
- CORS configuration
- Helmet for security headers
- Protected routes with middleware
- Secure payment simulation

## 🎯 Usage Guide

### For Users
1. Register a new account or login
2. Browse available subscription plans
3. Select a plan and complete payment
4. Manage your subscription from the dashboard
5. Update profile information as needed

### For Admins
1. Login with admin credentials
2. Access the admin panel
3. Create and manage subscription plans
4. Configure plan features and pricing
5. Monitor plan performance

## 🚀 Development

### Backend Development
- Use `npm run dev` for development with auto-restart
- Check console logs for errors
- API documentation is in the README.md

### Frontend Development
- Use `npm start` for development server
- Check browser console for errors
- React DevTools recommended for debugging

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
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

## 📦 Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong JWT_SECRET
3. Configure MongoDB Atlas or production database
4. Set up proper CORS origins
5. Use environment variables for all sensitive data
6. Build frontend: `npm run build`
7. Serve static files from backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes.

## 🆘 Support

If you encounter any issues:
1. Check the console logs in both frontend and backend
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Check that all dependencies are installed
5. Review the troubleshooting section above

Happy coding! 🚀 