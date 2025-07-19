import { body, validationResult } from 'express-validator';

// Minimal validation rules for booking data
export const validateBookingData = [
  body('fullName').exists().withMessage('Full name is required'),
  body('email').exists().withMessage('Email is required'),
  body('phone').exists().withMessage('Phone is required'),
  body('serviceAddress').exists().withMessage('Service address is required'),
  body('vehicleMake').exists().withMessage('Vehicle make is required'),
  body('vehicleModel').exists().withMessage('Vehicle model is required'),
  body('vehicleYear').exists().withMessage('Vehicle year is required'),
  body('vehicleType').exists().withMessage('Vehicle type is required'),
  body('preferredDate').exists().withMessage('Preferred date is required'),
  body('preferredTime').exists().withMessage('Preferred time is required'),
  body('selectedPackage').exists().withMessage('Service package is required'),
  body('paymentMethod').exists().withMessage('Payment method is required'),
  // Special instructions is optional, no validation

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