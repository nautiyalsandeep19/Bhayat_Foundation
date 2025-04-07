

// // Initialize app and middleware
// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// dotenv.config();
// const PORT = process.env.PORT || 1000;
// app.use(cors({Credential:true}))
// app.use(cookieParser())



// //middlewares
// app.use('/api/payment', payment); 
// app.use('/api/getexcelsheet', getexcelsheet); 
// app.use("/uploads", express.static("uploads"));
// app.use('/api/volunteer',volunteerRouter)

// //Database Connection
// connectDB();

// //* Available Route 
// app.get('/', (req, res) => {
//   res.send(' Backend Api working properly')
// })

// // API endpoints for static files
// app.use("/api/Admincause",foodRouter)
// app.use("/images",express.static('uploads'))
// app.use("/uploads/VolunteerImage",express.static("uploads/VolunteerImage"));
// app.use("/api/user",userRouter)



// // **************************************** Mail code here Start***********************************************

// // Setup email transporter using Nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // API endpoint to handle form submission
// app.post('/api/send-mail', async (req, res) => {
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
// });

// // **************************************** Mail code here End***********************************************


// // Fund raise form submission
// const fundraiseSchema = new mongoose.Schema({
//   purpose: String,
//   beneficiary: String,
//   phone: String,
//   fullName: String,
//   address: String,
//   amount: Number,
// });

// const Fundraise = mongoose.model('FundraiseFormSubmission', fundraiseSchema);

// app.post('/api/fundraise', async (req, res) => {
//   try {
//     const newFundraise = new Fundraise(req.body);
//     await newFundraise.save();
//     res.status(201).json({ message: 'Data saved successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// });

// // Delete a cause
// app.delete("/api/Admincause/remove/:id", async (req, res) => {
//   try {
//     const result = await causeModel.findByIdAndDelete(req.params.id);
//     if (!result) {
//       return res.json({ success: false, message: "Item not found" });
//     }
//     res.json({ success: true, message: "Item deleted successfully" });
//   } catch (error) {
//     console.error("Delete Error:", error);
//     res.json({ success: false, message: "Server error" });
//   }
// });

// // ********************* Recent Fundraiser Start***************************************
// // Multer Configuration for Image Upload
// const storage = multer.diskStorage({
//   destination: "./uploads/RecentFundPhoto",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// // Fundraiser Schema and Model
// const fundraiserSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   image: String,
//   goal: Number,
//   raised: { type: Number, default: 0 },
//   donations: { type: Number, default: 0 },
//   daysLeft: Number,
// });

// const Fundraiser = mongoose.model("CurrentFundraiser", fundraiserSchema);

// // Fetch Fundraisers
// app.get("/api/currentfundraisers", async (req, res) => {
//   try {
//     const fundraisers = await Fundraiser.find();
//     res.json({ success: true, data: fundraisers });
//   } catch (error) {
//     console.error("Error fetching fundraisers:", error);
//     res.status(500).json({ success: false, message: "Server error." });
//   }
// });

// // Add Fundraiser
// app.post("/api/currentfundraisers/add", upload.single("image"), async (req, res) => {
//   try {
//     const { name, description, goal, raised, donations, daysLeft } = req.body;
//     const image = req.file ? `${req.file.filename}` : null;
//     console.log("server.js",image)

//     if (!name || !description || !goal || !daysLeft || !image) {
//       return res.status(400).json({ success: false, message: "All fields are required." });
//     }

//     const newFundraiser = new Fundraiser({
//       name,
//       description,
//       goal: Number(goal),
//       raised: Number(raised),
//       donations: Number(donations),
//       daysLeft: Number(daysLeft),
//       image,
//     });

//     await newFundraiser.save();
//     res.json({ success: true, message: "Fundraiser added successfully!" });
//   } catch (error) {
//     console.error("Error adding fundraiser:", error);
//     res.status(500).json({ success: false, message: "Server error." });
//   }
// });
// // ********************* Recent Fundraiser End ***************************************






  import express from 'express'
  import mongoose from 'mongoose';
  import cors from 'cors'
  import bodyParser from 'body-parser'
  import nodemailer from 'nodemailer'
  import connectDB from "./Config/DB.js"
  import payment from "./Routes/payment.js" 
  import foodRouter from './Routes/CauseRoute.js';
  import dotenv from 'dotenv';
  import causeModel from './Models/CauseModel.js';
  import getexcelsheet from "./Routes/GetExcel.js" 
  import cookieParser from 'cookie-parser';
  import multer from "multer";
  import volunteerRouter from './Routes/VolunteerRoutes.js';
  import Volunteer from './Models/Volunteer.js';
  import userRouter from './Routes/UserSignupLogin.js';


  // Initialize app and middleware
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  dotenv.config();
  const PORT = process.env.PORT || 1000;
  app.use(cors({Credential:true}))
  app.use(cookieParser())

  //middlewares
  app.use('/api/payment', payment); 
  app.use('/api/getexcelsheet', getexcelsheet); 
  app.use("/uploads", express.static("uploads"));
  app.use('/api/volunteer',volunteerRouter)

  //Database Connection
  connectDB();

  //* Available Route 
  app.get('/', (req, res) => {
    res.send(' Backend Api working properly')
  })

  // API endpoints for static files
  app.use("/api/Admincause",foodRouter)
  app.use("/images",express.static('uploads'))
  app.use("/uploads/VolunteerImage",express.static("uploads/VolunteerImage"));
  app.use("/api/user",userRouter)



  //  Donation form data 
  const FormDataSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    donationId: { type: mongoose.Schema.Types.ObjectId, required: false },
    donationType: { type: String, required: true },
    amount: { type: Number, required: true },
  });

  const FormData = mongoose.model("DonateFormData", FormDataSchema);

  // POST endpoint to receive donation form data
  app.post("/api/donate", async (req, res) => {
    try {
      const { fullname, mobile, email, message, donationId, donationType, amount } = req.body;

      if (!fullname || !mobile || !email || !message || !amount) {
        return res.status(400).json({ error: "All required fields must be provided." });
      }

      const newForm = new FormData({ fullname, mobile, email, message, donationId, donationType, amount });
      await newForm.save();

      res.status(200).json({ message: "Donation form submitted successfully!" });
    } catch (error) {
      console.error("Error saving form data:", error);
      res.status(500).json({ error: "An error occurred while saving the data." });
    }
  });


  // **************************************** Mail code here Start***********************************************

  // Setup email transporter using Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // API endpoint to handle form submission
  app.post('/api/send-mail', async (req, res) => {
    const { fullname, mobile, email, message } = req.body;

    if (!fullname || !mobile || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: 'underratedbard14@gmail.com',
        subject: 'New Form Submission',
        html: `<h3>New Form Submission</h3><p><strong>Name:</strong> ${fullname}</p><p><strong>Mobile:</strong> ${mobile}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
      };

      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank You for Your Submission',
        html: `<h3>Thank You, ${fullname} <br/> You are the reason someone smiles today!</h3><p>We have received your details and will get back to you shortly.</p><p>Your Submitted Details:</p><ul><li><strong>Name:</strong> ${fullname}</li><li><strong>Mobile:</strong> ${mobile}</li><li><strong>Email:</strong> ${email}</li><li><strong>Message:</strong> ${message}</li></ul><p>Thank you for reaching out!</p>`
      };

      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(userMailOptions);

      res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send emails' });
    }
  });

  // **************************************** Mail code here End***********************************************


  // Fund raise form submission
  const fundraiseSchema = new mongoose.Schema({
    purpose: String,
    beneficiary: String,
    phone: String,
    fullName: String,
    address: String,
    amount: Number,
  });

  const Fundraise = mongoose.model('FundraiseFormSubmission', fundraiseSchema);

  app.post('/api/fundraise', async (req, res) => {
    try {
      const newFundraise = new Fundraise(req.body);
      await newFundraise.save();
      res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });

  // Delete a cause
  app.delete("/api/Admincause/remove/:id", async (req, res) => {
    try {
      const result = await causeModel.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.json({ success: false, message: "Item not found" });
      }
      res.json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
      console.error("Delete Error:", error);
      res.json({ success: false, message: "Server error" });
    }
  });

  // ********************* Recent Fundraiser Start***************************************
  // Multer Configuration for Image Upload
  const storage = multer.diskStorage({
    destination: "./uploads/RecentFundPhoto",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });

  // Fundraiser Schema and Model
  const fundraiserSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    goal: Number,
    raised: { type: Number, default: 0 },
    donations: { type: Number, default: 0 },
    daysLeft: Number,
  });

  const Fundraiser = mongoose.model("CurrentFundraiser", fundraiserSchema);

  // Fetch Fundraisers
  app.get("/api/currentfundraisers", async (req, res) => {
    try {
      const fundraisers = await Fundraiser.find();
      res.json({ success: true, data: fundraisers });
    } catch (error) {
      console.error("Error fetching fundraisers:", error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  });

  // Add Fundraiser
  app.post("/api/currentfundraisers/add", upload.single("image"), async (req, res) => {
    try {
      const { name, description, goal, raised, donations, daysLeft } = req.body;
      const image = req.file ? `${req.file.filename}` : null;
      console.log("server.js",image)

      if (!name || !description || !goal || !daysLeft || !image) {
        return res.status(400).json({ success: false, message: "All fields are required." });
      }

      const newFundraiser = new Fundraiser({
        name,
        description,
        goal: Number(goal),
        raised: Number(raised),
        donations: Number(donations),
        daysLeft: Number(daysLeft),
        image,
      });

      await newFundraiser.save();
      res.json({ success: true, message: "Fundraiser added successfully!" });
    } catch (error) {
      console.error("Error adding fundraiser:", error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  });
  // ********************* Recent Fundraiser End ***************************************



  //******************************  Volunteer Position Update  Start***********************************

  app.patch("/api/volunteer/:id/position", async (req, res) => {
    try {
      
    const { id } = req.params; 
    const { position } = req.body; 


      const volunteer = await Volunteer.findByIdAndUpdate(
        id,
        { position },
        { new: true } 
      );

      if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
      }

      res.status(200).json({
        message: "Position updated successfully",
        volunteer,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });//******************************  Volunteer Position Update End ***********************************


  // // **************************** Contact form ************************************ // 

  const newtransporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user : process.env.EMAIL_USER,
      pass : process.env.EMAIL_PASS
    },
  });

  // API Endpoint to Handle Contact Form Submission
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    try {
      // Email to Admin
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: "underratedbard14@gmail.com", // Admin Email
        subject: "New Contact Form Submission",
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      };

      // Email Confirmation to User
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Sending to user
        subject: "Thank You for Contacting Us!",
        html: `
          <h3>Dear ${name},</h3>
          <p>We appreciate you reaching out to us. Your message has been received, and we will get back to you shortly.</p>
          <p><strong>Your Submitted Details:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Message:</strong> ${message}</li>
          </ul>
          <p>Thank you for getting in touch!</p>
          <p>Best Regards,<br/>Bhayat Foundation</p>
        `,
      };

      // Send Emails
      await newtransporter.sendMail(adminMailOptions);
      await newtransporter.sendMail(userMailOptions);

      res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send message!", error: error.message });
    }
  });


  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
