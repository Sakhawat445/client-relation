import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'Invalid customer id' }, { status: 400 });
  }

  try {
    await prisma.customer.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Customer deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, email, orderCount } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Customer ID is required for update" },
        { status: 400 }
      );
    }

    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: {
        name,
        email,
        orderCount: Number(orderCount),
      },
    });

    return NextResponse.json(updatedCustomer, { status: 200 });
  } catch (error) {
    console.error(
      "Error updating customer:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
