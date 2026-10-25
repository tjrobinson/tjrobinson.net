import { QuartzConfig } from "./quartz/cfg";
import * as Plugin from "./quartz/plugins";

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "tjrobinson.net",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    // Quartz prepends the scheme itself — this must NOT include https://
    // (with the scheme included, sitemap/RSS/canonical URLs come out as "https://https://...")
    baseUrl: "www.tjrobinson.net/content",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: { name: "Bricolage Grotesque", weights: [600, 700, 800] },
        body: { name: "Geist", weights: [400, 500, 600] },
        code: { name: "Geist Mono", weights: [400, 500] },
      },
      // deep navy "night garden" palette: lime links, violet highlights
      colors: {
        lightMode: {
          light: "#f6f7fb",
          lightgray: "#dfe3f0",
          gray: "#8a91ab",
          darkgray: "#353b52",
          dark: "#0f1324",
          secondary: "#5a3fe0",
          tertiary: "#7c5cff",
          highlight: "rgba(90, 63, 224, 0.07)",
          textHighlight: "#c5f25a88",
        },
        darkMode: {
          light: "#0b0f1e",
          lightgray: "#222a45",
          gray: "#6c7598",
          darkgray: "#c3c9e4",
          dark: "#eef1ff",
          secondary: "#c5f25a",
          tertiary: "#9f8cff",
          highlight: "rgba(197, 242, 90, 0.08)",
          textHighlight: "#9f8cff55",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.StripH1(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
};

export default config;
