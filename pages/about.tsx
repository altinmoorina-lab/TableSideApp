export default function About() {
  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-4 py-12">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-tech">About</p>
        <h1 className="mt-2 text-4xl font-black text-ink">A complete client-side web development project</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Project goal</h2>
          <p className="mt-3 text-slate-600">
            TechHub Marketplace demonstrates a real product catalog workflow: visitors browse products, authenticated users
            save favorites and edit their profile, and admins create, update, and delete catalog records.
          </p>
        </article>
        <article className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Group roles</h2>
          <p className="mt-3 text-slate-600">
            Altin Morina: frontend UI, authentication flow, product CRUD, testing, and documentation.
          </p>
        </article>
      </div>
    </section>
  );
}
