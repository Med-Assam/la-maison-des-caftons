"use client";
import React, { useState } from "react";

export default function OrderForm({ item }: { item: any }) {
  const [form, setForm] = useState({ name: "", address: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, model: item.slug, modelName: item.name, price: item.price })
      });
      if (res.ok) {
        setSuccess('Commande envoyée — vous recevrez un email de confirmation.');
        setForm({ name: "", address: "", phone: "", email: "", message: "" });
      } else {
        const txt = await res.text();
        setSuccess('Erreur: ' + txt);
      }
    } catch (err) {
      setSuccess('Erreur réseau');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-2">
      <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Nom complet" className="p-2 rounded bg-black/10" />
      <input required value={form.address} onChange={e=>setForm({...form, address:e.target.value})} placeholder="Adresse" className="p-2 rounded bg-black/10" />
      <input required value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Téléphone" className="p-2 rounded bg-black/10" />
      <input required type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="p-2 rounded bg-black/10" />
      <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} placeholder="Commentaires / taille" className="p-2 rounded bg-black/10" />
      <div className="flex items-center gap-2">
        <button disabled={loading} className="px-3 py-2 bg-beige text-black rounded">{loading ? 'Envoi...' : 'Envoyer la commande'}</button>
        <div className="muted text-sm">Modèle: {item.name} — {item.price}€</div>
      </div>
      {success && <div className="mt-2 text-sm muted">{success}</div>}
    </form>
  );
}
