// models/Donation.js
import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  donationId: { type: mongoose.Schema.Types.ObjectId, refPath: 'donationType', required: true }, // Dynamic Reference
  donationType: { type: String, required: true }, // Identifies type
  amount: { type: Number, required: true }, // Include donation amount
  date: { type: Date, default: Date.now }
},{
  timestamps: true 
});

const Donation = mongoose.model('DonationForWhichCause', donationSchema);
export default Donation;
