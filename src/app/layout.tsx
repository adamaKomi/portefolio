import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/shared/lib/theme-provider";
import { env } from "@/config/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = env.websiteUrl || "https://your-domain.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adama Komi — Software Engineer & Full-Stack Developer",
    template: "%s — Adama Komi",
  },
  description:
    "Software Engineer spécialisé en architecture logicielle, systèmes distribués et applications temps réel. Je conçois et déploie des produits web, mobiles et backend complets — de l'analyse métier à la production.",
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
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Adama Komi — Software Engineer & Full-Stack Developer",
    description:
      "Ingénieur logiciel full-stack. Architecture, systèmes distribués, applications temps réel. De l'analyse métier au déploiement production.",
    url: siteUrl,
    siteName: "Adama Komi",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adama Komi — Software Engineer & Full-Stack Developer",
    description:
      "Ingénieur logiciel full-stack. Architecture, systèmes distribués, applications temps réel.",
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
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0d" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adama Komi",
  jobTitle: "Software Engineer & Full-Stack Developer",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster
            position="bottom-right"
            theme="dark"
            className="toaster group"
            toastOptions={{
              classNames: {
                toast:
                  "group toast group-[.toaster]:bg-card group-[.toaster]:text-card-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
              },
            }}
          />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
