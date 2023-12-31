import { useProModal } from '@/hooks/use-pro-modal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/Dialog';
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  Check,
  Zap,
} from 'lucide-react';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const tools = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    label: 'Video Generation/10',
    icon: VideoIcon,
    href: '/video',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Code Generation',
    icon: Code,
    href: '/code',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
];

const ProModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const proModal = useProModal();
  const onSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = axios.get('/api/stripe');

      window.location.href = (await response).data.url;
    } catch (error: any) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className='f
          flex justify-center items-center flex-col gap-y-4 pb-2'
          >
            <div className='flex items-center gap-x-2'>
              Upgrade to Genius
              <Badge variant={'premium'} className='uppercase text-sm py-1'>
                Pro
              </Badge>
            </div>
          </DialogTitle>

          <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
            {tools.map((tool) => (
              <Card
                className='p-3 border-black/5 flex items-center justify-between'
                key={tool.label}
              >
                <div className='flex items-center gap-x-4'>
                  <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                    <tool.icon className={cn('w-6 h-6', tool.color)} />
                  </div>
                  <div className='font-semibold text-sm'>{tool.label}</div>
                </div>
                <Check className='text-primary w-5 h-5' />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        {/* Footer */}
        <DialogFooter>
          <Button
            size={'lg'}
            variant={'premium'}
            className='w-full mt-5'
            onClick={onSubscribe}
            disabled={isLoading}
          >
            Upgrade
            <Zap className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
