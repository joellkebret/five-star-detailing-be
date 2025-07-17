import nodemailer from 'nodemailer';
import { generateCalendarInvite } from './calendar.js';
import { generateEmailHTML } from './emailTemplates.js';

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: (Number(process.env.EMAIL_PORT) || 587) === 465, // true for implicit TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Submit booking and send email
export const submitBooking = async (bookingData) => {
  try {
    // Generate calendar invite
    const calendarData = await generateCalendarInvite(bookingData);

    // Create email transporter
    const transporter = createTransporter();
    
    // Verify transporter connection
    await transporter.verify();

    // Set up email recipient (business email only)
    const businessEmail = process.env.EMAIL_TO || 'fivestardetailingto@gmail.com';

    // Send business email (detailed booking information)
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: businessEmail,
      subject: `New Booking Request - ${bookingData.fullName} - ${bookingData.selectedPackage}`,
      html: generateEmailHTML(bookingData),
      attachments: [
        {
          filename: `booking-${bookingData.fullName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.ics`,
          content: calendarData,
          contentType: 'text/calendar; method=REQUEST'
        }
      ]
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    console.log(`✅ Booking email sent for ${bookingData.fullName}`);
    console.log(`📧 Business email sent to: ${businessEmail}`);
    
  } catch (error) {
    console.error('❌ Error sending booking email:', error);
    throw error;
  }
}; 