import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-context";
import { TopBanner } from "@/components/top-banner";

// Primary body font - clean, modern, excellent readability
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

// Display font - clean, geometric sans-serif for headlines
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Water Wise Group - Greywater Recycling Systems",
  description: "Leading provider of greywater recycling systems for homes, RVs, tiny homes, and sustainable developments. Save water, lower bills, grow healthier landscapes.",
  icons: {
    icon: '/waterwise-logo-icon.png',
    shortcut: '/waterwise-logo-icon.png',
    apple: '/waterwise-logo-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${plusJakarta.variable} font-sans antialiased`} style={{backgroundColor: 'white'}} suppressHydrationWarning>
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
              window.chatwootSettings = {
                position: 'right',
                type: 'standard',
                launcherTitle: 'Chat with us'
              };
              (function(d,t) {
                var BASE_URL="https://34-53-43-15.nip.io";
                var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                g.src=BASE_URL+"/packs/js/sdk.js";
                g.defer=true;
                g.async=true;
                s.parentNode.insertBefore(g,s);
                g.onload=function(){
                  window.chatwootSDK.run({
                    websiteToken: 'dbs2VnN4mNJSPpgFxmHGmZrC',
                    baseUrl: BASE_URL
                  });
                  // Apply custom color to match site theme (ocean-600)
                  var style = document.createElement('style');
                  style.textContent = '.woot-widget-bubble { background-color: #267d7d !important; } .woot-widget-bubble:hover { background-color: #1f6666 !important; }';
                  document.head.appendChild(style);
                }
              })(document,"script");
            `,
          }}
        />
      </body>
    </html>
  );
}