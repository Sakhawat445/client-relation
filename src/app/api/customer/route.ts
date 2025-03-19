import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /customer
 * Retrieves all customers from the database.
 */
export async function GET() {
  try {
    const customers = await prisma.customer.findMany();
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error('GET /customer error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * POST /customer
 * Creates a new customer in the database.
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      imageURI,
      orderCount,
      spendings,
      documentURL,
      createdDate,
      status,
      address,
      contactNumber,
      deviceType,
      productType, // Ensure this is passed
    } = body;

    if (!productType) {
      return NextResponse.json({ error: "ProductType is required" }, { status: 400 });
    }

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        imageURI,
        orderCount:Number(orderCount) ,
        spendings: Number(spendings),
        documentURL,
        createdDate: new Date(createdDate),
        status,
        address,
        contactNumber: Number(contactNumber),
        deviceType,
        product: {
          connect: { id: productType }, // Correct way to associate an existing product
        },
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}