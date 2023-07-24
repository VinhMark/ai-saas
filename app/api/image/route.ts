import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
// import { Configuration, OpenAIApi } from 'openai';

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { resolution, amount } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check limit use free trial
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    if (!isPro && !freeTrial) {
      return new NextResponse('Free trial has expired', { status: 403 });
    }

    const [w, h] = resolution.split('x');
    let images: { url: string }[] = [];

    for (let i = 0; i < +amount; i++) {
      images.push({
        url: `https://picsum.photos/${w}/${h}?random=${Math.floor(Math.random() * 10)}`,
      });
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(images);
      }, 2000);
    });

    // if (!configuration.apiKey) {
    //   return new NextResponse('OpenAi API Key not configured', { status: 500 });
    // }

    // if (!messages) {
    //   return new NextResponse('Messages are required', { status: 400 });
    // }

    // const freeTrial = await checkApiLimit();
    // if (!freeTrial) {
    //   return new NextResponse('Free trial has expired', { status: 403 });
    // }

    // const response = await openai.createChatCompletion({
    //   model: 'gpt-3.5-turbo',
    //   messages,
    // });

    // return NextResponse.json(response.data.choices[0].message);
    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(images);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
