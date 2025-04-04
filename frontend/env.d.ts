// env.d.ts
declare namespace NodeJS {
    export interface ProcessEnv {
      EMAIL_USER: string;
      EMAIL_PASS: string;
      NEXT_PUBLIC_BASE_URL: string;
    }
  }
  