'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Admin pages get no public header/footer
  const isAdmin = pathname?.startsWith('/admin-sparkpro');

  if (isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cs-bg)' }}>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
