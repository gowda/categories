export const BASE_API_ENDPOINT = (
  (document.querySelector('meta[name="base-api-endpoint"]')! as any).content ||
    'http://localhost:3333'
);
