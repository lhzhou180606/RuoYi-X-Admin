/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_NAME: string;
  readonly VITE_API_HOST: string;
  readonly VITE_TOKEN_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
