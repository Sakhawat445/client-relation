import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "../../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    // Generate a reset token (for simplicity, just a random string)
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Normally, store this token in DB & send email
    console.log(`Reset token for ${email}: ${resetToken}`);

    return NextResponse.json({ message: "Password reset link sent" });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
