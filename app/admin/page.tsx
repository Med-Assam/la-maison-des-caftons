"use client";
import React, { useEffect, useState } from "react";

const ADMIN_PASSWORD = "mon-secret";
const STORAGE_KEY = "caftans_admin";

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setItems(JSON.parse(stored));
    else {
      fetch('/api/caftans').then(r=>r.json()).then((data)=>{
        setItems(data);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setAuthorized(true);
    else alert('Mot de passe invalide');
  }

  function startNew() { setEditing({ slug: '', name: '', price: 0, image: '', description: '', handmade: false, details: '' }); }

  function saveItem(item:any) {
    setItems((prev)=>{
      const idx = prev.findIndex(p=>p.slug===item.slug);
      if(idx>=0){
        const next = [...prev]; next[idx]=item; return next;
      }
      return [...prev, item];
    });
    setEditing(null);
  }

  function deleteItem(slug:string){
    if(!confirm('Supprimer ce modèle ?')) return;
    setItems(prev=>prev.filter(p=>p.slug!==slug));
  }

  function exportJson(){
    const data = JSON.stringify(items, null, 2);
    const blob = new Blob([data], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'caftans.json'; a.click();
    URL.revokeObjectURL(url);
  }

  function importJson(e:any){
    const file = e.target.files?.[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      try{
        const parsed = JSON.parse(String(reader.result));
        setItems(parsed);
      }catch(err){ alert('Fichier JSON invalide'); }
    };
    reader.readAsText(file);
  }

  if(!authorized) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={login} className="card-morocco p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Admin — Connexion</h2>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mot de passe" className="w-full p-2 mb-4 rounded bg-black/20" />
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-beige rounded text-black">Se connecter</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      <main className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Interface d'administration</h2>
          <div className="flex gap-2">
            <button onClick={startNew} className="px-3 py-1 bg-beige text-black rounded">Nouveau</button>
            <button onClick={exportJson} className="px-3 py-1 border rounded">Exporter</button>
            <label className="px-3 py-1 border rounded cursor-pointer">Importer<input type="file" onChange={importJson} className="hidden" accept="application/json"/></label>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(it=> (
            <div key={it.slug} className="card-morocco p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{it.name}</div>
                  <div className="muted text-sm">{it.slug} — {it.price}€</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>setEditing(it)} className="px-2 py-1 border rounded">Modifier</button>
                  <button onClick={()=>deleteItem(it.slug)} className="px-2 py-1 border rounded">Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {editing && (
          <div className="card-morocco p-4 mt-6">
            <h3 className="font-semibold mb-2">{editing.slug ? 'Modifier' : 'Nouveau'}</h3>
            <div className="grid grid-cols-1 gap-2">
              <input value={editing.slug} onChange={e=>setEditing({...editing, slug:e.target.value})} placeholder="slug" className="p-2 bg-black/10 rounded" />
              <input value={editing.name} onChange={e=>setEditing({...editing, name:e.target.value})} placeholder="Nom" className="p-2 bg-black/10 rounded" />
              <input type="number" value={editing.price} onChange={e=>setEditing({...editing, price: Number(e.target.value)})} placeholder="Prix" className="p-2 bg-black/10 rounded" />
              <label className="text-sm">Image (upload)</label>
              <input type="file" accept="image/*" onChange={(e:any)=>{
                const file = e.target.files?.[0];
                if(!file) return;
                const reader = new FileReader();
                reader.onload = ()=>{
                  setEditing((prev:any)=>({...prev, image: String(reader.result)}));
                };
                reader.readAsDataURL(file);
              }} className="p-2 bg-black/10 rounded" />
              {editing.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={editing.image} alt="preview" className="w-full h-48 object-cover rounded" />
              )}
              <textarea value={editing.details} onChange={e=>setEditing({...editing, details:e.target.value})} placeholder="Détails" className="p-2 bg-black/10 rounded" />
              <label className="flex items-center gap-2"><input type="checkbox" checked={editing.handmade} onChange={e=>setEditing({...editing, handmade: e.target.checked})} /> Fait main</label>
              <div className="flex gap-2 mt-2">
                <button onClick={()=>saveItem(editing)} className="px-3 py-1 bg-beige text-black rounded">Enregistrer</button>
                <button onClick={()=>setEditing(null)} className="px-3 py-1 border rounded">Annuler</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
