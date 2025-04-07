// routes/donationRoutes.js
import express from 'express';
import { submitDonation } from '../Controllers/DonateForCauseController.js';

const router = express.Router();

router.post('/donate', submitDonation);

export default router;
