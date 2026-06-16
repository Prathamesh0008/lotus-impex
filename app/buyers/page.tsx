import type { Metadata } from "next";
import clientPromise from "@/app/lib/mongodb";

type BuyerView = {
  email?: string;
  name?: string;
  rememberMe?: boolean;
  signInCount?: number;
  lastLoginAt?: Date;
  createdAt?: Date;
};

export const metadata: Metadata = {
  title: "Signed In Buyers",
  description: "View Lotus Impex signed-in buyer accounts saved in MongoDB.",
  alternates: {
    canonical: "/buyers",
  },
};

async function getBuyers() {
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

    return buyers;
  } catch (error) {
    console.error("Buyers page error:", error);
    return [];
  }
}

function formatDate(date?: Date) {
  if (!date) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default async function BuyersPage() {
  const buyers = await getBuyers();

  return (
    <main className="min-h-screen bg-[#f4efe7] px-5 py-12 text-black sm:px-8 lg:px-10">
      <section className="mx-auto max-w-[1500px]">
        <div className="mb-10">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#b58a52]">
            MongoDB Buyers
          </p>
          <h1 className="text-6xl leading-[0.86] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            Signed In Users
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-black/60">
            Buyer accounts created from the sign-in form are listed here from
            the MongoDB buyers collection.
          </p>
        </div>

        {buyers.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {buyers.map((buyer) => (
              <article
                key={buyer.email}
                className="rounded-[8px] border border-black/10 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="truncate text-3xl font-black tracking-[-0.04em]">
                      {buyer.name || "Buyer"}
                    </h2>
                    <p className="mt-2 break-all text-sm font-bold text-black/55">
                      {buyer.email}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#f4efe7] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#b58a52]">
                    {buyer.rememberMe ? "Remembered" : "User"}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 border-t border-black/10 pt-5 text-sm font-bold text-black/55">
                  <div className="flex justify-between gap-4">
                    <span>Sign-ins</span>
                    <span className="text-black">{buyer.signInCount || 1}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/35">
                      Last Login
                    </p>
                    <p className="mt-1 text-black">
                      {formatDate(buyer.lastLoginAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/35">
                      Created
                    </p>
                    <p className="mt-1 text-black">
                      {formatDate(buyer.createdAt)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[8px] border border-black/10 bg-white p-10 text-center shadow-sm">
            <h2 className="text-4xl tracking-[-0.04em]">
              No Signed In Users
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-black/55">
              Use the sign-in form once. New buyer accounts will appear here
              from MongoDB.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
