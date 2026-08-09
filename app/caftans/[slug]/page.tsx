import caftans from '../../../data/caftans.json';
import Image from 'next/image';
import OrderForm from '../../components/OrderForm';

export async function generateStaticParams() {
  return caftans.map((c) => ({ slug: c.slug }));
}

export default async function ProductPage({ params }: { params: any }) {
  const p = await params;
  const slug = p.slug as string;
  const item = caftans.find((c) => c.slug === slug);
  const idx = caftans.findIndex((c) => c.slug === slug) + 1;
  if (!item) return <div className="p-8">Produit introuvable</div>;

  const mailtoHref = `mailto:orders@maisoncaftan.example?subject=Commande%20-${encodeURIComponent(
    item.name
  )}&body=${encodeURIComponent(
    `Bonjour,%0A%0AJe souhaite commander le modèle ${item.name} (slug: ${item.slug}).%0A%0ANom:%0AAdresse:%0ATéléphone:%0AEmail:%0A%0ACommentaires:%0A%0APrix: ${item.price}€`
  )}`;

  return (
    <div className="min-h-screen px-6 py-12">
      <main className="max-w-4xl mx-auto card-morocco p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 relative h-80 rounded overflow-hidden bg-[var(--muted-beige)] flex items-center justify-center">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-black/40">Photo indisponible</div>
            )}
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold accent">{item.name} <span className="text-sm muted ml-2">New Collection</span>
              <span className="ml-3 text-sm muted">#{idx}</span>
            </h2>
            <p className="font-medium">Prix: {item.price} €</p>
            <p className="text-sm muted">{item.handmade ? 'Fait main' : 'Production machine'}</p>
            <div className="mt-4">
              <h3 className="font-semibold">Détails de fabrication</h3>
              <p className="muted text-sm">{item.details}</p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">Passer commande</h3>
              <p className="muted text-sm mb-3">Cliquez sur commander pour accéder au formulaire de commande.</p>
              <a href={`/order/${item.slug}`} className="inline-block px-4 py-2 bg-beige text-black rounded">Commander</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
