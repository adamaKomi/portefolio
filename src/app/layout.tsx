import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/shared/lib/theme-provider";
import { env } from "@/config/env";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = env.websiteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adama Komi — Ingénieur logiciel",
    template: "%s — Adama Komi",
  },
  description:
    "Ingénieur logiciel basé à Mohammedia. Je conçois et développe des applications web, mobiles et backend.",
  keywords: [
    "Adama Komi",
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js",
    "Spring Boot",
    "NestJS",
    "React Native",
    "TypeScript",
    "Clean Architecture",
    "DDD",
    "Microservices",
    "Systèmes distribués",
    "Temps réel",
    "WebSockets",
  ],
  authors: [{ name: "Adama Komi" }],
  creator: "Adama Komi",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Adama Komi — Ingénieur logiciel",
    description:
      "Ingénieur logiciel basé à Mohammedia. Applications web, mobiles et backend.",
    url: siteUrl,
    siteName: "Adama Komi",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Adama Komi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adama Komi — Ingénieur logiciel",
    description:
      "Ingénieur logiciel basé à Mohammedia. Applications web, mobiles et backend.",
    images: [`${siteUrl}/opengraph-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#141d31" },
    { media: "(prefers-color-scheme: light)", color: "#f4efe5" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adama Komi",
  jobTitle: "Ingénieur logiciel — Full-stack & mobile",
  url: siteUrl,
  knowsAbout: [
    "Software Architecture",
    "Distributed Systems",
    "Clean Architecture",
    "Domain-Driven Design",
    "Microservices",
    "Next.js",
    "Spring Boot",
    "NestJS",
    "React Native",
    "TypeScript",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Faculté des Sciences et Techniques de Mohammédia (FSTM)",
    parentOrganization: "Université Hassan II de Casablanca",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster position="bottom-right" />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
