import React from 'react';
import '@/app/globals.css'; 
import layoutStyles from '@/app/layout.module.css'; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className={layoutStyles.backgroundContainer}>
          <header className={layoutStyles.appHeader}>
            <img src="/logo.png" alt="Rick & Morty Logo" className={layoutStyles.logo} />
          </header>
          <main className={layoutStyles.mainContent}>
            {children} 
          </main>
        </div>
      </body>
    </html>
  );
}