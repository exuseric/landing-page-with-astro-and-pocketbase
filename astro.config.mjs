import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import purgecss from "astro-purgecss";
import webmanifest from "astro-webmanifest";
import sitemap from "@astrojs/sitemap";
// https://astro.build/config
export default defineConfig({
  output: "static",
  outDir: "build",
  site: "https://example.com",
  build: {
    assets: 'assets'
  },
  // image: {
  //   domains: ["127.0.0.1"]
  // },
  compressHTML: false,
  integrations: [icon(), sitemap({
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date(),
  }), webmanifest({
    config: {
      outfile: 'manifest'
    },
    icon: "src/assets/logo.svg",
    name: "Astro",
    short_name: "Astro",
    description: "Astro",
    dir: "auto",
    lang: "en-US",
    display: "standalone",
    orientation: "portrait",
    start_url: "/",
    background_color: "#fff",
    theme_color: "#fff"
  }), purgecss({
    fontFace: true,
    keyframes: true,
    safelist: ['random', 'yep', 'button', /^nav-/],
    blocklist: ['usedClass', /^nav-/],
    content: [process.cwd() + '/src/**/*.{astro,vue}' // Watching astro and vue sources (for SSR, read the note below)
    ],
    extractors: [{
      // Example using a taiwindcss compatible class extractor
      extractor: content => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
      extensions: ['astro', 'html']
    }]
  })]
});
