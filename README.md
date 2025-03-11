# Job-Application
A full-stack job application processing system that allows users to submit their CVs, which are then uploaded to Google Drive, parsed for key information, stored in MongoDB and Google Sheets, and processed with a webhook notification and email automation.


#Feature
- CV Upload - Users can submit their CV via a form.
- Google Drive Integration - CVs are stored securely in Google Drive.
- CV Parsing - Extracts applicant information (Name, Email, Phone, Education, etc.).
- Google Sheets Storage - Stores applicant details and CV links in a Google Sheet.
- Webhook Notification - Sends applicant data to an external API endpoint after processing.
- Emails - Sends an automated email to applicants the next day.
- Real-Time Feedback - Uses SweetAlert for better UX during file upload.

#Frontend(React)
React.js
Axios (for API requests)
SweetAlert2 (for notifications)
Tailwind CSS (for styling)

#Backend (Node.js + Express)
Express.js
Multer (for file handling)
Google Drive API (for storing CVs)
PDF-Parse & Mammoth (for CV text extraction)
Google Sheets API (for storing extracted data)
Nodemailer & OAuth2 (for email automation)
MongoDB & Mongoose (for database storage)
Webhooks (for API communication)
