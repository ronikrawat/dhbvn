function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');
  }
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/+$/, '');
  }
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, '');
  }
  return 'https://dhbvn.powercutstatus.in';
}

export const SITE_URL = getSiteUrl();

export const DHBVN_CONFIG = {
  FORM_ID:     "TYDUFR2Pc592nssOkzMrLQ==",
  LOGIN:       "IG7gR27IJYSa+a/dym3wpw==",
  SOURCE_TYPE: "tzoukK4N1FBlaVGohFL/oQ==",
  VERSION:     "1",
  TOKEN:       "Wwzpa2LygAJqAK1uM94i8A==",
  ROLE_ID:     "KnSKi2BRa296VND7xI1XWQ==",
} as const;
