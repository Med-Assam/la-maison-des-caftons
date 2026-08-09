import caftans from '../../../data/caftans.json';
import OrderForm from '../../../components/OrderForm';

export async function generateStaticParams() {
  return caftans.map((c) => ({ slug: c.slug }));
}

export default async function OrderPage({ params }: { params: any }) {
  const p = await params;
  const slug = p.slug as string;
  const item = caftans.find((c) => c.slug === slug);
  if (!item) return <div className="p-8">Produit introuvable</div>;

  return (
    <div className="min-h-screen px-6 py-12">
      <main className="max-w-4xl mx-auto card-morocco p-8">
        <h2 className="text-2xl font-semibold mb-4">Commander — {item.name}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="w-full h-80 rounded overflow-hidden bg-[var(--muted-beige)] flex items-center justify-center mb-4">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-black/40">Photo indisponible</div>
              )}
            </div>
            <div className="font-medium">Prix: {item.price} €</div>
            <div className="muted text-sm">{item.handmade ? 'Fait main' : 'Production machine'}</div>
          </div>
          <div>
            <OrderForm item={item} />
          </div>
        </div>
      </main>
    </div>
  );
}
