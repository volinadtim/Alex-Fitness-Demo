typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const process: {
    env: {
        NODE_ENV: "development" | "production";
        TARGET: "web" | "cordova";
    };
};
