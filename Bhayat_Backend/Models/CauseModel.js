import mongoose from "mongoose";

// Define the schema
const causeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
},{
    timestamps: true
  });
    
// Model creation
const foodModel = mongoose.models.food || mongoose.model("AdminCauseAdd", causeSchema);

export default foodModel;
