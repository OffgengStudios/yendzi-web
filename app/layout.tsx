import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { AppShell } from "../components/layout/AppShell";

// One superfamily for every role. Display, body and data are separated by
// width and weight rather than by pairing two faces — the discipline of
// painted market signage, where one hand letters the whole board.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Yendzi — Farm-to-Doorstep Ghana",
  description:
    "Fresh produce, eco products, and local goodness — delivered from Ghana's farms to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="font-body min-h-screen flex flex-col bg-cream text-charcoal">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
