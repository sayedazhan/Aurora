import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aurora - Money, together',
  description: 'AI-powered financial operating system for modern Australians.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
