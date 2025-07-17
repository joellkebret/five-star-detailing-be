import { body, validationResult } from 'express-validator';

// Validation rules for booking data
export const validateBookingData = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('Please provide a valid phone number'),
  
  body('serviceAddress')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Service address must be between 10 and 500 characters'),
  
  body('vehicleMake')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Vehicle make is required'),
  
  body('vehicleModel')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Vehicle model is required'),
  
  body('vehicleYear')
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('Please provide a valid vehicle year'),
  
  body('vehicleType')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Please select a vehicle type'),
  
  body('preferredDate')
    .isISO8601()
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    })
    .withMessage('Preferred date must be today or in the future'),
  
  body('preferredTime')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Please select a time slot'),
  
  body('selectedPackage')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Please select a service package'),
  
  body('paymentMethod')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Please select a payment method'),
  
  body('specialInstructions')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Special instructions must be less than 1000 characters'),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
]; 