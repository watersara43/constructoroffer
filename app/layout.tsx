import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Constructor de Ofertas A Fondo — Sara Castro",
  description:
    "Construye la presentación de tu oferta en 3 pilares, conectados con los problemas reales de tu cliente, sin memorizar guiones.",
  openGraph: {
    title: "Constructor de Ofertas A Fondo",
    description:
      "Herramienta gratuita para closers y emprendedores. Construye tu presentación de oferta en minutos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
