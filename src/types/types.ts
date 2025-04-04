export type User = {
    id: string;
    name: string;
    email: string;
    imageURL?: string; // Add this line
  }

  export  type Customer ={
    id?: string;
    name: string;
    email: string;
    imageURI?: string;
    orderCount?: number;
    spendings?: number;
    documentURL?: string;
    createdDate: string; // or Date, depending on your schema
    status: string;
    address: string;
    contactNumber: number;
    deviceType: string;
    selectedProduct?: string;
    productType?: string; // Added productType property
    product?: { id: string; name: string }; // Add this property

  }

  export type Product ={
    id?: string;
    name: string;
    price: number;
    stock: number;
    companyName: string;
    imageURL: string;
  }
  