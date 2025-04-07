import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    amount: { type: Number, required: true },
    panNumber: { type: String, default: null },
    donationId: { type: String, required: true },  
    donationType: { type: String, required: true },
    message: { type: String, required: true }, 
    date: { type: Date, default: Date.now },
},{
    timestamps: true
  });

export default model('PaymentDetails', PaymentSchema);
