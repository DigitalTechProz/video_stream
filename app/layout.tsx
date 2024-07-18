import React from 'react';
import FooterWrapper from './components/FooterWrapper';
import './globals.css'; // Import the global CSS file

export const metadata = {
  title: 'BuzzSA Stream',
  description: 'Stream your favourite Buzz SA Videos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
