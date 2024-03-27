import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'generative-genomes',
  description: 'Forecasting viral genomes with generative AI',
  openGraph: {
    title: 'Forecasting viral genomes with generative AI',
    description: 'Forecasting viral genomes with generative AI',
    url: 'https://longcovid-crash-forecast.vercel.app/',
    siteName: 'generative-genomes',
    images: [
      {
        url: 'https://longcovid-crash-forecast.vercel.app/social-image.jpg', // Must be an absolute URL
        width: 640,
        height: 427,
      }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forecasting viral genomes with generative AI',
    description: 'Forecasting viral genomes with generative AI',
    images: [{
      url: 'https://longcovid-crash-forecast.vercel.app/social-image.jpg', // Must be an absolute URL
      width: 640,
      height: 427,
    }]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
