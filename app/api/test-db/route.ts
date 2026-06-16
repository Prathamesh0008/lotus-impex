import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

function isMongoConnectionError(error: unknown) {
  return (
    error instanceof Error &&
    (error.name === "MongoServerSelectionError" ||
      /SSL|TLS|server selection|ECONN|ENOTFOUND|ETIMEDOUT/i.test(
        error.message
      ))
  );
}

export async function GET() {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || "lotus_impex";
    const db = client.db(dbName);
    const requiredCollections = ["test", "orders", "enquiries", "buyers"];
    const existingCollections = await db.listCollections().toArray();
    const existingNames = new Set(
      existingCollections.map((collection) => collection.name)
    );

    for (const collectionName of requiredCollections) {
      if (!existingNames.has(collectionName)) {
        await db.createCollection(collectionName);
      }
    }

    await db.collection("test").updateOne(
      { key: "connection-check" },
      {
        $set: {
          message: "MongoDB connected successfully",
          updatedAt: new Date(),
        },
        $setOnInsert: {
          key: "connection-check",
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    const collectionCounts = await Promise.all(
      requiredCollections.map(async (collectionName) => ({
        collection: collectionName,
        count: await db.collection(collectionName).countDocuments(),
      }))
    );

    return NextResponse.json({
      success: true,
      database: dbName,
      collections: collectionCounts,
      message: "MongoDB connected successfully",
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);

    return NextResponse.json(
      {
        success: false,
        message: isMongoConnectionError(error)
          ? "MongoDB connection failed. Check MONGODB_URI, Atlas network access and TLS settings."
          : "MongoDB connection failed",
      },
      { status: 500 }
    );
  }
}
