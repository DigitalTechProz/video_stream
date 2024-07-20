import React from 'react';
import FooterWrapper from './components/FooterWrapper';
import './globals.css'; // Import the global CSS file
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';

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
        <SupabaseProvider>
          <ToasterProvider />
          <UserProvider>
            <ModalProvider />
            {children}
            <FooterWrapper />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
