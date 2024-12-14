import jwt from "jsonwebtoken";
import dotEnv from "dotenv";

dotEnv.config();

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // Get the access token from cookies
  const accessToken = req.cookies.accessToken ?? token;

  // If there's no access token, respond with Unauthorized (401)
  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Access token missing or expired." });
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    (err, decode) => {
      if (err)
        return res.status(403).send({ message: "Invalid access token!" });

      next();
    }
  );
};

export default isAuthenticated;
