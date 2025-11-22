'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AutoRedirectProps {
  itemId: string;
}

export default function AutoRedirect({ itemId }: AutoRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    // Check if user just returned from payment
    const completedGift = localStorage.getItem('completedGift');
    
    if (completedGift) {
      try {
        const giftData = JSON.parse(completedGift);
        
        // Check if this is the same item and within reasonable time (10 minutes)
        const timeDiff = Date.now() - giftData.timestamp;
        const tenMinutes = 10 * 60 * 1000;
        
        if (giftData.itemId === itemId && timeDiff < tenMinutes) {
          // Clear the stored data
          localStorage.removeItem('completedGift');
          
          // Redirect to success page
          router.push(`/gift/${itemId}/success?name=${encodeURIComponent(giftData.giftedBy)}`);
        }
      } catch (error) {
        console.error('Error parsing completed gift data:', error);
        localStorage.removeItem('completedGift');
      }
    }
  }, [itemId, router]);

  return null;
}