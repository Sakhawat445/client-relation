export type User = {
    id: string;
    name: string;
    email: string;
    imageURL?: string; 
  }

  export  type Customer ={
    id?: string;
    name: string;
    email: string;
    imageURI?: string;
    orderCount?: number;
    spendings?: number;
    documentURL?: string;
    createdDate: string; 
    status: string;
    address: string;
    contactNumber: number;
    deviceType: string;
    selectedProduct?: string;
    productType?: string;
    product?: { id: string; name: string }; 

  }

  export type Product ={
    id?: string;
    name: string;
    price: number;
    stock: number;
    companyName: string;
    imageURL: string;
  }
  