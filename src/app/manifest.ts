import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Xether AI Documentation",
    short_name: "Xether Docs",
    description: "Comprehensive developer documentation for Xether AI platform",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#78fcd6",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
