import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

// Initialize Firebase Admin
admin.initializeApp();

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-email-password", // Replace with your email password or app password
  },
});

// Firestore trigger for new contact form submission
exports.sendContactEmail = functions.firestore
  .document("contacts/{contactId}")
  .onCreate((snap, context) => {
    const data = snap.data();

    const mailOptions = {
      from: "your-email@gmail.com", // Replace with your email
      to: "recipient-email@gmail.com", // Replace with the recipient's email
      subject: `New Contact Form Submission from ${data.name}`,
      text: `You have a new contact form submission:
            Name: ${data.name}
            Email: ${data.email}
            Message: ${data.message}`
    };

    return transporter.sendMail(mailOptions)
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error("Error sending email: ", error);
      });
  });
