import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-context";
import { TopBanner } from "@/components/top-banner";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true
});

export const metadata: Metadata = {
  title: "Water Wise Group - Greywater Recycling Systems",
  description: "Leading provider of greywater recycling systems for homes, RVs, tiny homes, and sustainable developments. Save water, lower bills, grow healthier landscapes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} style={{backgroundColor: 'white'}} suppressHydrationWarning>
        <CartProvider>
          <TopBanner />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
        {/* Chatwoot Live Chat Widget */}
        <Script
          id="chatwoot-widget"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,t) {
                var BASE_URL="http://34.53.43.15:3000";
                var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                g.src=BASE_URL+"/packs/js/sdk.js";
                g.defer=true;
                g.async=true;
                s.parentNode.insertBefore(g,s);
                g.onload=function(){
                  window.chatwootSDK.run({
                    websiteToken: 'dbs2VnN4mNJSPpgFxnHGmZrC',
                    baseUrl: BASE_URL
                  })
                }
              })(document,"script");
            `,
          }}
        />
      </body>
    </html>
  );
}