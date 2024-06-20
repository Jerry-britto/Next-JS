import mongoose, { Schema, model } from "mongoose";

interface user {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: String;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: String;
  verifyTokenExpiry?: Date;
}

const userSchema = new Schema<user>(
  {
    username: {
      type: String,
      required: [true, "Please provide an username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      unique: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String, // token for forgot password and setting up a new password
    forgotPasswordTokenExpiry: Date,
    verifyToken: String, // token for verifying the user after successful registration
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

/*
while creating model we are ensuring that the model is not created everytime.
If it is alreday initated in the databaase we don't create the users model again
*/

const User = mongoose.models.users || model("users", userSchema);

export default User;
