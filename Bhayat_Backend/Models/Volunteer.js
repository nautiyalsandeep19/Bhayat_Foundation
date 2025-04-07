import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  panCard: String,
  state: String,
  address: String,
  image: String,
  position: { type: String, default: "" },
  serialno: { type: Number, default: 1  },
  validity: { type: Date },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;