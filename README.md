# Five Star Detailing - Backend Server

This is the backend server for the Five Star Detailing booking system. It handles email notifications and calendar invite generation when customers submit booking requests.

## Features

- ✅ Email booking notifications with HTML formatting
- 📅 Calendar invite (.ics file) generation
- 🔒 Form validation and error handling
- 📧 Professional email templates
- 🚀 Express.js REST API

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your email settings:

```bash
cp env.example .env
```

Edit the `.env` file with your email configuration:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=bookings@mydetailingbusiness.com

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 3. Email Setup (Gmail Example)

If using Gmail, you'll need to:

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in your `.env` file

### 4. Running the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3001`

## API Endpoints

### POST /api/book
Submit a booking request

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phone": "647-710-7247",
  "email": "john@example.com",
  "serviceAddress": "123 Main St, Toronto, ON",
  "vehicleMake": "Toyota",
  "vehicleModel": "Camry",
  "vehicleYear": "2020",
  "vehicleType": "sedan",
  "preferredDate": "2024-01-15",
  "preferredTime": "morning",
  "selectedPackage": "full",
  "paymentMethod": "cash",
  "specialInstructions": "Please call when arriving"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking request sent successfully! We will contact you within 24 hours to confirm your appointment."
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "message": "Five Star Detailing API is running"
}
```

## Email Features

### HTML Email Template
- Professional styling with Five Star Detailing branding
- Organized sections for customer info, vehicle details, and appointment details
- Responsive design for mobile and desktop
- Clear call-to-action and next steps

### Calendar Invite (.ics)
- Automatically generated for each booking
- 1-hour duration by default
- Includes all booking details in description
- Can be imported into Google Calendar, Outlook, etc.
- Customer is added as attendee for RSVP tracking

## Error Handling

The server includes comprehensive error handling:

- **Validation Errors**: Missing required fields, invalid email/phone
- **Email Errors**: SMTP connection issues, authentication problems
- **Calendar Generation Errors**: Invalid date/time formats
- **Network Errors**: Connection timeouts, server issues

All errors are logged and appropriate error messages are returned to the client.

## Security Considerations

- Environment variables for sensitive data
- Input validation and sanitization
- CORS configuration for frontend integration
- Rate limiting (can be added if needed)

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a production email service (SendGrid, AWS SES, etc.)
3. Configure proper CORS origins
4. Set up SSL/TLS certificates
5. Use a process manager like PM2

## Troubleshooting

### Email Not Sending
- Check SMTP credentials in `.env`
- Verify email host and port settings
- Check firewall/network restrictions
- Review email service provider settings

### Calendar Invite Issues
- Verify date/time format in booking data
- Check timezone settings
- Ensure all required fields are present

### Frontend Integration
- Verify API endpoint URL in frontend
- Check CORS configuration
- Ensure proper error handling in frontend 