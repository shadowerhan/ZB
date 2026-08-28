export const categories = [
  { name: "Boyama & Tuval", slug: "boyama-tuval", count: 126, icon: "✦", text: "Akrilik boyalar, fırçalar ve ilham veren tuvaller" },
  { name: "Örgü & Makrome", slug: "orgu-makrome", count: 248, icon: "❀", text: "Renkli ipler, şişler ve makrome aksesuarları" },
  { name: "Takı Tasarımı", slug: "taki-tasarimi", count: 74, icon: "◇", text: "Boncuk, aparat ve özgün tasarım malzemeleri" },
  { name: "Kağıt Sanatları", slug: "kagit-sanatlari", count: 92, icon: "♡", text: "Scrapbook, origami ve dekoratif kâğıt seçenekleri" },
  { name: "Çocuk Atölyesi", slug: "cocuk-atolyesi", count: 63, icon: "☻", text: "Minik eller için güvenli ve eğlenceli yaratıcı setler" },
];
export const products = [
  { slug:"premium-akrilik-boya-seti", name:"Premium Akrilik Boya Seti", brand:"Artiva", category:"Boyama & Tuval", sku:"ZHM-BY-1042", price:840, oldPrice:990, stock:18, tone:"blue" },
  { slug:"pamuk-makrome-ipi-lila", name:"Pamuk Makrome İpi – Lila", brand:"Laluna", category:"Örgü & Makrome", sku:"ZHM-OR-2088", price:219, oldPrice:null, stock:32, tone:"silver" },
  { slug:"miyuki-boncuk-baslangic-seti", name:"Miyuki Boncuk Başlangıç Seti", brand:"Beadly", category:"Takı Tasarımı", sku:"ZHM-TK-0816", price:480, oldPrice:560, stock:124, tone:"amber" },
  { slug:"scrapbook-hayal-bahcesi", name:"Scrapbook Hayal Bahçesi", brand:"Papella", category:"Kağıt Sanatları", sku:"ZHM-KG-3021", price:390, oldPrice:null, stock:46, tone:"dark" },
  { slug:"amigurumi-baslangic-kiti", name:"Amigurumi Başlangıç Kiti", brand:"Laluna", category:"Örgü & Makrome", sku:"ZHM-OR-1130", price:590, oldPrice:690, stock:9, tone:"red" },
  { slug:"cocuklar-icin-seramik-seti", name:"Çocuklar İçin Seramik Seti", brand:"MiniMori", category:"Çocuk Atölyesi", sku:"ZHM-CA-4014", price:370, oldPrice:null, stock:68, tone:"green" },
];
export const money = (n:number) => new Intl.NumberFormat("tr-TR", { style:"currency", currency:"TRY", maximumFractionDigits:0 }).format(n);
