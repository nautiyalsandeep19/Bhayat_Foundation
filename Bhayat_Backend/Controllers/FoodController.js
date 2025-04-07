import foodModel from "../Models/CauseModel.js";
import fs from "fs"

const addCause = async (req, res) => {
    const image_filename = `${req.file.filename}`
    console.log("hey sandy add here")
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error("Error in addCause:", error);
        res.status(500).json({ success: false, message: "Error Adding Food" });
    }
}


const listCause=async (req,res)=>{
try {
    const foods = await foodModel.find({});
    res.json({success:true, data:foods})
} catch (error) {
    console.log(error)
    res.json({success:false , message:"Error"})
}
}


const removeCause = async (req,res) =>{
try {
    const food = await foodModel.findById(req.body.id);   
    fs.unlink(`uploads/${food.image}`,()=>{})             
   await foodModel.findByIdAndUpdate(req.body.id);     
   res.json({success:true , message:"cause removed"})
} catch (error) {
    console.log(error)
    res.json({success:false , message:"Error"})
}
}

export { addCause , listCause ,removeCause};
