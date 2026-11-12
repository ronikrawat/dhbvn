function getSiteUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
  return (envUrl || "https://dhbvn.vercel.app").replace(/\/+$/, '');
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
