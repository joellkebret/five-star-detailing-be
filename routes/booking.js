import express from 'express';
import { submitBooking } from '../utils/email.js';
import { validateBookingData } from '../middleware/validation.js';

const router = express.Router();

// GET /api/test - Test endpoint
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working!',
    env: {
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      hasEmailTo: !!process.env.EMAIL_TO,
      hasEmailFrom: !!process.env.EMAIL_FROM,
      nodeEnv: process.env.NODE_ENV
    }
  });
});

// GET /api/test-email - Test email functionality
router.get('/test-email', async (req, res) => {
  try {
    console.log('🧪 Testing email functionality...');
    
    // Test booking data with realistic values that match the frontend form
    const testBookingData = {
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      phone: '4165551234',
      serviceAddress: '123 Main Street, Toronto, ON M5V 2H1',
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      vehicleYear: 2022,
      vehicleType: 'sedan',
      preferredDate: '224',
      preferredTime: 'morning',
      selectedPackage: 'interior',
      paymentMethod: 'cash',
      specialInstructions: 'Please call30tes before arrival'
    };

    // Try to send test email
    await submitBooking(testBookingData);
    
    res.json({
      success: true,
      message: 'Test email sent successfully! Check your business email inbox.',
      testData: testBookingData
    });

  } catch (error) {
    console.error('❌ Test email failed:', error);
    res.status(500).json({
      success: false,
      message: 'Test email failed',
      error: error.message,
      errorCode: error.code,
      errorDetails: {
        name: error.name,
        command: error.command,
        responseCode: error.responseCode,
        response: error.response
      }
    });
  }
});

// GET /api/test-components - Test individual components
router.get('/test-components', async (req, res) => {
  try {
    console.log('🧪 Testing individual components...');   
    const testBookingData = {
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      phone: '4165551234',
      serviceAddress: '123 Main Street, Toronto, ON M5V 2H1',
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      vehicleYear: 222,
      vehicleType: 'sedan',
      preferredDate: '224',
      preferredTime: 'morning',
      selectedPackage: 'interior',
      paymentMethod: 'cash',
      specialInstructions: 'Please call30tes before arrival'
    };

    const results = {
      emailTemplate: null,
      calendarInvite: null,
      emailTransporter: null
    };

    // Test1emplate generation
    try {
      console.log('📧 Testing email template generation...');
      const { generateEmailHTML } = await import('../utils/emailTemplates.js');
      const emailHTML = generateEmailHTML(testBookingData);
      results.emailTemplate = '✅ Email template generated successfully';
      console.log('✅ Email template test passed');
    } catch (error) {
      results.emailTemplate = `❌ Email template failed: ${error.message}`;
      console.error('❌ Email template test failed:',error);
    }

    // Test 2 invite generation
    try {
      console.log('📅 Testing calendar invite generation...');
      const { generateCalendarInvite } = await import('../utils/calendar.js');
      const calendarData = await generateCalendarInvite(testBookingData);
      results.calendarInvite = '✅ Calendar invite generated successfully';
      console.log('✅ Calendar invite test passed');
    } catch (error) {
      results.calendarInvite = `❌ Calendar invite failed: ${error.message}`;
      console.error('❌ Calendar invite test failed:',error);
    }

    // Test 3: Email transporter creation
    try {
      console.log('🔧 Testing email transporter creation...');
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransporter({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,     secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      await transporter.verify();
      results.emailTransporter = '✅ Email transporter created and verified successfully';
      console.log('✅ Email transporter test passed');
    } catch (error) {
      results.emailTransporter = `❌ Email transporter failed: ${error.message}`;
      console.error('❌ Email transporter test failed:',error);
    }

    res.json({
      success: true,
      message: 'Component tests completed.',
      results,
      testData: testBookingData
    });

  } catch (error) {
    console.error('❌ Component test failed:', error);
    res.status(500).json({
      success: false,
      message: 'Component test failed',
      error: error.message
    });
  }
});

// POST /api/book - Submit booking request
router.post('/book', validateBookingData, async (req, res) => {
  try {
    console.log('📝 Booking request received:', {
      method: req.method,
      url: req.url,
      bodyKeys: Object.keys(req.body),
      timestamp: new Date().toISOString()
    });

    const bookingData = req.body;
    console.log('📋 Validated booking data:', {
      name: bookingData.fullName,
      email: bookingData.email,
      package: bookingData.selectedPackage,
      date: bookingData.preferredDate
    });
    
    // Submit booking and send emails
    console.log('📧 Calling submitBooking function...');
    await submitBooking(bookingData);
    console.log('✅ submitBooking completed successfully');
    
    res.json({
      success: true,
      message: 'Booking request sent successfully! We will contact you within 24rs to confirm your appointment.'
    });

  } catch (error) {
    console.error('❌ Error in /api/book endpoint:', error);
    console.error('❌ Error stack:', error.stack);
    console.error('❌ Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response
    });
    
    res.status(500).json({
      success: false,
      message: 'Failed to send booking request. Please try again or contact us directly.',
      error: error.message,
      errorCode: error.code
    });
  }
});

export default router; 