import { PrismaClient, VoiceType, TimelineType } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "manh@cugay.vn" },
      update: {},
      create: {
        email: "manh@cugay.vn",
        name: "Nguyễn Văn Mạnh",
        avatar: "https://i.pravatar.cc/150?img=1",
        province: "Cần Thơ",
        verified: true,
        isPro: true,
        bio: "Người chơi cu gáy lâu năm tại Cần Thơ.",
      },
    }),
    prisma.user.upsert({
      where: { email: "long@cugay.vn" },
      update: {},
      create: {
        email: "long@cugay.vn",
        name: "Trần Đức Long",
        avatar: "https://i.pravatar.cc/150?img=2",
        province: "Hà Nội",
        verified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: "phuc@cugay.vn" },
      update: {},
      create: {
        email: "phuc@cugay.vn",
        name: "Lê Hoàng Phúc",
        avatar: "https://i.pravatar.cc/150?img=3",
        province: "Lâm Đồng",
        verified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: "tuan@cugay.vn" },
      update: {},
      create: {
        email: "tuan@cugay.vn",
        name: "Phạm Quốc Tuấn",
        avatar: "https://i.pravatar.cc/150?img=4",
        province: "TP. Hồ Chí Minh",
        verified: true,
        isPro: true,
      },
    }),
    prisma.user.upsert({
      where: { email: "hoang@cugay.vn" },
      update: {},
      create: {
        email: "hoang@cugay.vn",
        name: "Hoàng Minh Tuấn",
        avatar: "https://i.pravatar.cc/150?img=5",
        province: "Thừa Thiên Huế",
      },
    }),
    prisma.user.upsert({
      where: { email: "hai@cugay.vn" },
      update: {},
      create: {
        email: "hai@cugay.vn",
        name: "Võ Thanh Hải",
        avatar: "https://i.pravatar.cc/150?img=6",
        province: "Đà Nẵng",
        verified: true,
      },
    }),
  ]);

  // Ảnh cu gáy thật - ảnh do chủ nhân cung cấp, lưu tại public/birds/
  const CG = [
    "/birds/bird-01.jpg", "/birds/bird-02.jpg",
    "/birds/bird-03.jpg", "/birds/bird-04.jpg",
    "/birds/bird-05.jpg", "/birds/bird-06.jpg",
    "/birds/bird-07.jpg", "/birds/bird-08.jpg",
    "/birds/bird-09.jpg", "/birds/bird-10.jpg",
    "/birds/bird-11.jpg", "/birds/bird-12.jpg",
  ];

  // Create birds
  const birdsData = [
    {
      name: "Dũng Sĩ Tây Đô", slug: "dung-si-tay-do",
      voice: VoiceType.THO, age: 5,
      origin: "Cần Thơ", province: "Cần Thơ",
      image: CG[0],
      gallery: [CG[0], CG[1], CG[2], CG[3]],
      description: "Dũng Sĩ Tây Đô là một trong những chiến binh cu gáy xuất sắc nhất miền Tây.",
      weight: "185g", color: "Xanh lam + Nâu đỏ", lineage: "Dòng Tây Đô",
      verified: true, rating: 4.9, views: 18900, likes: 4200, score: 9850, rank: 1,
      ownerId: users[0].id,
    },
    {
      name: "Chiến Binh Hà Thành", slug: "chien-binh-ha-thanh",
      voice: VoiceType.VANG, age: 3,
      origin: "Hà Nội", province: "Hà Nội",
      image: CG[1],
      gallery: [CG[1], CG[0], CG[4]],
      description: "Giọng vàng trong trẻo, lanh lợi.",
      weight: "172g", color: "Xám bạc + Trắng", lineage: "Dòng Bắc Bộ",
      verified: true, rating: 4.7, views: 12400, likes: 2900, score: 9200, rank: 2,
      forSale: true, price: 55_000_000,
      ownerId: users[1].id,
    },
    {
      name: "Kim Cương Đà Lạt", slug: "kim-cuong-da-lat",
      voice: VoiceType.KIM, age: 4,
      origin: "Đà Lạt", province: "Lâm Đồng",
      image: CG[2],
      gallery: [CG[2], CG[5], CG[3]],
      description: "Giọng kim trong vắt, hiếm có.",
      weight: "178g", color: "Vàng đất + Nâu", lineage: "Dòng Cao Nguyên",
      verified: true, rating: 4.8, views: 9800, likes: 2100, score: 8900, rank: 3,
      ownerId: users[2].id,
    },
    {
      name: "Thần Ưng Sài Gòn", slug: "than-ung-sai-gon",
      voice: VoiceType.DAU, age: 6,
      origin: "TP. Hồ Chí Minh", province: "TP. Hồ Chí Minh",
      image: CG[3],
      gallery: [CG[3], CG[0], CG[1], CG[2]],
      description: "Huyền thoại của làng cu gáy miền Nam.",
      weight: "195g", color: "Xanh đen + Tím", lineage: "Dòng Nam Bộ",
      verified: true, rating: 5.0, views: 45600, likes: 12000, score: 8600, rank: 4,
      ownerId: users[3].id,
    },
    {
      name: "Ngọc Trai Xứ Huế", slug: "ngoc-trai-xu-hue",
      voice: VoiceType.THUY, age: 2,
      origin: "Huế", province: "Thừa Thiên Huế",
      image: CG[4],
      gallery: [CG[4], CG[2], CG[5]],
      description: "Giọng thủy mượt mà, êm dịu.",
      weight: "165g", color: "Trắng ngà + Xanh nhạt", lineage: "Dòng Miền Trung",
      verified: false, rating: 4.5, views: 5200, likes: 980, score: 7800, rank: 5,
      forSale: true, price: 25_000_000,
      ownerId: users[4].id,
    },
    {
      name: "Bạch Ngọc Đà Nẵng", slug: "bach-ngoc-da-nang",
      voice: VoiceType.DONG, age: 3,
      origin: "Đà Nẵng", province: "Đà Nẵng",
      image: CG[5],
      gallery: [CG[5], CG[3], CG[1]],
      description: "Giọng đồng vang rền, ổn định.",
      weight: "180g", color: "Trắng thuần", lineage: "Dòng Duyên Hải",
      verified: true, rating: 4.6, views: 7800, likes: 1650, score: 7500, rank: 6,
      forSale: true, price: 42_000_000,
      ownerId: users[5].id,
    },
  ];

  const birds = [];
  for (const data of birdsData) {
    const bird = await prisma.bird.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });
    birds.push(bird);
  }

  // Achievements
  await prisma.achievement.createMany({
    skipDuplicates: true,
    data: [
      { birdId: birds[0].id, title: "Vô địch miền Tây 2023", year: 2023 },
      { birdId: birds[0].id, title: "Á quân toàn quốc 2022", year: 2022 },
      { birdId: birds[0].id, title: "Top 3 giải Xuân 2024", year: 2024 },
      { birdId: birds[1].id, title: "Quán quân giải Thủ Đô 2024", year: 2024 },
      { birdId: birds[1].id, title: "Top 5 Bắc Bộ 2023", year: 2023 },
      { birdId: birds[2].id, title: "Vô địch Tây Nguyên 2023", year: 2023 },
      { birdId: birds[3].id, title: "5 lần vô địch TP.HCM", year: 2023 },
      { birdId: birds[3].id, title: "Vô địch miền Nam 2022", year: 2022 },
    ],
  });

  // Timeline events
  await prisma.timelineEvent.createMany({
    skipDuplicates: true,
    data: [
      {
        birdId: birds[0].id,
        date: new Date("2020-03-15"),
        title: "Bắt đầu nuôi",
        description: "Dũng Sĩ Tây Đô được đón về nhà từ một trại chim uy tín tại Cần Thơ.",
        type: TimelineType.MILESTONE,
        image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600",
      },
      {
        birdId: birds[0].id,
        date: new Date("2021-02-10"),
        title: "Bắt bổi đầu tiên",
        description: "Thành tích bắt bổi đầu tiên trong buổi tập ngoài đồng.",
        type: TimelineType.MILESTONE,
      },
      {
        birdId: birds[0].id,
        date: new Date("2022-04-20"),
        title: "Á quân toàn quốc 2022",
        description: "Tham gia giải vô địch cu gáy toàn quốc tại Hà Nội, đạt thành tích Á quân.",
        type: TimelineType.AWARD,
        image: "https://images.unsplash.com/photo-1548550941-75b8e13fd1d9?w=600",
      },
      {
        birdId: birds[0].id,
        date: new Date("2023-06-12"),
        title: "Vô địch miền Tây 2023",
        description: "Đăng quang giải vô địch cu gáy miền Tây lần thứ nhất.",
        type: TimelineType.AWARD,
      },
    ],
  });

  // Marketplace listings
  await prisma.marketplaceListing.upsert({
    where: { birdId: birds[1].id },
    update: {},
    create: {
      birdId: birds[1].id,
      sellerId: users[1].id,
      price: 55_000_000,
      negotiable: true,
      description: "Bán chim cu gáy giống Vàng, 3 tuổi, đã thi đấu nhiều giải.",
      views: 1240,
    },
  });

  await prisma.marketplaceListing.upsert({
    where: { birdId: birds[4].id },
    update: {},
    create: {
      birdId: birds[4].id,
      sellerId: users[4].id,
      price: 25_000_000,
      negotiable: false,
      description: "Chim non 2 tuổi, giọng Thủy thuần chủng.",
      views: 890,
    },
  });

  await prisma.marketplaceListing.upsert({
    where: { birdId: birds[5].id },
    update: {},
    create: {
      birdId: birds[5].id,
      sellerId: users[5].id,
      price: 42_000_000,
      negotiable: true,
      description: "Bán hoặc trao đổi chim cu gáy Bạch Ngọc.",
      views: 2100,
    },
  });

  // Clubs
  const clubsData = [
    { name: "CLB Cu Gáy Tây Đô", province: "Cần Thơ", verified: true },
    { name: "CLB Cu Gáy Hà Nội", province: "Hà Nội", verified: true },
    { name: "CLB Cu Gáy Đà Nẵng", province: "Đà Nẵng", verified: true },
    { name: "CLB Cu Gáy Sài Gòn", province: "TP. Hồ Chí Minh", verified: true },
  ];
  await prisma.club.createMany({ data: clubsData, skipDuplicates: true });

  // News
  await prisma.newsArticle.upsert({
    where: { slug: "giai-cu-gay-toan-quoc-2025" },
    update: {},
    create: {
      title: "Giải Cu Gáy Toàn Quốc 2025: Những Chiến Binh Nào Đáng Chú Ý?",
      slug: "giai-cu-gay-toan-quoc-2025",
      excerpt: "Giải vô địch cu gáy toàn quốc 2025 sắp diễn ra với hơn 200 chú chim tham dự.",
      content: "Nội dung chi tiết...",
      coverImage: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800",
      author: "Biên Tập Viên CuGay.vn",
      category: "Tin tức",
      readTime: 5,
      views: 12400,
      published: true,
      publishedAt: new Date("2025-05-30"),
    },
  });

  console.log("✅ Seed hoàn thành!");
  console.log(`   Users:    ${users.length}`);
  console.log(`   Birds:    ${birds.length}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
