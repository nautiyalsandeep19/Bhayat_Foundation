
// export const ContactFormSubmission = async (req, res) => {
//       const { name, email, message } = req.body;
    
//       if (!name || !email || !message) {
//         return res.status(400).json({ success: false, message: "All fields are required!" });
//       }
    
//       try {
//         // Email to Admin
//         const adminMailOptions = {
//           from: process.env.EMAIL_USER,
//           to: "underratedbard14@gmail.com", // Admin Email
//           subject: "New Contact Form Submission",
//           html: `
//             <h2>New Contact Form Submission</h2>
//             <p><strong>Name:</strong> ${name}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Message:</strong> ${message}</p>
//           `,
//         };
    
//         // Email Confirmation to User
//         const userMailOptions = {
//           from: process.env.EMAIL_USER,
//           to: email, // Sending to user
//           subject: "Thank You for Contacting Us!",
//           html: `
//             <h3>Dear ${name},</h3>
//             <p>We appreciate you reaching out to us. Your message has been received, and we will get back to you shortly.</p>
//             <p><strong>Your Submitted Details:</strong></p>
//             <ul>
//               <li><strong>Name:</strong> ${name}</li>
//               <li><strong>Email:</strong> ${email}</li>
//               <li><strong>Message:</strong> ${message}</li>
//             </ul>
//             <p>Thank you for getting in touch!</p>
//             <p>Best Regards,<br/>Bhayat Foundation</p>
//           `,
//         };
    
//         // Send Emails
//         await newtransporter.sendMail(adminMailOptions);
//         await newtransporter.sendMail(userMailOptions);
    
//         res.status(200).json({ success: true, message: "Message sent successfully!" });
//       } catch (error) {
//         console.error("Error sending email:", error);
//         res.status(500).json({ success: false, message: "Failed to send message!", error: error.message });
//       }
// }

// export const VolunteerPosition = async (req, res) => {
//     try {
      
//     const { id } = req.params; 
//     const { position } = req.body; 
  
  
//       const volunteer = await Volunteer.findByIdAndUpdate(
//         id,
//         { position },
//         { new: true } 
//       );
  
//       if (!volunteer) {
//         return res.status(404).json({ message: "Volunteer not found" });
//       }
  
//       res.status(200).json({
//         message: "Position updated successfully",
//         volunteer,
//       });
//     } catch (error) {
//       res.status(500).json({ message: "Server Error", error: error.message });
//     }
// }

// export const Handleformsubmission =  async (req, res) => {
//   const { fullname, mobile, email, message } = req.body;

//   if (!fullname || !mobile || !email || !message) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const adminMailOptions = {
//       from: process.env.EMAIL_USER,
//       to: 'underratedbard14@gmail.com',
//       subject: 'New Form Submission',
//       html: `<h3>New Form Submission</h3><p><strong>Name:</strong> ${fullname}</p><p><strong>Mobile:</strong> ${mobile}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
//     };

//     const userMailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Thank You for Your Submission',
//       html: `<h3>Thank You, ${fullname} <br/> You are the reason someone smiles today!</h3><p>We have received your details and will get back to you shortly.</p><p>Your Submitted Details:</p><ul><li><strong>Name:</strong> ${fullname}</li><li><strong>Mobile:</strong> ${mobile}</li><li><strong>Email:</strong> ${email}</li><li><strong>Message:</strong> ${message}</li></ul><p>Thank you for reaching out!</p>`
//     };

//     await transporter.sendMail(adminMailOptions);
//     await transporter.sendMail(userMailOptions);

//     res.status(200).json({ message: 'Emails sent successfully' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ error: 'Failed to send emails' });
//   }
// }


// export const FundRaisePost =  async (req, res) => {
//     try {
//       const newFundraise = new Fundraise(req.body);
//       await newFundraise.save();
//       res.status(201).json({ message: 'Data saved successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Server Error', error });
//     }
//   }

//   export const FundRaiseDelete =  async (req, res) => {
//     try {
//       const result = await causeModel.findByIdAndDelete(req.params.id);
//       if (!result) {
//         return res.json({ success: false, message: "Item not found" });
//       }
//       res.json({ success: true, message: "Item deleted successfully" });
//     } catch (error) {
//       console.error("Delete Error:", error);
//       res.json({ success: false, message: "Server error" });
//     }
//   }