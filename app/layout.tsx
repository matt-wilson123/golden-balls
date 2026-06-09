import type { Metadata } from 'next';
import './globals.css';
import './styles.css';

export const metadata: Metadata = {
  title: 'Golden Balls — World Cup Daily',
  description: 'Daily World Cup puzzles. Name the player, guess the stat. 1998–2026. Are you Golden Balls?',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
