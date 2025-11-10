const express = require('express');
const { body, validationResult } = require('express-validator');
const SubscriptionPlan = require('../models/SubscriptionPlan');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all active subscription plans
router.get('/plans', async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find({ isActive: true })
      .select('name description price currency duration features dataLimit callFeatures entertainment isPopular category color maxUsers')
      .sort({ price: 1 });

    res.json({
      message: 'Plans retrieved successfully',
      plans: plans.map(plan => plan.getSummary())
    });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ message: 'Server error while retrieving plans' });
  }
});

// Get plan by ID
router.get('/plans/:id', async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    if (!plan.isActive) {
      return res.status(404).json({ message: 'Plan is not available' });
    }

    res.json({
      message: 'Plan retrieved successfully',
      plan: plan.getSummary()
    });
  } catch (error) {
    console.error('Get plan error:', error);
    res.status(500).json({ message: 'Server error while retrieving plan' });
  }
});

// Subscribe to a plan (protected route)
router.post('/subscribe', auth, [
  body('planId').isMongoId().withMessage('Invalid plan ID'),
  body('startDate').optional().isISO8601().withMessage('Invalid start date')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { planId, startDate } = req.body;

    // Check if plan exists and is active
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(404).json({ message: 'Plan not found or not available' });
    }

    // Check if user already has an active subscription
    const user = await User.findById(req.user._id);
    if (user.subscription.status === 'active') {
      return res.status(400).json({ message: 'You already have an active subscription' });
    }

    // Calculate subscription dates
    const start = startDate ? new Date(startDate) : new Date();
    const end = new Date(start);
    
    switch (plan.duration) {
      case 'monthly':
        end.setMonth(end.getMonth() + 1);
        break;
      case 'quarterly':
        end.setMonth(end.getMonth() + 3);
        break;
      case 'yearly':
        end.setFullYear(end.getFullYear() + 1);
        break;
      default:
        end.setMonth(end.getMonth() + 1);
    }

    // Update user subscription
    user.subscription = {
      planId: plan._id,
      status: 'active',
      startDate: start,
      endDate: end
    };

    await user.save();

    res.json({
      message: 'Subscription activated successfully',
      subscription: {
        plan: plan.getSummary(),
        status: user.subscription.status,
        startDate: user.subscription.startDate,
        endDate: user.subscription.endDate
      }
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ message: 'Server error while subscribing to plan' });
  }
});

// Get user's current subscription (protected route)
router.get('/my-subscription', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('subscription.planId');

    if (!user.subscription.planId) {
      return res.json({
        message: 'No active subscription',
        subscription: null
      });
    }

    res.json({
      message: 'Subscription retrieved successfully',
      subscription: {
        plan: user.subscription.planId.getSummary(),
        status: user.subscription.status,
        startDate: user.subscription.startDate,
        endDate: user.subscription.endDate
      }
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ message: 'Server error while retrieving subscription' });
  }
});

// Cancel subscription (protected route)
router.post('/cancel', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.subscription.planId || user.subscription.status !== 'active') {
      return res.status(400).json({ message: 'No active subscription to cancel' });
    }

    user.subscription.status = 'inactive';
    await user.save();

    res.json({
      message: 'Subscription cancelled successfully',
      subscription: {
        status: user.subscription.status,
        endDate: user.subscription.endDate
      }
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ message: 'Server error while cancelling subscription' });
  }
});

// Admin routes for managing plans
router.post('/plans', adminAuth, [
  body('name').trim().notEmpty().withMessage('Plan name is required'),
  body('description').trim().notEmpty().withMessage('Plan description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('duration').isIn(['monthly', 'quarterly', 'yearly']).withMessage('Invalid duration'),
  body('category').isIn(['basic', 'premium', 'unlimited', 'family']).withMessage('Invalid category')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const plan = new SubscriptionPlan(req.body);
    await plan.save();

    res.status(201).json({
      message: 'Plan created successfully',
      plan: plan.getSummary()
    });
  } catch (error) {
    console.error('Create plan error:', error);
    res.status(500).json({ message: 'Server error while creating plan' });
  }
});

// Update plan (admin only)
router.put('/plans/:id', adminAuth, async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json({
      message: 'Plan updated successfully',
      plan: plan.getSummary()
    });
  } catch (error) {
    console.error('Update plan error:', error);
    res.status(500).json({ message: 'Server error while updating plan' });
  }
});

// Delete plan (admin only)
router.delete('/plans/:id', adminAuth, async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findByIdAndDelete(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Delete plan error:', error);
    res.status(500).json({ message: 'Server error while deleting plan' });
  }
});

module.exports = router; 