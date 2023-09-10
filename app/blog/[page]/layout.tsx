import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="relative w-full">{children}</div>
      <Footer />
    </Suspense>
  );
}
