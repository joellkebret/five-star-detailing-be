// Generate HTML email content
export const generateEmailHTML = (bookingData) => {
  const {
    fullName,
    phone,
    email,
    serviceAddress,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    vehicleType,
    preferredDate,
    preferredTime,
    selectedPackage,
    paymentMethod,
    specialInstructions
  } = bookingData;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeSlot) => {
    const timeMap = {
      'morning': 'Morning (7 AM - 12 PM)',
      'afternoon': 'Afternoon (12 PM - 5 PM)',
      'evening': 'Evening (5 PM - 10 PM)'
    };
    return timeMap[timeSlot] || timeSlot;
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Request - Five Star Detailing</title>
        <style>
            body {
                font-family: 'Inter', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8f9fa;
            }
            .container {
                background-color: #ffffff;
                border-radius: 12px;
                padding: 30px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 3px solid #008bff;
            }
            .header h1 {
                color: #008bff;
                margin: 0;
                font-size: 28px;
                font-weight: bold;
            }
            .header p {
                color: #6b7280;
                margin: 10px 0 0 0;
                font-size: 16px;
            }
            .section {
                margin-bottom: 25px;
                padding: 20px;
                background-color: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #008bff;
            }
            .section h2 {
                color: #008bff;
                margin: 0 0 15px 0;
                font-size: 20px;
                font-weight: 600;
            }
            .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }
            .info-item {
                display: flex;
                flex-direction: column;
            }
            .info-item.full-width {
                grid-column: 1 / -1;
            }
            .info-label {
                font-weight: 600;
                color: #6b7280;
                font-size: 14px;
                margin-bottom: 5px;
            }
            .info-value {
                color: #333;
                font-size: 16px;
            }
            .highlight {
                background-color: #e3f2fd;
                border: 1px solid #2196f3;
                border-radius: 8px;
                padding: 20px;
                margin: 25px 0;
            }
            .highlight h3 {
                color: #1976d2;
                margin: 0 0 10px 0;
                font-size: 18px;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                color: #6b7280;
                font-size: 14px;
            }
            @media (max-width: 600px) {
                .info-grid {
                    grid-template-columns: 1fr;
                }
                .container {
                    padding: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚗 New Booking Request</h1>
                <p>Five Star Detailing - Mobile Car Detailing Services</p>
            </div>

            <div class="section">
                <h2>👤 Customer Information</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Full Name</div>
                        <div class="info-value">${fullName}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Phone Number</div>
                        <div class="info-value">${phone}</div>
                    </div>
                    <div class="info-item full-width">
                        <div class="info-label">Email Address</div>
                        <div class="info-value">${email}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>🚙 Vehicle Information</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Make</div>
                        <div class="info-value">${vehicleMake}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Model</div>
                        <div class="info-value">${vehicleModel}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Year</div>
                        <div class="info-value">${vehicleYear}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Type</div>
                        <div class="info-value">${vehicleType}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>📅 Appointment Details</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Date</div>
                        <div class="info-value">${formatDate(preferredDate)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Time</div>
                        <div class="info-value">${formatTime(preferredTime)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Service Package</div>
                        <div class="info-value">${selectedPackage}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Payment Method</div>
                        <div class="info-value">${paymentMethod}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>📍 Service Location</h2>
                <div class="info-item">
                    <div class="info-label">Address</div>
                    <div class="info-value">${serviceAddress}</div>
                </div>
            </div>

            ${specialInstructions ? `
            <div class="section">
                <h2>📝 Special Instructions</h2>
                <div class="info-item">
                    <div class="info-value">${specialInstructions}</div>
                </div>
            </div>
            ` : ''}

            <div class="highlight">
                <h3>📋 Next Steps</h3>
                <p>Please review this booking request and contact the customer to confirm the appointment. 
                The calendar invite attached to this email can be used to add the appointment to your calendar.</p>
            </div>

            <div class="footer">
                <p>This booking request was submitted through the Five Star Detailing website.</p>
                <p>Generated on ${new Date().toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</p>
            </div>
        </div>
    </body>
    </html>
  `;
}; 