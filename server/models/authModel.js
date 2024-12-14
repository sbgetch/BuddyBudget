import mongoose from "mongoose";
import dotEnv from "dotenv";

dotEnv.config();

const authSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: {
      type: String,
      // required: function () {
      //     return !this.oauth.length;
      // },
    },
  },
  {
    timestamps: true,
  }
);

const AuthModel = mongoose.model("User", authSchema);

export default AuthModel;
