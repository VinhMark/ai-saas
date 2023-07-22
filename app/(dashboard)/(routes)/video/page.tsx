'use client';

import * as z from 'zod';
import Heading from '@/components/Heading';
import { VideoIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { useProModal } from '@/hooks/use-pro-modal';

const VideoPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post(`/api/video`, values);

      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title='Video Generation'
        description='Turn your prompt into video.'
        icon={VideoIcon}
        iconColor='text-orange-500'
        bgColor='bg-orange-500/10'
      />

      <div className='px-4 lg:px-8'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
          >
            <FormField
              name='prompt'
              render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-10'>
                  <FormControl className='m-0 p-0'>
                    <Input
                      className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                      disabled={isLoading}
                      placeholder='Clown fish swimming around a coral reef ?'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>

        <div className='space-y-4 mt-4'>
          <div className='flex flex-col-reverse gap-y-4'>
            {isLoading && (
              <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                <Loader />
              </div>
            )}
            {!isLoading && !video && <Empty label='No video generated.' />}

            {video && (
              <video controls className='w-full mt-8 aspect-video rounded-lg border bg-black'>
                <source src={video} />
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
