import { NextResponse } from 'next/server';

const products = [
  {
    id: '1',
    name: 'Premium Laptop',
    description: 'High-performance laptop for professionals',
    price: 1299,
    category: 'Electronics',
    stock: 10,
    featured: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation',
    price: 199,
    category: 'Audio',
    stock: 25,
    featured: false,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  // Add more products as needed
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Validate the product data here
  const newProduct = {
    id: String(products.length + 1),
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  products.push(newProduct);
  
  return NextResponse.json(newProduct, { status: 201 });
}