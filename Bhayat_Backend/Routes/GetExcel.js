import Payment from '../Models/Payment.js';
import excelJS from "exceljs"
import fs from 'fs'
import path from 'path'
import 'dotenv/config.js';
import express from "express"

const router = express.Router();
// 🟢 Get Last 10 Transactions
router.get("/latest-transactions", async (req, res) => {
    try {
      const transactions = await Payment.find().sort({ date: -1 }).limit(10);
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Server Error can't find last 10 transaction" });
    }
  });


// -------------------------------------GET EXCEL and Download ---------------
router.get('/export-excel', async (req, res) => {
  try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const payments = await Payment.find({
        date: { $gte: today } 
    });

      if (payments.length === 0) {
          return res.status(200).json({ message: 'No data found for today' });
      }

      const workbook = new excelJS.Workbook();
      const worksheet = workbook.addWorksheet('Payments');

      worksheet.columns = [
          { header: 'Order ID', key: 'razorpay_order_id', width: 20 },
          { header: 'Payment ID', key: 'razorpay_payment_id', width: 20 },
          { header: 'Name', key: 'name', width: 20 },
          { header: 'Email', key: 'email', width: 25 },
          { header: 'Mobile', key: 'mobile', width: 25 },
          { header: 'Amount', key: 'amount', width: 15 },
          { header: 'PAN Number', key: 'panNumber', width: 20 },
          { header: 'Date', key: 'date', width: 20 }
      ];

      payments.forEach((payment) => {
          worksheet.addRow(payment);
      });

      const filePath = path.join(process.cwd(), 'payments.xlsx');
      await workbook.xlsx.writeFile(filePath);

      res.download(filePath, 'Payments.xlsx', (err) => {
          if (err) {
              console.error('Error downloading file:', err);
              res.status(500).send('Error downloading file');
          }
          fs.unlinkSync(filePath); // Delete file after sending
      });
  } catch (error) {
      console.error('Error exporting data:', error);
      res.status(500).json({ message: 'Server Error' });
  }
});

export default router;