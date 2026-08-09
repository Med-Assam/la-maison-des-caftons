import CaftanCard from "./components/CaftanCard";
import caftans from "../data/caftans.json";

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-12">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-semibold accent">La maison des caftons</h1>
          <nav>
            <a href="/admin" className="muted mr-4">Admin</a>
            <a href="/" className="muted">Collection</a>
          </nav>
        </div>
        <div className="card-morocco p-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">New Collection</h2>
            <p className="muted">Pièces sélectionnées — qualité artisanale.</p>
          </div>
          <div className="text-sm muted">Élégant · Minimaliste · Fait main</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {caftans.map((c, i) => (
            <CaftanCard key={c.slug} item={c} index={i + 1} />
          ))}
        </section>
      </main>
    </div>
  );
}
