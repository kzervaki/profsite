/** Map a `roundedCorners` prop to a CSS border-radius: a string is used as-is, `true` → 0.5rem, `false` → 0. */
export const toBorderRadius = (roundedCorners: boolean | string) =>
  typeof roundedCorners === "string" ? roundedCorners : roundedCorners ? "0.5rem" : "0";
