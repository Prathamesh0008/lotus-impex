import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

type BuyerAccount = {
  email: string;
  name: string;
  passwordHash: string;
  rememberMe?: boolean;
  signInCount: number;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

function clean(value: unknown) {
  return String(value || "").trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function nameFromEmail(email: string) {
  const localPart = email.split("@")[0] || "Buyer";
  return localPart
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      firstName?: string;
      lastName?: string;
      authMode?: "signIn" | "signUp";
      rememberMe?: boolean;
    };

    const email = clean(body.email).toLowerCase();
    const password = clean(body.password);
    const firstName = clean(body.firstName);
    const lastName = clean(body.lastName);
    const authMode = body.authMode || "signIn";
    const rememberMe = Boolean(body.rememberMe);

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!password || password.length < 4) {
      return NextResponse.json(
        { success: false, message: "Please enter your password." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "lotus_impex");
    const buyers = db.collection<BuyerAccount>("buyers");
    const existingBuyer = await buyers.findOne({ email });
    const now = new Date();

    if (existingBuyer) {
      if (authMode === "signUp") {
        return NextResponse.json(
          { success: false, message: "This email is already registered." },
          { status: 409 }
        );
      }

      const passwordMatches = await bcrypt.compare(
        password,
        existingBuyer.passwordHash
      );

      if (!passwordMatches) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password." },
          { status: 401 }
        );
      }

      await buyers.updateOne(
        { email },
        {
          $set: {
            rememberMe,
            lastLoginAt: now,
            updatedAt: now,
          },
          $inc: {
            signInCount: 1,
          },
        }
      );

      return NextResponse.json({
        success: true,
        user: {
          name: existingBuyer.name,
          email: existingBuyer.email,
        },
      });
    }

    if (authMode !== "signUp") {
      return NextResponse.json(
        { success: false, message: "Account not found. Please sign up first." },
        { status: 404 }
      );
    }

    if (!firstName || !lastName) {
      return NextResponse.json(
        { success: false, message: "Please enter first name and last name." },
        { status: 400 }
      );
    }

    const buyer: BuyerAccount = {
      email,
      name: `${firstName} ${lastName}`.trim() || nameFromEmail(email),
      passwordHash: await bcrypt.hash(password, 12),
      rememberMe,
      signInCount: 1,
      lastLoginAt: now,
      createdAt: now,
      updatedAt: now,
    };

    await buyers.insertOne(buyer);

    return NextResponse.json({
      success: true,
      user: {
        name: buyer.name,
        email: buyer.email,
      },
    });
  } catch (error) {
    console.error("Buyer sign-in error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to sign in. Please try again." },
      { status: 500 }
    );
  }
}
