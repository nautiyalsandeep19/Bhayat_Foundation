// controllers/donationController.js
import Donation from '../Models/DonateForCause.js';

export const submitDonation = async (req, res) => {
  const { fullname, mobile, email, message, donationId, donationType, amount } = req.body;

  if (!donationId || !donationType) {
    return res.status(400).json({ error: "Donation ID or Type is missing." });
  }

  try {
    const newDonation = new Donation({
      fullname,
      mobile,
      email,
      message,
      donationId,
      donationType,
      amount
    });

    await newDonation.save();
    res.status(201).json({ message: 'Donation successfully recorded!' });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ error: 'Failed to save donation data.' });
  }
};
