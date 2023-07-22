'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { MAX_FREE_COUNTS } from '@/constant';
import { Progress } from './ui/Progress';
import { Button } from './ui/Button';
import { Zap } from 'lucide-react';
import { useProModal } from '@/hooks/use-pro-modal';

const FreeCounter = ({ apiLimitCount }: { apiLimitCount: number }) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='px-3'>
      <Card className='bg-white/10 border-0'>
        <CardContent className='py-6'>
          <div className='text-center text-sm text-white mb-4 space-y-4'>
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generation
            </p>
            <Progress className='h-3' value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
            <Button onClick={proModal.onOpen} className='w-full' variant={'premium'}>
              Upgrade
              <Zap className='w-4 h-4 ml-2 fill-white' />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;