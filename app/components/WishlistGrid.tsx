'use client';

import { WishlistItem } from '../../lib/sheets';
import WishlistCard from './WishlistCard';

interface WishlistGridProps {
  items: WishlistItem[];
}

export default function WishlistGrid({ items }: WishlistGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Aucun article dans la liste pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <WishlistCard key={item.id} item={item} />
      ))}
    </div>
  );
}