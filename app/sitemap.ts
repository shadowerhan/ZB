import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL||"https://example.com";return ["","/urunler","/kurumsal","/hakkimizda","/blog","/iletisim","/kvkk"].map(url=>({url:base+url,lastModified:new Date(),changeFrequency:"weekly"}))}
