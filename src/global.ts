import "@/styles/tailwind.css";

declare module "bun" {
  interface Env {
    VITE_OWA_API_KEY: string;
  }
}
