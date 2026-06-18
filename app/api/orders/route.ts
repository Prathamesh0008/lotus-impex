import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

type CartItem = {
  slug?: string;
  categorySlug?: string;
  name?: string;
  image?: string;
  summary?: string;
  minOrder?: string;
  quantity?: number;
};

type OrderPayload = {
  buyer?: {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
  };
  delivery?: {
    address?: string;
    country?: string;
    port?: string;
    terms?: string;
  };
  items?: CartItem[];
  totals?: {
    totalQuantity?: number;
    subtotal?: number;
    documentation?: number;
    handling?: number;
    grandTotal?: number;
  };
  paymentMethod?: string;
  account?: {
    name?: string;
    email?: string;
  };
};

function clean(value: unknown) {
  return String(value || "").trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createOrderNumber() {
  return `LI-${Date.now().toString().slice(-8)}`;
}

function isMongoConnectionError(error: unknown) {
  return (
    error instanceof Error &&
    (error.name === "MongoServerSelectionError" ||
      /SSL|TLS|server selection|ECONN|ENOTFOUND|ETIMEDOUT/i.test(
        error.message
      ))
  );
}

export async function GET(request: NextRequest) {
  try {
    const email = clean(request.nextUrl.searchParams.get("email")).toLowerCase();
    const filter = email
      ? {
          $or: [
            { "account.email": email },
            { "buyer.email": email },
          ],
        }
      : {};
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "lotus_impex");
    const orders = await db
      .collection("orders")
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Orders fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        message: isMongoConnectionError(error)
          ? "Unable to connect to MongoDB. Check MONGODB_URI, Atlas network access and TLS settings."
          : "Unable to fetch orders.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as OrderPayload;
    const buyer = body.buyer || {};
    const delivery = body.delivery || {};
    const account = body.account || {};
    const items = Array.isArray(body.items) ? body.items : [];

    const name = clean(buyer.name);
    const email = clean(buyer.email);
    const phone = clean(buyer.phone);
    const company = clean(buyer.company);
    const address = clean(delivery.address);
    const country = clean(delivery.country);

    if (!items.length) {
      return NextResponse.json(
        { success: false, message: "Cart is empty." },
        { status: 400 }
      );
    }

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, message: "Please enter buyer name." },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || !address || !country) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter phone, address and destination country.",
        },
        { status: 400 }
      );
    }

    const order = {
      orderNumber: createOrderNumber(),
      status: "new",
      buyer: {
        name,
        email,
        phone,
        company,
      },
      delivery: {
        address,
        country,
        port: clean(delivery.port),
        terms: clean(delivery.terms) || "FOB",
      },
      items: items.map((item) => ({
        slug: clean(item.slug),
        categorySlug: clean(item.categorySlug),
        name: clean(item.name),
        image: clean(item.image),
        summary: clean(item.summary),
        minOrder: clean(item.minOrder),
        quantity: Number(item.quantity || 1),
      })),
      totals: body.totals || {},
      paymentMethod: clean(body.paymentMethod) || "bank",
      account: {
        name: clean(account.name) || name,
        email: clean(account.email) || email,
      },
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "lotus_impex");
    await db.collection("orders").insertOne(order);

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      message: "Order saved successfully.",
    });
  } catch (error) {
    console.error("Order save error:", error);

    return NextResponse.json(
      {
        success: false,
        message: isMongoConnectionError(error)
          ? "Unable to connect to MongoDB. Check MONGODB_URI, Atlas network access and TLS settings."
          : "Unable to save order.",
      },
      { status: 500 }
    );
  }
}
