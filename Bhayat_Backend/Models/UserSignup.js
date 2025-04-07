import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name :{type:String , required:true},
    email :{type:String , required:true,unique:true},
    password :{type:String , required:true},
    isVolunteer: { 
        type: Boolean, 
        default: false 
      },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

const userSignUpModel = mongoose.models.userSignup || mongoose.model('userSignup',userSchema);

export default userSignUpModel;