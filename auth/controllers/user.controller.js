import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateVerificationCode from "../utils/generateVerificationCode.js";
import callUser from "../utils/callUser.js";

export const registerUser = async function (req, res) {
  try {
    let { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "You are already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let verificationCode = generateVerificationCode();
    user = await userModel.create({
      name,
      email,
      password: hash,
      phone,
      verificationCode,
    });

    await callUser(phone, verificationCode);
    return res
      .status(201)
      .json({ message: "Wait for the phone call for the OTP" });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : `Error registering the user: ${error}`,
    });
  }
};

export const verifyPhone = async function (req, res) {
  try {
    let { phone, otp } = req.body;
    let user = await userModel.findOne({ phone });
    if (!otp) {
      return res.status(400).json({ message: "Otp is required" });
    }

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this given phone number not found" });
    }
    if (String(otp) === String(user.verificationCode)) {
      const token = jwt.sign({ name, email }, process.env.JWT_KEY);
      res.cookie("token", token);

      return res.status(201).json({ message: "Registration Successfull" });
    } else {
      return res.status(401).json({ message: "Invalid or Expired OTP" });
    }
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : `Error validating the user's phone number: ${error}`,
    });
  }
};

export const loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "You are not registered" });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      let token = jwt.sign({ email, name: user.name }, process.env.JWT_KEY);
      res.cookie("token", token);
      return res.status(200).json({ message: "Login Success" });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : `Error logging in the user: ${error}`,
    });
  }
};

export const logoutUser = function (req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Success" });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : `Error logging out the user: ${error}`,
    });
  }
};

export const getUser = async function (req, res) {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : `Error fetching the user: ${error}`,
    });
  }
};
