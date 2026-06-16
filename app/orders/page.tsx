import type { Metadata } from "next";
import Link from "next/link";
import clientPromise from "@/app/lib/mongodb";

type OrderItem = {
  name?: string;
  categorySlug?: string;
  minOrder?: string;
  quantity?: number;
};

type OrderView = {
  orderNumber?: string;
  status?: string;
  buyer?: {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
  };
  delivery?: {
    country?: string;
    port?: string;
    terms?: string;
  };
  items?: OrderItem[];
  totals?: {
    grandTotal?: number;
    totalQuantity?: number;
  };
  paymentMethod?: string;
  account?: {
    name?: string;
    email?: string;
  };
  createdAt?: Date;
};

export const metadata: Metadata = {
  title: "Orders",
  description: "View Lotus Impex checkout orders saved in MongoDB.",
  alternates: {
    canonical: "/orders",
  },
};

async function getOrders() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "lotus_impex");
    const orders = await db
      .collection<OrderView>("orders")
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return orders;
  } catch (error) {
    console.error("Orders page error:", error);
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

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <main className="min-h-screen bg-[#f4efe7] px-5 py-12 text-black sm:px-8 lg:px-10">
      <section className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#b58a52]">
              MongoDB Orders
            </p>
            <h1 className="text-6xl leading-[0.86] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              All Orders
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-black/60">
              Checkout requests saved from the website are listed here.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex w-fit rounded-full bg-black px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
          >
            Add New Order
          </Link>
        </div>

        {orders.length ? (
          <div className="grid gap-5">
            {orders.map((order) => (
              <article
                key={order.orderNumber}
                className="rounded-[8px] border border-black/10 bg-white p-6 shadow-sm"
              >
                <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-3xl font-black tracking-[-0.04em]">
                        {order.orderNumber || "Order"}
                      </h2>
                      <span className="rounded-full bg-[#f4efe7] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#b58a52]">
                        {order.status || "new"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-bold text-black/45">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="rounded-[8px] bg-black px-5 py-4 text-right text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">
                      Estimate
                    </p>
                    <p className="mt-1 text-2xl font-black">
                      ${Number(order.totals?.grandTotal || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 border-y border-black/10 py-5 md:grid-cols-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/35">
                      Buyer
                    </p>
                    <p className="mt-2 font-black">
                      {order.buyer?.name || "No name"}
                    </p>
                    <p className="mt-1 text-sm font-bold text-black/55">
                      {order.buyer?.email}
                    </p>
                    <p className="mt-1 text-sm font-bold text-black/55">
                      {order.buyer?.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/35">
                      Login User
                    </p>
                    <p className="mt-2 font-black">
                      {order.account?.name || order.buyer?.name || "No user"}
                    </p>
                    <p className="mt-1 text-sm font-bold text-black/55">
                      {order.account?.email || order.buyer?.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/35">
                      Delivery
                    </p>
                    <p className="mt-2 font-black">
                      {order.delivery?.country || "No country"}
                    </p>
                    <p className="mt-1 text-sm font-bold text-black/55">
                      {order.delivery?.port || "Port not added"} /{" "}
                      {order.delivery?.terms || "FOB"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/35">
                      Payment
                    </p>
                    <p className="mt-2 font-black uppercase">
                      {order.paymentMethod || "bank"}
                    </p>
                    <p className="mt-1 text-sm font-bold text-black/55">
                      Total quantity {order.totals?.totalQuantity || 0}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {(order.items || []).map((item, index) => (
                    <div
                      key={`${order.orderNumber}-${item.name}-${index}`}
                      className="rounded-[8px] bg-[#f4efe7] p-4"
                    >
                      <p className="font-black">{item.name || "Product"}</p>
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/45">
                        Qty {item.quantity || 1} / MOQ {item.minOrder || "-"}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[8px] border border-black/10 bg-white p-10 text-center shadow-sm">
            <h2 className="text-4xl tracking-[-0.04em]">No Orders Found</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-black/55">
              Add products to cart and place checkout order. Saved orders will
              appear here from MongoDB.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
