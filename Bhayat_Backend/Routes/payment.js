// import express from 'express';
// import Razorpay from 'razorpay';
// import 'dotenv/config.js';
// import crypto from 'crypto';
// import Payment from '../Models/Payment.js';

// const router = express.Router();

// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_SECRET,
// });

// // ROUTE 1: Create Order API
// router.post('/order', (req, res) => {
//     const { amount } = req.body;

//     try {
//         const amountInPaise = Math.round(amount * 100); // Ensure integer value
//         const options = {
//             amount: amountInPaise,
//             currency: "INR",
//             receipt: crypto.randomBytes(10).toString("hex"),
//         };

//         razorpayInstance.orders.create(options, (error, order) => {
//             if (error) {
//                 console.log("Razorpay Error:", error);
//                 return res.status(500).json({ message: "Something Went Wrong!" });
//             }
//             res.status(200).json({ data: order });
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error!" });
//         console.log(error);
//     }
// });

// // ROUTE 2: Verify Payment API
// router.post('/verify', async (req, res) => {
//     const {
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//         name,
//         email,
//         mobile,
//         amount,
//         panNumber,
//         donationId,
//         donationType,
//         message
//     } = req.body;

//     try {
//         const sign = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
//             .update(sign.toString())
//             .digest("hex");

//         if (expectedSign === razorpay_signature) {
//             const payment = new Payment({
//                 razorpay_order_id,
//                 razorpay_payment_id,
//                 razorpay_signature,
//                 name,
//                 email,
//                 mobile,
//                 amount: amount / 100, // Store in rupees
//                 panNumber: panNumber || null,
//                 donationId,
//                 donationType,
//                 message,
//             });

//             await payment.save();
//             res.json({ message: "Payment verified and stored successfully" });
//         } else {
//             res.status(400).json({ message: "Payment verification failed" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error!" });
//         console.log(error);
//     }
// });

// // ROUTE 3: Get total donations
// router.get('/total-donations/:donationId', async (req, res) => {
//     const { donationId } = req.params;

//     try {
//         const totalAmount = await Payment.aggregate([
//             { $match: { donationId } },
//             { $group: { _id: null, total: { $sum: "$amount" } } }
//         ]);

//         res.json({
//             success: true,
//             totalAmount: totalAmount.length > 0 ? totalAmount[0].total : 0
//         });
//     } catch (error) {
//         console.error("Error fetching total donations:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// });

// export default router;

import express from 'express';
import Razorpay from 'razorpay';
import 'dotenv/config.js';
import crypto from 'crypto';
import Payment from '../Models/Payment.js';

const router = express.Router();

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// ROUTE 1: Create Order
router.post('/order', (req, res) => {
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }

    try {
        const amountInPaise = Math.round(amount * 100);
        const options = {
            amount: amountInPaise,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.error("Razorpay Order Error:", error);
                return res.status(500).json({ message: "Razorpay order creation failed" });
            }
            res.status(200).json({ data: order });
        });
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ROUTE 2: Verify Payment and Store to DB
router.post('/verify', async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        name,
        email,
        mobile,
        amount,
        panNumber,
        donationId,
        donationType,
        message
    } = req.body;

    // Basic validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !name || !email || !amount) {
        return res.status(400).json({ message: "Missing required payment details" });
    }

    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed (signature mismatch)" });
        }

        // Save verified payment
        const newPayment = new Payment({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            name,
            email,
            mobile,
            amount: amount / 100, // Store in ₹
            panNumber: panNumber || null,
            donationId,
            donationType,
            message,
        });

        await newPayment.save();

        return res.status(200).json({ message: "Payment verified and stored successfully", payment: newPayment });
    } catch (error) {
        console.error("Verification Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// ROUTE 3: Get total donations by donationId
router.get('/total-donations/:donationId', async (req, res) => {
    const { donationId } = req.params;

    try {
        const result = await Payment.aggregate([
            { $match: { donationId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalAmount = result.length > 0 ? result[0].total : 0;

        res.status(200).json({
            success: true,
            donationId,
            totalAmount
        });
    } catch (error) {
        console.error("Total Donations Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;
