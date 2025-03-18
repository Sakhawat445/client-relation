import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET  /product
 * Returns all products from the database.
 */
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('GET /product error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * POST /product
 * Creates a new product in the database.
 * Expects JSON body: { name, price, stock, companyName, imageURL? }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, stock, companyName, imageURL } = body;

    // Create the product using Prisma
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        stock,
        companyName,
        imageURL: imageURL || '',
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('POST /product error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
