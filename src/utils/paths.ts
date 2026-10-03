/** Site base path as configured in astro.config.mjs (e.g. "/profsite"). */
export const BASE_URL = import.meta.env.BASE_URL || "/";

/** Prefix a site-relative path with the base, e.g. "images/logo.png" → "/profsite/images/logo.png". */
export const withBase = (path: string) => `${BASE_URL}/${path}`;
