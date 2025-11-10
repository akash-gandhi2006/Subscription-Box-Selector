const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plan name is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Plan description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Plan price is required'],
    min: [0, 'Price cannot be negative']
  },
  currency: {
    type: String,
    default: 'INR',
    enum: ['INR', 'USD', 'EUR']
  },
  duration: {
    type: String,
    required: [true, 'Plan duration is required'],
    enum: ['monthly', 'quarterly', 'yearly']
  },
  features: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    value: String,
    included: {
      type: Boolean,
      default: true
    }
  }],
  dataLimit: {
    daily: Number, // in GB
    monthly: Number, // in GB
    unlimited: {
      type: Boolean,
      default: false
    }
  },
  callFeatures: {
    unlimited: {
      type: Boolean,
      default: false
    },
    minutes: Number,
    smsCount: Number
  },
  entertainment: {
    netflix: {
      type: Boolean,
      default: false
    },
    amazonPrime: {
      type: Boolean,
      default: false
    },
    disneyHotstar: {
      type: Boolean,
      default: false
    },
    otherServices: [String]
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  maxUsers: {
    type: Number,
    default: 1,
    min: [1, 'At least 1 user must be allowed']
  },
  category: {
    type: String,
    enum: ['basic', 'premium', 'unlimited', 'family'],
    required: true
  },
  color: {
    type: String,
    default: '#667eea'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual for formatted price
subscriptionPlanSchema.virtual('formattedPrice').get(function() {
  return `₹${this.price}`;
});

// Virtual for duration text
subscriptionPlanSchema.virtual('durationText').get(function() {
  const durationMap = {
    monthly: 'per month',
    quarterly: 'per quarter',
    yearly: 'per year'
  };
  return durationMap[this.duration] || 'per month';
});

// Method to get plan summary
subscriptionPlanSchema.methods.getSummary = function() {
  return {
    id: this._id,
    name: this.name,
    description: this.description,
    price: this.price,
    formattedPrice: this.formattedPrice,
    duration: this.duration,
    durationText: this.durationText,
    isPopular: this.isPopular,
    category: this.category,
    color: this.color,
    features: this.features.filter(f => f.included),
    maxUsers: this.maxUsers
  };
};

// Index for active plans
subscriptionPlanSchema.index({ isActive: 1, category: 1 });

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema); 