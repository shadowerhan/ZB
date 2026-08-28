export const categories = [
  { name: "Kesici Takımlar", slug: "kesici-takimlar", count: 126, icon: "✦", text: "Yüksek hassasiyetli delme ve frezeleme çözümleri" },
  { name: "Bağlantı Elemanları", slug: "baglanti-elemanlari", count: 248, icon: "⬡", text: "Zorlu koşullar için dayanıklı bağlantı teknolojileri" },
  { name: "Ölçüm Sistemleri", slug: "olcum-sistemleri", count: 74, icon: "⌁", text: "Kalite kontrolde güvenilir ve kesin sonuçlar" },
  { name: "İş Güvenliği", slug: "is-guvenligi", count: 92, icon: "◇", text: "Ekibiniz için sertifikalı koruyucu ekipmanlar" },
  { name: "Endüstriyel Kimya", slug: "endustriyel-kimya", count: 63, icon: "◉", text: "Bakım, temizlik ve üretime özel kimyasallar" },
];
export const products = [
  { slug:"karbur-freze-pro-x4", name:"Karbür Freze Pro X4", brand:"Vektor", category:"Kesici Takımlar", sku:"NVX-KF-1042", price:3840, oldPrice:4290, stock:18, tone:"blue" },
  { slug:"dijital-kumpas-150", name:"Dijital Kumpas 150 mm", brand:"Measurex", category:"Ölçüm Sistemleri", sku:"NVX-OL-2088", price:2190, oldPrice:null, stock:32, tone:"silver" },
  { slug:"paslanmaz-celik-civata-m8", name:"Paslanmaz Çelik Civata M8", brand:"Fixon", category:"Bağlantı Elemanları", sku:"NVX-BG-0816", price:480, oldPrice:560, stock:124, tone:"amber" },
  { slug:"profesyonel-koruyucu-gozluk", name:"Profesyonel Koruyucu Gözlük", brand:"Safework", category:"İş Güvenliği", sku:"NVX-IG-3021", price:890, oldPrice:null, stock:46, tone:"dark" },
  { slug:"tork-anahtari-20-200", name:"Tork Anahtarı 20–200 Nm", brand:"Vektor", category:"El Aletleri", sku:"NVX-EA-1130", price:5290, oldPrice:5890, stock:9, tone:"red" },
  { slug:"bakim-spreyi-ultra", name:"Bakım Spreyi Ultra 500 ml", brand:"ChemPro", category:"Endüstriyel Kimya", sku:"NVX-EK-4014", price:370, oldPrice:null, stock:68, tone:"green" },
];
export const money = (n:number) => new Intl.NumberFormat("tr-TR", { style:"currency", currency:"TRY", maximumFractionDigits:0 }).format(n);
