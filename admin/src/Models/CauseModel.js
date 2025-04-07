import mongoose from "mongoose";

// Define the schema
const causeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
});

// Model creation
const causeModel = mongoose.models.food || mongoose.model("AdminCause", causeSchema);

export default causeModel;
