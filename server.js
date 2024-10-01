const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Email route
app.post('/send-email', async (req, res) => {
  const { group, announcement, schedule, emails } = req.body; // Extract group, announcement, schedule, and emails
console.log(req.body)
  // Iterate through the emails with passwords
  for (let { email, password } of emails) {
    // Nodemailer setup for each email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aadithyagoudhaman@gmail.com', // Single sender email (from your environment variables)
        pass: 'uiuzuoawampwqpjd',
      },
    });

    // Mail options
    let mailOptions = {
      from: email, // Use the email in the 'from' field
      to: emails.map(item => item).join(','), // Join array of emails into a comma-separated string
      subject: `Announcement for ${group}`,
      text: announcement,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email[0]}`);
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  }

  return res.status(200).json({ message: 'Emails sent successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
