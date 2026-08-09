import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La maison des caftons",
  description: "Collection de caftons - élégant, fait main et moderne",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="w-full border-b border-white/[.04]">
          <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
            <div className="text-lg font-semibold accent">La maison des caftons</div>
            <nav className="flex gap-4 muted">
              <a href="/">Collection</a>
              <a href="/admin">Admin</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="w-full border-t border-white/[.03]">
          <div className="max-w-6xl mx-auto p-4 muted text-sm">© La maison des caftons</div>
        </footer>
      </body>
    </html>
  );
}
