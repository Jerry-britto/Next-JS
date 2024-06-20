import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const { token, newPassword } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "Kindly provide a token" },
        { status: 400 }
      );
    }

    if (!newPassword) {
      return NextResponse.json(
        { message: "Kindly provide a password" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Password Reset successfully done" },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
