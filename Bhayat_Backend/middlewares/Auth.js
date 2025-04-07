import jwt from "jsonwebtoken";

const UserSignupAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!tokenDecode.id) {
      return res.status(401).json({ success: false, message: "Invalid token. Login Again." });
    }

    req.body.userID = tokenDecode.id; // ✅ Store user ID inside req.body.userID
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Authentication failed.", error: error.message });
  }
};



export default UserSignupAuth;