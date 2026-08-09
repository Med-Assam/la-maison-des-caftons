This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## La maison des caftons — Notes de déploiement

- Le site contient une collection de départ située dans `data/caftans.json` (10 modèles).
- Page d'administration disponible sur `/admin` : elle est protégée par un mot de passe simple (local) et sauvegarde les modifications dans `localStorage` du navigateur. Pour persistance côté serveur, intégrer une DB (Supabase, Firebase) ou la GitHub API.
- Le formulaire de commande ouvre le client mail (`mailto:`) pré-rempli. Pour automatiser les commandes, ajoutez une fonction serverless (SMTP, SendGrid, ou intégration API).

Déployer sur Vercel depuis GitHub :

1. Initialiser un dépôt Git :

```bash
git init
git add .
git commit -m "Add caftans collection and admin UI"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Connecter le dépôt à Vercel et déployer (Vercel détecte automatiquement Next.js).

3. Optionnel : pour un admin sécurisé et persistant, configurez une base de données et remplacez la logique d'édition locale par des API routes sécurisées (utiliser `process.env` pour credentials sur Vercel).

Environment variables (for email sending):

- `SENDGRID_API_KEY` — clé API SendGrid.
- `ORDERS_TO_EMAIL` — adresse email qui recevra les commandes (et sera l'expéditeur).

On Vercel: ajoutez ces variables dans la section Environment Variables de votre projet, puis déployez.

