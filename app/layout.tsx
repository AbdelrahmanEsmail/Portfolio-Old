import type { Metadata, Viewport } from 'next';
import {
  Bricolage_Grotesque,
  Geist,
  Instrument_Serif,
  JetBrains_Mono,
  Reem_Kufi,
} from 'next/font/google';
import './globals.css';

// Body copy.
const sans = Geist({
  variable: '--nf-sans',
  subsets: ['latin'],
  display: 'swap',
});

// Display headlines — variable optical size gives the big type its ink-trap character.
const display = Bricolage_Grotesque({
  variable: '--nf-display',
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
});

// Italic accent words inside headlines.
const serif = Instrument_Serif({
  variable: '--nf-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

// Technical labels, code, numbers.
const mono = JetBrains_Mono({
  variable: '--nf-mono',
  subsets: ['latin'],
  display: 'swap',
});

// Arabic signature + Arabic project names. Only downloaded when Arabic glyphs render.
const arabic = Reem_Kufi({
  variable: '--nf-arabic',
  subsets: ['arabic'],
  display: 'swap',
  preload: false,
});

const defaultSiteUrl = 'https://zeyad-salama-portfolio.afnaai-5664.chatgpt.site';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const pageUrl = `${basePath}/`;
const publicAsset = (path: string) => `${basePath}${path}`;

const title = 'Zeyad Salama — Backend Software Engineer';
const description =
  'Zeyad Salama builds secure, transaction-heavy products with Python, Django, and PostgreSQL — multi-tenant SaaS, ERP and financial systems, and real-time APIs.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: pageUrl },
  icons: {
    icon: [
      { url: publicAsset('/favicon.svg'), type: 'image/svg+xml' },
      { url: publicAsset('/assets/code.png'), type: 'image/png' },
    ],
  },
  openGraph: {
    title,
    description: 'Backend depth. Frontend polish. Selected software engineering work by Zeyad Salama.',
    url: pageUrl,
    siteName: 'Zeyad Salama — Portfolio',
    type: 'website',
    images: [
      {
        url: publicAsset('/og.png'),
        width: 1200,
        height: 630,
        alt: 'Zeyad Salama — Backend depth. Frontend polish.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: 'Backend depth. Frontend polish. Selected software engineering work by Zeyad Salama.',
    images: [publicAsset('/og.png')],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b0c0a' },
    { media: '(prefers-color-scheme: light)', color: '#f1eee6' },
  ],
};

// Runs before first paint: applies the saved theme (dark by default) and marks
// the document as JS-enabled so reveal animations can start hidden without a flash.
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('portfolio-theme');d.dataset.theme=t==='light'?'light':'dark';}catch(e){d.dataset.theme='dark';}d.classList.add('js');})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${serif.variable} ${mono.variable} ${arabic.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
