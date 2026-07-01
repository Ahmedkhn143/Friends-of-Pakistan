import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Friends of Pakistan — Serving Humanity Since 2021",
  description: "Friends of Pakistan is a humanitarian foundation serving Pakistan through housing, clean water, and disaster relief since 2021. 1000+ projects completed.",
  icons: {
    icon: "/logo_dark.png",
    shortcut: "/logo_dark.png",
    apple: "/logo_dark.png",
  },
  openGraph: {
    title: "Friends of Pakistan — Serving Humanity Since 2021",
    description: "Friends of Pakistan is a humanitarian foundation serving Pakistan through housing, clean water, and disaster relief since 2021. 1000+ projects completed.",
    url: "https://friendsofpakistan.org",
    siteName: "Friends of Pakistan",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Friends of Pakistan Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Friends of Pakistan — Serving Humanity Since 2021",
    description: "Friends of Pakistan is a humanitarian foundation serving Pakistan through housing, clean water, and disaster relief since 2021. 1000+ projects completed.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
