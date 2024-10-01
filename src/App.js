import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [group, setGroup] = useState('cancer');
  const [schedule, setSchedule] = useState('');
  const [emails, setEmails] = useState(''); // State for emails

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'test@example.com' && password === 'password123') {
      setIsLoggedIn(true);
      alert('Login Successful');
    } else {
      alert('Invalid email or password');
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    const selectedEmails = emails.split(',').map(email => email.trim()); // Split and trim emails

    // Log the data being sent
    console.log('Sending email with data:', { group, announcement, schedule, emails: selectedEmails });

    try {
      const response = await fetch('https://hospital-management-system-production-a773.up.railway.app/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group,
          announcement,
          schedule,
          emails: selectedEmails, // Send the array of emails
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        alert(data.message);
      } else {
        console.log(data)
        alert('Error sending email: ' + data.message);
      }

      setAnnouncement('');
      setSchedule('');
      setEmails(''); // Reset fields
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="login-container">
          <h2>Login/Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label id="email">Email Address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div className="hospital-crm">
          <h1>Hospital CRM System</h1>

          {/* Email Announcement Form */}
          <h2>Send Email Announcement</h2>
          <form onSubmit={handleSendEmail}>
            <div>
              <label>Select Patient Group:</label>
              <select value={group} onChange={(e) => setGroup(e.target.value)}>
                <option value="cancer">Cancer Patients</option>
                <option value="diabetes">Diabetes Patients</option>
                <option value="wellness">General Wellness Program</option>
              </select>
            </div>

            <div>
              <label>Emails (comma-separated):</label>
              <input
                type="text"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                placeholder="Enter patient emails"
                required
              />
            </div>

            <div>
              <label>Announcement:</label>
              <textarea
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                required
                placeholder="Enter your announcement here..."
              />
            </div>

            <div>
              <label>Schedule Email (optional):</label>
              <input
                type="datetime-local"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
            </div>

            <button type="submit">Send Email</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
