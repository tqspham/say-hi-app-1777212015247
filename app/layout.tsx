import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Greeting App',
  description: 'A simple greeting application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}