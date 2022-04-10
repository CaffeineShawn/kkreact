interface ImportMetaEnv {
  readonly VITE_HTTPS_CER_PATH: string
  readonly VITE_HTTPS_KEY_PATH: string
  readonly VITE_UPLOAD_URL: string
  readonly VITE_APOLLO_URL: string
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}
