import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateAccessToken = (userId) => {
  const SECRET = process.env.ACCESS_TOKEN_SECRET;
  if (!SECRET) {
    console.log("Access Token is missing in env");
  }
  return jwt.sign({ userId }, SECRET, { expiresIn: "2h" });
};
const generateRefreshToken = (userId) => {
  const SECRET = process.env.REFRESH_TOKEN_SECRET;
  if (!SECRET) {
    console.log("Access Token is missing in env");
  }
  return jwt.sign({ userId }, SECRET, { expiresIn: "7d" });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ message: "All fields are required" });
  }
  try {
    const exist = await User.findOne({ email });

    if (exist) {
      return res.json({ message: "User already existed" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    return res.status(200).json({ message: "User registered" }, newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found plese register" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const accesToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      strict: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "User loggedin", accesToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogOut = async (_, res) => {
  try {
    res.clearCookie("refreshToken", "");
    return res.status(200).json({ message: "User Loggedout successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const user = await User.findById(userId).select("-password");
    return res.status(200).json({ message: "Accepted", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const refresh = async (req, res) => {
  const token = req.cookie("refreshToken");
  try {
    if (!token) {
      return res.status().json({ message: "Token is missing" });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, payload) => {
      if (error) {
      }

      const accessToken = generateAccessToken(payload.userId);
      const refreshToken = generateRefreshToken(payload.userId);

      res.cookie(refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        strict: true,
        maxAge: 10 * 24 * 60 * 60 * 1000,
      });

      res.json(accessToken);
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Internal server error" });
  }
};
