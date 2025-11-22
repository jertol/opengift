import Link from 'next/link';
import { t } from '../../../../lib/translations';
import { Home } from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    name?: string;
  };
}

export default function SuccessPage({ params, searchParams }: PageProps) {
  const giftedBy = searchParams.name || 'Anonymous';

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-8 flex items-center justify-center">
          <span className="text-green-600 text-5xl">🎉</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('thankYou')}, {giftedBy}!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          {t('giftSuccessfullyConfirmed')}
        </p>
        
        <div className="bg-cream-50 border border-cream-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('whatHappensNextSuccess')}</h3>
          <ul className="text-gray-700 space-y-1">
            <li>• {t('recipientsHaveBeenNotified')}</li>
            <li>• {t('itemNowMarkedAsGifted')}</li>
            <li>• {t('receiveConfirmation')}</li>
          </ul>
        </div>
        
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <Home className="h-5 w-5" />
            {t('backToWishlist')}
          </Link>
        </div>
      </div>
    </main>
  );
}