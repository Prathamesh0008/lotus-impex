export default function Loading() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#f4efe7] px-5 text-center text-black">
      <section>
        <div className="mx-auto grid size-20 place-items-center rounded-full border border-black/10 bg-black text-white">
          <span className="font-display text-4xl">LI</span>
        </div>

        <p className="mt-6 text-xs font-black uppercase tracking-[0.3em] text-black/45">
          Loading Lotus Impex
        </p>

        <h1 className="mt-4 text-6xl uppercase leading-[0.86] sm:text-7xl">
          Preparing Export View
        </h1>
      </section>
    </main>
  );
}