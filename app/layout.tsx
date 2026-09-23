import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinanceAI Pro V2.0",
  description: "Platform de finanzas personales con IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
