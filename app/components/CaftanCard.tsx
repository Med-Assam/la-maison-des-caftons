"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function CaftanCard({ item, index }: { item: any; index?: number }) {
  const placeholder = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%23d8cfc3"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23000000" font-size="20">Photo indisponible</text></svg>';

  return (
    <Link href={`/caftans/${item.slug}`} className="card-morocco p-4 flex flex-col gap-4 no-underline relative">
      <div className="absolute -top-3 left-4 bg-beige text-black rounded-full w-8 h-8 flex items-center justify-center font-semibold z-10">{index ?? ''}</div>
      <div className="w-full h-48 rounded-md overflow-hidden bg-[var(--muted-beige)] flex items-center justify-center">
        {item.image ? (
          // use img so data URLs work reliably
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
        ) : (
          // placeholder SVG data URL
          // eslint-disable-next-line @next/next/no-img-element
          <img src={placeholder} alt="placeholder" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-beige">{item.name}</h3>
          <span className="text-xs muted">New Collection</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-medium">{item.price} €</span>
          <span className="text-xs muted">{item.handmade ? 'Fait main' : 'Machine'}</span>
        </div>
      </div>
    </Link>
  );
}
