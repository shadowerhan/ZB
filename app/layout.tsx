import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";

export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"), title: { default: "ZERBER HOBİ MARKET | Hobi & El Sanatları", template: "%s | ZERBER HOBİ MARKET" }, description: "El işi, boyama, örgü ve yaratıcı projeler için renkli hobi malzemeleri.", openGraph: { type: "website", locale: "tr_TR", siteName: "ZERBER HOBİ MARKET" }, robots: { index: true, follow: true } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body><a className="skip" href="#icerik">İçeriğe geç</a><Header />{children}<Footer /><CookieConsent /></body></html>;
}
