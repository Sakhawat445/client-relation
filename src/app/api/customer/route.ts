// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// /**
//  * GET /customer
//  * Retrieves all customers from the database.
//  */
// export async function GET() {
//   try {
//     const customers = await prisma.customer.findMany();
//     return NextResponse.json(customers, { status: 200 });
//   } catch (error) {
//     console.error('GET /customer error:', error);
//     return NextResponse.json(
//       { message: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * POST /customer
//  * Creates a new customer in the database.
//  */

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const {
//       name,
//       email,
//       imageURI,
//       orderCount,
//       spendings,
//       documentURL,
//       // createdDate,
//       status,
//       address,
//       contactNumber,
//       deviceType,
//       productType, // Ensure this is passed
//     } = body;

//     if (!productType) {
//       return NextResponse.json({ error: "ProductType is required" }, { status: 400 });
//     }

//     const newCustomer = await prisma.customer.create({
//       data: {
//         name,
//         email,
//         imageURI,
//         orderCount:Number(orderCount) ,
//         spendings: Number(spendings),
//         documentURL,
//         // createdDate: new Date(),
//         status,
//         address,
//         contactNumber: Number(contactNumber),
//         deviceType,
//         product: {
//           connect: { id: productType }, // Correct way to associate an existing product
//         },
//       },
//     });

//     return NextResponse.json(newCustomer, { status: 201 });
//   } catch (error) {
//     console.error("Error creating customer:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /customer
 * Retrieves all customers from the database.
 */
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        product: true, // Include the related product information
      },
    });
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
      status,
      address,
      contactNumber,
      deviceType,
      productType,
    } = body;

    if (!productType) {
      return NextResponse.json(
        { error: "ProductType is required" }, 
        { status: 400 }
      );
    }

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        imageURI,
        orderCount: Number(orderCount),
        spendings: Number(spendings),
        documentURL,
        status,
        address,
        contactNumber: Number(contactNumber),
        deviceType,
        product: {
          connect: { id: productType },
        },
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

/**
 * PUT /customer
 * Updates an existing customer in the database.
 */


/**
 * DELETE /customer
 * Deletes a customer from the database.
 */