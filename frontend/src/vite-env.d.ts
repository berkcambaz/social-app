/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URI?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}