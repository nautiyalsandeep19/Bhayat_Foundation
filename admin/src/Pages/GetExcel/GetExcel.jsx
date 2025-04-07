import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFileDownload } from "react-icons/fa"; // Import FontAwesome icon
import styles from "./GetExcel.module.css"; // Import PostCSS styles
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const GetExcel = () => {
  const [transactions, setTransactions] = useState([]);
  const url = import.meta.env.VITE_BACKEND_HOST_URL;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${url}/api/getexcelsheet/latest-transactions`);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  const handleDownload = async () => {
    try {
        const response = await axios.get(`${url}/api/getexcelsheet/export-excel`, {
            responseType: "blob",
        });

        if (response.data.type.includes("json")) {
            // Convert blob to JSON
            const text = await response.data.text();
            const json = JSON.parse(text);
            toast.error(json.message, { position: "top-right", autoClose: 3000 });
            return;
        }

        // If data exists, download the file
        const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "Payments.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error downloading file:", error);
        toast.error("Failed to download file. Please try again.");
    }
};


  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Admin Panel</h2>

      <button onClick={handleDownload} className={styles.downloadButton}>
        <FaFileDownload className={styles.icon} /> Download Excel
      </button>
{

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            { transactions.map((t, i) => (
              <tr key={i}>
                <td>{t.razorpay_payment_id}</td>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.mobile}</td>
                <td>₹{t.amount}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>{new Date(t.date).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
}
    </div>
  );
};

export default GetExcel;
