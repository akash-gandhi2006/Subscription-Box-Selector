const mongoose = require('mongoose');
const SubscriptionPlan = require('./models/SubscriptionPlan');
const User = require('./models/User');
require('dotenv').config();

const samplePlans = [
  {
    name: 'Basic Plan',
    description: 'Perfect for light internet users who need essential connectivity',
    price: 199,
    currency: 'INR',
    duration: 'monthly',
    features: [
      { name: 'Daily Data', value: '1GB', description: '1GB data per day' },
      { name: 'Calls', value: 'Unlimited', description: 'Unlimited local and STD calls' },
      { name: 'SMS', value: '100/day', description: '100 SMS per day' },
      { name: 'Airtel Thanks App', value: 'Included', description: 'Access to Airtel Thanks benefits' },
      { name: 'Customer Support', value: '24/7', description: '24/7 customer support' }
    ],
    dataLimit: {
      daily: 1,
      monthly: 30,
      unlimited: false
    },
    callFeatures: {
      unlimited: true,
      minutes: null,
      smsCount: 100
    },
    entertainment: {
      netflix: false,
      amazonPrime: false,
      disneyHotstar: false,
      otherServices: []
    },
    isPopular: false,
    isActive: true,
    maxUsers: 1,
    category: 'basic',
    color: '#e3f2fd'
  },
  {
    name: 'Premium Plan',
    description: 'Most popular choice for moderate internet usage with entertainment',
    price: 399,
    currency: 'INR',
    duration: 'monthly',
    features: [
      { name: 'Daily Data', value: '2GB', description: '2GB data per day' },
      { name: 'Calls', value: 'Unlimited', description: 'Unlimited local and STD calls' },
      { name: 'SMS', value: '100/day', description: '100 SMS per day' },
      { name: 'Airtel Thanks App', value: 'Included', description: 'Access to Airtel Thanks benefits' },
      { name: 'Netflix Basic', value: 'Included', description: 'Netflix Basic subscription' },
      { name: 'Amazon Prime', value: 'Included', description: 'Amazon Prime subscription' },
      { name: 'Customer Support', value: 'Priority', description: 'Priority customer support' }
    ],
    dataLimit: {
      daily: 2,
      monthly: 60,
      unlimited: false
    },
    callFeatures: {
      unlimited: true,
      minutes: null,
      smsCount: 100
    },
    entertainment: {
      netflix: true,
      amazonPrime: true,
      disneyHotstar: false,
      otherServices: []
    },
    isPopular: true,
    isActive: true,
    maxUsers: 1,
    category: 'premium',
    color: '#fff3e0'
  },
  {
    name: 'Entertainment Plus',
    description: 'Perfect for entertainment lovers with multiple OTT subscriptions',
    price: 599,
    currency: 'INR',
    duration: 'monthly',
    features: [
      { name: 'Daily Data', value: '3GB', description: '3GB data per day' },
      { name: 'Calls', value: 'Unlimited', description: 'Unlimited local and STD calls' },
      { name: 'SMS', value: '100/day', description: '100 SMS per day' },
      { name: 'Airtel Thanks App', value: 'Included', description: 'Access to Airtel Thanks benefits' },
      { name: 'Netflix Premium', value: 'Included', description: 'Netflix Premium subscription' },
      { name: 'Amazon Prime', value: 'Included', description: 'Amazon Prime subscription' },
      { name: 'Disney+ Hotstar', value: 'Included', description: 'Disney+ Hotstar subscription' },
      { name: 'SonyLIV', value: 'Included', description: 'SonyLIV subscription' },
      { name: 'Customer Support', value: 'Priority', description: 'Priority customer support' }
    ],
    dataLimit: {
      daily: 3,
      monthly: 90,
      unlimited: false
    },
    callFeatures: {
      unlimited: true,
      minutes: null,
      smsCount: 100
    },
    entertainment: {
      netflix: true,
      amazonPrime: true,
      disneyHotstar: true,
      otherServices: ['SonyLIV']
    },
    isPopular: false,
    isActive: true,
    maxUsers: 1,
    category: 'premium',
    color: '#fce4ec'
  },
  {
    name: 'Unlimited Plan',
    description: 'For heavy data users who need unlimited connectivity',
    price: 799,
    currency: 'INR',
    duration: 'monthly',
    features: [
      { name: 'Data', value: 'Unlimited', description: 'Unlimited data with fair usage policy' },
      { name: 'Calls', value: 'Unlimited', description: 'Unlimited local and STD calls' },
      { name: 'SMS', value: '100/day', description: '100 SMS per day' },
      { name: 'Airtel Thanks App', value: 'Included', description: 'Access to Airtel Thanks benefits' },
      { name: 'Netflix Premium', value: 'Included', description: 'Netflix Premium subscription' },
      { name: 'Amazon Prime', value: 'Included', description: 'Amazon Prime subscription' },
      { name: 'Disney+ Hotstar', value: 'Included', description: 'Disney+ Hotstar subscription' },
      { name: 'Customer Support', value: 'Premium', description: 'Premium customer support' }
    ],
    dataLimit: {
      daily: null,
      monthly: null,
      unlimited: true
    },
    callFeatures: {
      unlimited: true,
      minutes: null,
      smsCount: 100
    },
    entertainment: {
      netflix: true,
      amazonPrime: true,
      disneyHotstar: true,
      otherServices: []
    },
    isPopular: false,
    isActive: true,
    maxUsers: 1,
    category: 'unlimited',
    color: '#f3e5f5'
  },
  {
    name: 'OTT Master Plan',
    description: 'Ultimate entertainment package with all major OTT platforms',
    price: 899,
    currency: 'INR',
    duration: 'monthly',
    features: [
      { name: 'Daily Data', value: '5GB', description: '5GB data per day' },
      { name: 'Calls', value: 'Unlimited', description: 'Unlimited local and STD calls' },
      { name: 'SMS', value: '100/day', description: '100 SMS per day' },
      { name: 'Airtel Thanks App', value: 'Included', description: 'Access to Airtel Thanks benefits' },
      { name: 'Netflix Premium', value: 'Included', description: 'Netflix Premium subscription' },
      { name: 'Amazon Prime', value: 'Included', description: 'Amazon Prime subscription' },
      { name: 'Disney+ Hotstar', value: 'Included', description: 'Disney+ Hotstar subscription' },
      { name: 'SonyLIV', value: 'Included', description: 'SonyLIV subscription' },
      { name: 'Zee5', value: 'Included', description: 'Zee5 subscription' },
      { name: 'Voot', value: 'Included', description: 'Voot subscription' },
      { name: 'Customer Support', value: 'Premium', description: 'Premium customer support' }
    ],
    dataLimit: {
      daily: 5,
      monthly: 150,
      unlimited: false
    },
    callFeatures: {
      unlimited: true,
      minutes: null,
      smsCount: 100
    },
    entertainment: {
      netflix: true,
      amazonPrime: true,
      disneyHotstar: true,
      otherServices: ['SonyLIV', 'Zee5', 'Voot']
    },
    isPopular: false,
    isActive: true,
    maxUsers: 1,
    category: 'premium',
    color: '#e8f5e8'
  },
  {
    name: 'Family Plan',
    description: 'For the whole family with multiple SIM cards and shared benefits',
    price: 999,
    currency: 'INR',
    duration: 'monthly',
    features: [
      { name: 'SIM Cards', value: '4', description: '4 SIM cards included' },
      { name: 'Daily Data per SIM', value: '2GB', description: '2GB data per day per SIM' },
      { name: 'Calls', value: 'Unlimited', description: 'Unlimited local and STD calls' },
      { name: 'SMS per SIM', value: '100/day', description: '100 SMS per day per SIM' },
      { name: 'Airtel Thanks App', value: 'Included', description: 'Access to Airtel Thanks benefits' },
      { name: 'Netflix Premium', value: 'Included', description: 'Netflix Premium subscription' },
      { name: 'Amazon Prime', value: 'Included', description: 'Amazon Prime subscription' },
      { name: 'Disney+ Hotstar', value: 'Included', description: 'Disney+ Hotstar subscription' },
      { name: 'Customer Support', value: 'Premium', description: 'Premium customer support' }
    ],
    dataLimit: {
      daily: 2,
      monthly: 60,
      unlimited: false
    },
    callFeatures: {
      unlimited: true,
      minutes: null,
      smsCount: 100
    },
    entertainment: {
      netflix: true,
      amazonPrime: true,
      disneyHotstar: true,
      otherServices: []
    },
    isPopular: false,
    isActive: true,
    maxUsers: 4,
    category: 'family',
    color: '#e8f5e8'
  },
  {
    name: 'Student Plan',
    description: 'Special plan for students with educational benefits',
    price: 299,
    currency: 'INR',
    duration: 'monthly',
    features: [
      { name: 'Daily Data', value: '1.5GB', description: '1.5GB data per day' },
      { name: 'Calls', value: 'Unlimited', description: 'Unlimited local and STD calls' },
      { name: 'SMS', value: '100/day', description: '100 SMS per day' },
      { name: 'Airtel Thanks App', value: 'Included', description: 'Access to Airtel Thanks benefits' },
      { name: 'Disney+ Hotstar', value: 'Included', description: 'Disney+ Hotstar subscription' },
      { name: 'Educational Apps', value: 'Free', description: 'Free access to educational apps' },
      { name: 'Customer Support', value: '24/7', description: '24/7 customer support' }
    ],
    dataLimit: {
      daily: 1.5,
      monthly: 45,
      unlimited: false
    },
    callFeatures: {
      unlimited: true,
      minutes: null,
      smsCount: 100
    },
    entertainment: {
      netflix: false,
      amazonPrime: false,
      disneyHotstar: true,
      otherServices: []
    },
    isPopular: false,
    isActive: true,
    maxUsers: 1,
    category: 'basic',
    color: '#f1f8e9'
  },
  {
    name: 'Senior Citizen Plan',
    description: 'Special plan for senior citizens with health benefits',
    price: 249,
    currency: 'INR',
    duration: 'monthly',
    features: [
      { name: 'Daily Data', value: '1GB', description: '1GB data per day' },
      { name: 'Calls', value: 'Unlimited', description: 'Unlimited local and STD calls' },
      { name: 'SMS', value: '100/day', description: '100 SMS per day' },
      { name: 'Airtel Thanks App', value: 'Included', description: 'Access to Airtel Thanks benefits' },
      { name: 'Health Apps', value: 'Free', description: 'Free access to health monitoring apps' },
      { name: 'Emergency Support', value: '24/7', description: '24/7 emergency support' },
      { name: 'Customer Support', value: 'Dedicated', description: 'Dedicated customer support' }
    ],
    dataLimit: {
      daily: 1,
      monthly: 30,
      unlimited: false
    },
    callFeatures: {
      unlimited: true,
      minutes: null,
      smsCount: 100
    },
    entertainment: {
      netflix: false,
      amazonPrime: false,
      disneyHotstar: false,
      otherServices: []
    },
    isPopular: false,
    isActive: true,
    maxUsers: 1,
    category: 'basic',
    color: '#fff8e1'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/airtel-subscription', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await SubscriptionPlan.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@airtel.com',
      password: 'admin123',
      role: 'admin',
      phone: '9876543210'
    });
    await adminUser.save();
    console.log('Created admin user: admin@airtel.com / admin123');

    // Create sample user
    const sampleUser = new User({
      name: 'Sample User',
      email: 'user@example.com',
      password: 'password123',
      role: 'user',
      phone: '9876543211'
    });
    await sampleUser.save();
    console.log('Created sample user: user@example.com / password123');

    // Insert sample plans
    const createdPlans = await SubscriptionPlan.insertMany(samplePlans);
    console.log(`Successfully created ${createdPlans.length} subscription plans`);

    // Display created plans
    createdPlans.forEach(plan => {
      console.log(`- ${plan.name}: ₹${plan.price}/${plan.duration}`);
    });

    console.log('\nDatabase seeding completed successfully!');
    console.log('\nDefault credentials:');
    console.log('Admin: admin@airtel.com / admin123');
    console.log('User: user@example.com / password123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase(); 