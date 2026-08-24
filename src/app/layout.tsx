import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_KR } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { site } from "@/lib/site";

import "./globals.css";

const plexKr = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex-kr",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.shortTitle}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.author }],
  openGraph: {
    type: "profile",
    locale: site.locale,
    title: site.title,
    description: site.description,
    siteName: site.shortTitle,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2ee" },
    { media: "(prefers-color-scheme: dark)", color: "#101211" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${plexKr.variable} ${plexMono.variable} antialiased`}>
        {/* JS 가 없으면 스크롤 리빌이 동작하지 않으므로 콘텐츠를 바로 보여줍니다 */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; }`}</style>
        </noscript>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-invert-bg focus:px-4 focus:py-2 focus:text-invert-fg"
          >
            본문으로 건너뛰기
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
