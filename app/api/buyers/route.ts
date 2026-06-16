import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

type BuyerView = {
  email?: string;
  name?: string;
  rememberMe?: boolean;
  signInCount?: number;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "lotus_impex");
    const buyers = await db
      .collection<BuyerView>("buyers")
      .find({})
      .project({ passwordHash: 0 })
      .sort({ lastLoginAt: -1, createdAt: -1 })
      .limit(200)
      .toArray();

    return NextResponse.json({ success: true, buyers });
  } catch (error) {
    console.error("Buyers fetch error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to fetch buyers." },
      { status: 500 }
    );
  }
}
