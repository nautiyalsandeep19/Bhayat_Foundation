import React, { useState, useEffect } from 'react';
import { assets } from '../../myassets.js';
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PaymentCard() {
    const location = useLocation();
    const donorDetails = location.state || {};
    const navigate = useNavigate();

    const [amount, setAmount] = useState("");
    const [tip, setTip] = useState(10);
    const [showPAN, setShowPAN] = useState(false);
    const [panNumber, setPanNumber] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount)) {
            setTip(numericAmount > 5000 ? 5 : numericAmount > 2000 ? 7 : 10);
            setShowPAN(numericAmount > 1900);
        } else {
            setShowPAN(false);
        }
    }, [amount]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            if (parseFloat(value) > 10000000) {
                toast.error("Amount cannot exceed ₹10,000,000.");
                return;
            }
            setAmount(value);
        }
    };

    const calculateTotalAmount = () => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount)) {
            return (numericAmount + (numericAmount * tip / 100)).toFixed(2);
        }
        return "0.00";
    };

    const handlePayment = async () => {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            toast.error("Please enter a valid amount greater than 0.");
            return;
        }

        if (showPAN && !panNumber) {
            toast.error("PAN number is required for donations above ₹1900.");
            return;
        }

        setLoading(true);

        try {
            const totalAmount = +(numericAmount + (numericAmount * tip / 100)).toFixed(2);

            const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalAmount }),
            });

            const data = await res.json();

            if (!res.ok || !data?.data?.amount) {
                toast.error("Failed to initiate payment");
                return;
            }

            handlePaymentVerify(data.data, donorDetails, totalAmount);
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Something went wrong during payment initiation.");
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentVerify = async (orderData, donorDetails, totalAmount) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: orderData.amount,
            currency: orderData.currency,
            name: donorDetails.fullname || "Donor",
            description: "Donation Payment",
            order_id: orderData.id,
            handler: async (response) => {
                try {
                    const paymentData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        name: donorDetails.fullname,
                        email: donorDetails.email,
                        mobile: parseInt(donorDetails.mobile, 10),
                        amount: Math.round(totalAmount * 100),
                        panNumber: showPAN ? panNumber : null,
                        donationId: donorDetails.donationId,
                        donationType: donorDetails.donationType,
                        message: donorDetails.message,
                    };

                    const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(paymentData),
                    });

                    const verifyData = await res.json();
                    if (verifyData.message) {
                        toast.success(verifyData.message);
                        navigate("/");
                    } else {
                        toast.error("Payment verification failed.");
                    }
                } catch (error) {
                    toast.error('Failed to verify payment!');
                }
            },
            theme: { color: "#5f63b8" },
            modal: {
                escape: true,
                ondismiss: () => {
                    toast.error("Payment process was cancelled.");
                    navigate("/");
                },
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen" style={{ backgroundImage: "linear-gradient(60deg, #45d1dc 0%, #5b86e5 80%)" }}>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="flex space-x-4">
                        <div className="h-16 w-5 bg-yellow-400 animate-bounce delay-200 rounded-lg"></div>
                        <div className="h-16 w-5 bg-green-400 animate-bounce delay-300 rounded-lg"></div>
                        <div className="h-16 w-5 bg-pink-400 animate-bounce delay-400 rounded-lg"></div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md w-full max-w-sm mx-4 md:mx-auto p-6">
                <div className="flex flex-col items-center">
                    <img src={assets.logo} alt="logo" className="w-24 h-24" />
                    <h2 className="mt-4 text-lg font-semibold">Paying</h2>
                    <p className="text-gray-700 text-center">BHAYAT NGO</p>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-2xl font-bold">₹{amount || "0"}</p>
                </div>
                <input
                    type="text"
                    value={amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    className="w-full border p-2 text-center mt-2"
                />
                <p className="text-sm text-gray-500 mt-2">
                    You are eligible for tax exemption benefits.
                </p>
                <p className="text-sm text-gray-500">
                    We charge no platform fee. Consider a {tip}% tip to support Bhayat NGO 🙏
                </p>

                {showPAN && (
                    <input
                        type="text"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value)}
                        placeholder="Enter PAN number"
                        className="w-full border p-2 mt-2"
                        required
                    />
                )}

                <button
                    onClick={handlePayment}
                    className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
                    disabled={loading}
                >
                    Pay ₹{calculateTotalAmount()}
                </button>
            </div>
        </div>
    );
}
