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
 * Expects a JSON body with the following fields:
 * - name: string
 * - email: string
 * - imageURI: string (optional)
 * - orderCount: string or number (will be parsed to an int)
 * - spendings: string or number (will be parsed to an int)
 * - documentURL: string (optional)
 * - createdDate: string (date) or number (timestamp)
 * - status: string (e.g., "pending" or "approved")
 * - address: string
 * - contactNumber: string or number (will be parsed to an int)
 * - deviceType: string (e.g., "mobile" or "desktop")
 * - selectedProduct: string (product id, optional)
 */
export async function POST(request: Request) {
  const body = await request.json();
  try {
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
          } = body;

    // Create the new customer record.
    // Adjust field conversions as needed (e.g., if your schema expects numbers or dates).
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        imageURI: imageURI || null,
        orderCount: orderCount ? parseInt(orderCount) : undefined,
        spendings: spendings ? parseInt(spendings) : undefined,
        documentURL: documentURL || null,
        // Assuming your schema stores createdDate as a DateTime; adjust if it's stored as an int.
        createdDate: createdDate ? new Date(createdDate) : new Date(),
        status,
        address,
        contactNumber: contactNumber ? contactNumber.toString() : undefined,
        deviceType,
        // Optionally store the selected product id, if your Customer model has a relation or field for it.
        // productId: selectedProduct || null,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error('POST /customer error:', error);
    // console.log(object)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
