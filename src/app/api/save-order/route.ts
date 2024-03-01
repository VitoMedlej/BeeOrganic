import { v4 as uuidv4 } from 'uuid';
import client from '@/database/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function POST(req: NextRequest, res: NextApiResponse) {
  const {order} = await req.json()
  if (req.method === 'POST') {
    // Process a POST request
    if (!order) return NextResponse.json({success:false})

    // Generate a unique order number
    const orderNumber = uuidv4();

    // Add the unique order number to the order object
    order.orderNumber = orderNumber;

    const insertReq = await client.db("BEE").collection("Orders").insertOne(order);
    if (insertReq.acknowledged) {         
      return NextResponse.json({success:true, orderNumber: orderNumber});
    }
  }
  return NextResponse.json({success:false});
}