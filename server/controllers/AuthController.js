import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";
import refreshTokenModel from "../models/refreshTokenModel.js";

import {
  generateAccessToken,
  generateRefreshToken,
  accessCookieOptions,
  refreshCookieOptions,
} from "../utils/jwtHelper.js";

const AuthController = {
  list: async (req, res) => {
    const records = await authModel.find();

    res.send(records);
  },
  register: async (req, res) => {
    try {
      const { email, password, name } = req.body;

      const passwordRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$"
      );
      const existingEmail = await authModel.findOne({ email });

      if (existingEmail) {
        return res.status(400).send({ error: "Email already in use!" });
      }

      if (!passwordRegex.test(password)) {
        return res.status(400).send({
          error:
            "Password must be at least 8 characters, with one uppercase, one lowercase, one digit, and one special character(@$!%*?&#).",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newRecord = new authModel({ email, password: hashPassword, name });

      await newRecord.save();

      res.send({ message: "Registration has been completed successfully!" });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const invalidMsg = { message: false };

      const dbUser = await authModel.findOne({ email });
      if (!dbUser) return res.status(401).send(invalidMsg);

      const correctPassword = await bcrypt.compare(password, dbUser.password);

      if (!correctPassword) return res.status(401).send(invalidMsg);

      const accessToken = generateAccessToken(dbUser);
      const refreshToken = generateRefreshToken(dbUser);

      //save to db
      await new refreshTokenModel({
        token: refreshToken,
        userId: dbUser._id,
      }).save();

      // Send the access token in the cookies, and the refresh token in an HTTP-only cookie
      res.cookie("accessToken", accessToken, accessCookieOptions);

      console.log(accessCookieOptions.secure);

      res.cookie("refreshToken", refreshToken, refreshCookieOptions);

      res.send({
        message: true,
        userId: dbUser._id,
        token: { accessToken, refreshToken },
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  refreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken ?? req.body.token; // Read from cookies

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
      // Verify the refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY
      );

      // Check if refresh token exists in the database
      const storedRefreshToken = await refreshTokenModel.findOne({
        token: refreshToken,
      });
      if (!storedRefreshToken) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const accessToken = generateAccessToken(decoded.userId);

      res.cookie("accessToken", accessToken, accessCookieOptions);

      res.status(200).send({ message: "Access token refreshed!", accessToken });
    } catch (error) {
      res.status(403).send({ message: "Invalid or expired refresh token" });
    }
  },

  logout: async (req, res) => {
    const refreshToken = req.cookies.refreshToken ?? req.body.refreshToken;

    if (!refreshToken) return res.status(400).send("No refresh token found");

    try {
      //remove from db
      await refreshTokenModel.deleteOne({ token: refreshToken });

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.send({ message: "Logout successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error logging out" });
    }
  },
};

export default AuthController;
