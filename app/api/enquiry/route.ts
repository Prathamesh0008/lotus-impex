import { NextRequest, NextResponse } from "next/server";

type EnquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  category?: string;
  quantity?: string;
  country?: string;
  message?: string;
  companyName?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value: unknown) {
  return String(value || "").trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EnquiryPayload;

    const name = clean(body.name);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const category = clean(body.category);
    const quantity = clean(body.quantity);
    const country = clean(body.country);
    const message = clean(body.message);
    const companyName = clean(body.companyName);

    if (companyName) {
      return NextResponse.json(
        { message: "Invalid enquiry request." },
        { status: 400 }
      );
    }

    if (!name || name.length < 2) {
      return NextResponse.json(
        { message: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { message: "Please select a product category." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { message: "Please add more details about your requirement." },
        { status: 400 }
      );
    }

    const enquiry = {
      name,
      email,
      phone,
      category,
      quantity,
      country,
      message,
      createdAt: new Date().toISOString(),
    };

    console.log("New Lotus Impex enquiry:", enquiry);

    /*
      Later database connection will go here.

      Example:
      await db.collection("enquiries").insertOne(enquiry);

      Later email notification will also go here.
    */

    return NextResponse.json(
      {
        message:
          "Thank you. Your export enquiry has been received. We will review it and contact you soon.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}