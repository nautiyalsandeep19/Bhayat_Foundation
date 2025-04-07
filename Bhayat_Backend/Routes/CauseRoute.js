import express from "express";
import { addCause, listCause} from "../Controllers/FoodController.js";
import multer from "multer";

// Image storage system
const Storage = multer.diskStorage({
    destination: "./uploads/causePhoto",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    },
});

// Middleware for file uploads
const upload = multer({ storage: Storage });

const foodRouter = express.Router();

// Single endpoint for adding food items
foodRouter.post("/add", upload.single("image"), addCause);
foodRouter.get("/list",listCause);
export default foodRouter;
