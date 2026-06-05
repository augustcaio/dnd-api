import { defineConfig } from '@prisma/config';

export default defineConfig({
  earlyAccess: true,
  schema: {
    datasource: {
      postgresql: {
        url: process.env.DATABASE_URL!,
      },
    },
  },
});
