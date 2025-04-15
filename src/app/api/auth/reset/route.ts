import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import moment from "moment";
import nodemailer from "nodemailer";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const userEmail = body.email;

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiration = moment().add(1, "hour").toDate();

    await prisma.user.update({
      where: { email: userEmail },
      data: {
        reset_token: resetToken,
        reset_token_expiration: resetTokenExpiration,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/newPassword/?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Reset Password",
      html: `Please click <a href="${resetLink}">here</a> to reset your password.`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Reset password email sent" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      },
      { status: 500 },
    );
  }
};
