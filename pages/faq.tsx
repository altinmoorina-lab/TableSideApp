const faqs = [
  ['Can I add my own product images?', 'Yes. Use the Image URL field in the admin panel. Empty images use a clean branded placeholder.'],
  ['Which accounts can access admin?', 'The demo admin account is admin@techhub.com with password admin123.'],
  ['Where are favorites saved?', 'Favorites are saved in browser state for the demo and also have an API route/model prepared for database persistence.'],
];

export default function FAQ() {
  return (
    <section className="mx-auto grid max-w-4xl gap-6 px-4 py-12">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-tech">FAQ</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Frequently asked questions</h1>
      </div>
      {faqs.map(([question, answer]) => (
        <article key={question} className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">{question}</h2>
          <p className="mt-2 text-slate-600">{answer}</p>
        </article>
      ))}
    </section>
  );
}
