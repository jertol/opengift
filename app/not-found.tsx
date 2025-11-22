import Link from 'next/link';
import { Gift, Home } from 'lucide-react';
import { t } from '../lib/translations';

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-cream-50 border border-cream-200 rounded-xl shadow-lg p-8 text-center">
        <div className="bg-cream-200 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Gift className="h-10 w-10 text-primary-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('giftNotFound')}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {t('giftNotFoundDescription')}
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          <Home className="h-5 w-5" />
          {t('backToWishlist')}
        </Link>
      </div>
    </main>
  );
}