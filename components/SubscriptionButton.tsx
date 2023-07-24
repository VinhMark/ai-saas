'use client';

import { Zap } from 'lucide-react';
import { Button } from './ui/Button';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button variant={isPro ? 'default' : 'premium'} disabled={isLoading} onClick={onClick}>
      {isPro ? 'Manage Subscription' : ' Upgrade'}
      {!isPro && <Zap className='w-4 h-4 ml-2 fill-white' />}
    </Button>
  );
};

export default SubscriptionButton;
