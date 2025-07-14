import express from 'express';
import { submitBooking } from '../utils/email.js';
import { validateBookingData } from '../middleware/validation.js';

const router = express.Router();

// POST /api/book - Submit booking request
router.post('/book', validateBookingData, async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Submit booking and send emails
    await submitBooking(bookingData);
    
    res.json({
      success: true,
      message: 'Booking request sent successfully! We will contact you within 24 hours to confirm your appointment.'
    });

  } catch (error) {
    console.error('Error submitting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send booking request. Please try again or contact us directly.'
    });
  }
});

export default router; 