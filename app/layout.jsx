import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'Alexander Alvarado · Asesor Chevrolet Nicaragua',
  description:
    'Asesor de ventas Chevrolet en Nicaragua — catálogo completo, financiamiento y entrega coordinada.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      {/*
        suppressHydrationWarning on <body> silences attribute injections
        from browser extensions (e.g. ColorZilla's cz-shortcut-listen).
        Individual <image-slot> instances also need the same flag — the
        custom element mutates its own attributes (data-filled, data-editable)
        post-upgrade, which React would otherwise flag as a mismatch.
      */}
      <body suppressHydrationWarning>
        <Script src="/image-slot.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
