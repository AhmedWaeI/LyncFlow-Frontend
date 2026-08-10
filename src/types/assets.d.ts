// Lets TypeScript understand `import logo from "./logo.svg"` etc.
// Vite already provides this via its own vite/client types — safe to
// delete if your tsconfig already references "vite/client". Harmless to
// keep otherwise.
declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.jpeg" {
  const src: string;
  export default src;
}
