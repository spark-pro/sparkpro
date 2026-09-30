'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Nav from './Nav';
import Footer from './Footer';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Admin pages get no public header/footer
  const isAdmin = pathname?.startsWith('/admin-sparkpro');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cs-bg)' }}>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#050A14' }}>
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
