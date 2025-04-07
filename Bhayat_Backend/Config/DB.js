import {connect} from "mongoose";
 const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI,{
        dbName: "PaymentGateway"
    });

    console.log("---***Database Connected Successfully***---")
  } catch (error) {
    console.log("Database connection error:", error);
  }
}

export default connectDB;
