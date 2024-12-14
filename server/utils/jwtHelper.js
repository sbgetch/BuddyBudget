import jwt from "jsonwebtoken";
import dotEnv from "dotenv";

dotEnv.config();

export const generateAccessToken = (userInfo) => {
  return jwt.sign(
    { userId: userInfo._id },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    }
  );
};

export const generateRefreshToken = (userInfo) => {
  return jwt.sign(
    { userId: userInfo._id },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    }
  );
};

export const accessCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Secure flag for production
  sameSite: "None",
  maxAge: 15 * 60 * 1000, // 15 minutes expiry for accessToken
};

export const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Secure flag for production
  sameSite: "None",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry for refreshToken
};
