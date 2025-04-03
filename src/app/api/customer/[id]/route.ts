import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (!id) {
        return NextResponse.json(
          { error: "Customer ID is required for deletion" },
          { status: 400 }
        );
      }
  
      await prisma.customer.delete({
        where: { id },
      });
  
      return NextResponse.json(
        { message: "Customer deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  export async function PUT(req: Request) {
    try {
      const body = await req.json();
      const {
        id,
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
  
      if (!id) {
        return NextResponse.json(
          { error: "Customer ID is required for update" },
          { status: 400 }
        );
      }
  
      const updatedCustomer = await prisma.customer.update({
        where: { id },
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
          product: productType ? { connect: { id: productType } } : undefined,
        },
        include: {
          product: true,
        },
      });
  
      return NextResponse.json(updatedCustomer, { status: 200 });
    } catch (error) {
      console.error("Error updating customer:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }