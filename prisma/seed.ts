import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const categories = await Promise.all(["Boyama & Tuval","Örgü & Makrome","Takı Tasarımı","Kağıt Sanatları","Çocuk Atölyesi"].map((name,i)=>db.category.upsert({where:{slug:`kategori-${i+1}`},update:{name},create:{name,slug:`kategori-${i+1}`}})));
  const brands = await Promise.all(["Artiva","Laluna","Papella"].map((name,i)=>db.brand.upsert({where:{slug:`marka-${i+1}`},update:{name},create:{name,slug:`marka-${i+1}`}})));
  for(let i=1;i<=20;i++) await db.product.upsert({where:{sku:`DEMO-${String(i).padStart(3,"0")}`},update:{},create:{sku:`DEMO-${String(i).padStart(3,"0")}`,name:`Demo Hobi Ürünü ${i}`,slug:`demo-hobi-urunu-${i}`,description:"Yalnızca geliştirme ortamında kullanılacak örnek hobi ürünü.",price:100+i*25,stock:i*3,active:true,featured:i<=4,categoryId:categories[(i-1)%categories.length].id,brandId:brands[(i-1)%brands.length].id}});
  const blogCategory=await db.blogCategory.upsert({where:{slug:"sektor-rehberi"},update:{},create:{name:"Sektör Rehberi",slug:"sektor-rehberi"}});
  for(let i=1;i<=5;i++) await db.blogPost.upsert({where:{slug:`demo-blog-${i}`},update:{},create:{title:`Demo Blog Yazısı ${i}`,slug:`demo-blog-${i}`,content:"Bu içerik yalnızca geliştirme ortamı için oluşturulmuştur.",authorName:"ZERBER HOBİ MARKET Editör",publishedAt:new Date(),categoryId:blogCategory.id}});
}
main().finally(()=>db.$disconnect());
