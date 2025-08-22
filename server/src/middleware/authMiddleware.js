import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  const authToken = await req.headers.authorization;
 
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  const token = authToken.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "unAuthrized user" });
  }

  const SECRET = process.env.ACCESS_TOKEN_SECRET;
  try {
    const decode = jwt.verify(token, SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Token is inValid" });
  }
};
