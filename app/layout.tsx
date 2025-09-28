import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PageTransitionWrapper } from "@/components/page_wrapper";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Drishti",
  description: "Created with v0",
  generator: "v0.app",
  icons: {
    icon: "/images/image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        {/* Google Translate Dropdown Container */}
          <div
  id="google_translate_element"
  className="fixed top-5 right-1 z-50 bg-white rounded-full p-3 text-center flex items-center justify-center"
  style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)' }}
/>

        {children}
        <Analytics />

        {/* Google Translate Init Script */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'hi',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                },
                'google_translate_element'
              );
            }
          `}
        </Script>

        {/* Load Google Translate API */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
