import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    // Find user by reset token
    const user = await prisma.user.findFirst({
      where: {
        reset_token: token,
        reset_token_expiration: { gt: new Date() },
      },
    });
    
    console.log("User found:", user); // Debugging line
    
    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, reset_token: null, reset_token_expiration: null },
    });
    
    console.log("Password updated successfully"); // Debugging line

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating password:", error); // Debugging line
    return NextResponse.json(
      { message: "Something went wrong", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
