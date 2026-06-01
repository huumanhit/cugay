import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient();

const CG = [
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299840/cugay/birds/bird-01.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299841/cugay/birds/bird-02.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299842/cugay/birds/bird-03.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299843/cugay/birds/bird-04.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299844/cugay/birds/bird-05.jpg",
  "https://res.cloudinary.com/dl51jugpu/image/upload/v1780299845/cugay/birds/bird-06.jpg",
];
const AVATAR = "https://i.pravatar.cc/150";

async function main() {
  const clubs = await prisma.club.findMany({ select: { id: true, name: true } });
  for (let i = 0; i < clubs.length; i++) {
    await prisma.club.update({
      where: { id: clubs[i].id },
      data: {
        coverImage: CG[i % CG.length],
        logo: `${AVATAR}?img=${i + 1}`,
        description: [
          "Câu lạc bộ cu gáy lớn nhất miền Tây với hơn 340 thành viên tích cực.",
          "Câu lạc bộ lớn nhất miền Bắc, nơi quy tụ những chiến binh xuất sắc xứ Bắc.",
          "CLB trẻ năng động của miền Trung, thường xuyên kết nối giao lưu toàn quốc.",
          "CLB cu gáy đông thành viên nhất Việt Nam với hơn 200 giải đấu đã tổ chức.",
        ][i] ?? `Câu lạc bộ cu gáy ${clubs[i].name}`,
        foundedAt: new Date(`201${5 + i}-0${(i % 9) + 1}-10`),
      },
    });
    console.log(`✅ ${clubs[i].name}`);
  }
  console.log("Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
