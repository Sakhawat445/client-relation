import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import  prisma  from "./../../../../../lib/prisma"; // Ensure correct import path

export async function POST(req: Request) {
  try {
    const { name, email, password , address ,phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, adrees: address, phone },
    });

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
