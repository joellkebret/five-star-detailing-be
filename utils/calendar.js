import { createEvent } from 'ics';

// Generate calendar invite
export const generateCalendarInvite = async (bookingData) => {
  const { 
    fullName, 
    preferredDate, 
    preferredTime, 
    selectedPackage, 
    vehicleMake, 
    vehicleModel, 
    vehicleYear,
    serviceAddress,
    phone,
    email,
    specialInstructions 
  } = bookingData;

  // Convert date and time to proper format
  const date = new Date(preferredDate);
  const timeSlots = {
    'morning': { start: 7, end: 12 },
    'afternoon': { start: 12, end: 17 },
    'evening': { start: 17, end: 22 }
  };
  
  const timeSlot = timeSlots[preferredTime] || timeSlots.morning;
  const startHour = timeSlot.start;
  
  const startDate = new Date(date);
  startDate.setHours(startHour, 0, 0, 0);
  
  const endDate = new Date(startDate);
  endDate.setHours(startHour + 1, 0, 0, 0);

  const event = {
    start: [
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes()
    ],
    end: [
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate(),
      endDate.getHours(),
      endDate.getMinutes()
    ],
    title: `${fullName} - ${selectedPackage} Detailing`,
    description: `Vehicle: ${vehicleYear} ${vehicleMake} ${vehicleModel}
Service: ${selectedPackage}
Address: ${serviceAddress}
Phone: ${phone}
Email: ${email}
${specialInstructions ? `Special Instructions: ${specialInstructions}` : ''}`,
    location: serviceAddress,
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: 'Five Star Detailing', email: process.env.EMAIL_FROM },
    attendees: [
      { name: fullName, email: email, rsvp: true, partstat: 'NEEDS-ACTION' }
    ]
  };

  return new Promise((resolve, reject) => {
    createEvent(event, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
}; 