'use client';

import * as z from 'zod';
import Heading from '@/components/Heading';
import { Download, ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { amountOption, formSchema, resolutionOptions } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Card, CardFooter } from '@/components/ui/Card';
import Image from 'next/image';
import axios from 'axios';
import { useProModal } from '@/hooks/use-pro-modal';
import toast from 'react-hot-toast'

const ImagePage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);

      const response = await axios.post(`/api/image`, values);

      console.log(response);
      const urls = response.data.map((image: { url: string }) => image.url);
      setImages(urls);
      form.reset({
        prompt: '',
        amount: '1',
        resolution: '512x512',
      });
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title='Image Generation'
        description='Turn your prompt into an image.'
        icon={ImageIcon}
        iconColor='text-pink-500'
        bgColor='bg-pink-500/10'
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
                <FormItem className='col-span-12 lg:col-span-6'>
                  <FormControl className='m-0 p-0'>
                    <Input
                      className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                      disabled={isLoading}
                      placeholder='A picture of a horse in Swissalps'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name='amount'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-2'>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOption.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              name='resolution'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-2'>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              <div className='p-20'>
                <Loader />
              </div>
            )}
            {!isLoading && images.length === 0 && <Empty label='No images generate.' />}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
              {images.map((src) => (
                <Card key={src} className='rounded-lg overflow-hidden'>
                  <div className='relative aspect-square'>
                    <Image alt='Image' fill src={src} className='object-cover' />
                  </div>
                  <CardFooter className='p-2'>
                    <Button
                      onClick={() => window.open(src)}
                      variant={'secondary'}
                      className='w-full'
                    >
                      <Download className='h-4 w-4 mr-2' />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
