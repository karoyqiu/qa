import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  server: {
    MONGODB_URI: z.string(),
  },
  client: {
    //NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  },
  // // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //   MONGODB_URI: process.env.MONGODB_URI,
  // },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    //NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
});

export default env;
