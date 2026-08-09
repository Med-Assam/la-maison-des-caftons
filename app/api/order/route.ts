import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, address, phone, email, message, model, modelName, price } = body;

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const ORDERS_TO_EMAIL = process.env.ORDERS_TO_EMAIL;

    if (!SENDGRID_API_KEY || !ORDERS_TO_EMAIL) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    const subject = `Nouvelle commande: ${modelName} — ${name}`;
    const html = `
      <h2>Nouvelle commande</h2>
      <p><strong>Modèle:</strong> ${modelName} (${model})</p>
      <p><strong>Prix:</strong> ${price}€</p>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Adresse:</strong> ${address}</p>
      <p><strong>Téléphone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: ORDERS_TO_EMAIL }] }],
        from: { email: ORDERS_TO_EMAIL },
        subject,
        content: [{ type: 'text/html', value: html }],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}
