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
const AVATARS = [
  "https://i.pravatar.cc/150?img=10",
  "https://i.pravatar.cc/150?img=11",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=13",
];

const NEWS = [
  {
    slug: "giai-cu-gay-toan-quoc-2025",
    title: "Giải Cu Gáy Toàn Quốc 2025: Những Chiến Binh Nào Đáng Chú Ý?",
    excerpt: "Giải vô địch cu gáy toàn quốc 2025 sắp diễn ra với hơn 200 chú chim tham dự từ 63 tỉnh thành. Đây là sự kiện được mong chờ nhất trong năm của làng cu gáy Việt Nam.",
    content: "Giải đấu sẽ diễn ra tháng 7/2025 tại TP.HCM với tổng giải thưởng lên đến 2 tỷ đồng...",
    coverImage: CG[0], author: "Ban Biên Tập CuGay.vn", authorAvatar: AVATARS[0],
    category: "Tin tức", readTime: 5, views: 12400,
    publishedAt: new Date("2025-05-30"),
  },
  {
    slug: "bi-quyet-cham-soc-cu-gay-mua-he",
    title: "Bí Quyết Chăm Sóc Cu Gáy Mùa Hè: Tránh Nắng, Đủ Nước, Giữ Giọng",
    excerpt: "Mùa hè nắng nóng là thử thách lớn với chủ nuôi cu gáy. Những bí quyết từ chuyên gia giúp giữ chim khỏe mạnh và duy trì giọng đấu tốt suốt mùa hè.",
    content: "Chăm sóc cu gáy mùa hè cần chú ý đặc biệt đến nhiệt độ, độ ẩm và chế độ ăn uống...",
    coverImage: CG[1], author: "Chuyên gia Lê Văn Thành", authorAvatar: AVATARS[1],
    category: "Kinh nghiệm", readTime: 8, views: 8900,
    publishedAt: new Date("2025-05-28"),
  },
  {
    slug: "clb-cu-gay-sai-gon-ky-niem-15-nam",
    title: "CLB Cu Gáy Sài Gòn Kỷ Niệm 15 Năm Với Giải Đấu Đặc Biệt",
    excerpt: "Nhân dịp 15 năm thành lập, CLB Cu Gáy Sài Gòn tổ chức giải đấu đặc biệt với tổng giải thưởng lên đến 500 triệu đồng, thu hút hàng trăm chim tham dự.",
    content: "CLB Cu Gáy Sài Gòn – một trong những CLB lâu đời nhất miền Nam – kỷ niệm 15 năm...",
    coverImage: CG[2], author: "Phóng viên Minh Nhật", authorAvatar: AVATARS[2],
    category: "Sự kiện", readTime: 4, views: 6700,
    publishedAt: new Date("2025-05-26"),
  },
  {
    slug: "thi-truong-cu-gay-quy-2-2025",
    title: "Xu Hướng Thị Trường Cu Gáy Quý II/2025: Giá Giọng Kim Tăng Mạnh",
    excerpt: "Phân tích thị trường cho thấy giá chim cu gáy giọng Kim đang tăng 30% so với cùng kỳ, trong khi giọng Thổ vẫn giữ vị trí số 1 về giao dịch.",
    content: "Thị trường cu gáy Việt Nam đang chứng kiến sự tăng trưởng mạnh mẽ trong quý II/2025...",
    coverImage: CG[3], author: "Phân tích viên Quốc Việt", authorAvatar: AVATARS[3],
    category: "Thị trường", readTime: 6, views: 9800,
    publishedAt: new Date("2025-05-24"),
  },
  {
    slug: "hanh-trinh-dung-si-tay-do",
    title: "Hành Trình Của Dũng Sĩ Tây Đô: Từ Chim Non Đến Vô Địch Miền Tây",
    excerpt: "Câu chuyện cảm hứng về hành trình 3 năm của Dũng Sĩ Tây Đô từ một chú chim bình thường đến ngôi vô địch miền Tây, được chăm sóc bởi người chơi lâu năm tại Cần Thơ.",
    content: "Dũng Sĩ Tây Đô – cái tên được nhắc đến nhiều nhất trong làng cu gáy miền Tây...",
    coverImage: CG[4], author: "Nguyễn Văn Mạnh", authorAvatar: AVATARS[0],
    category: "Câu chuyện", readTime: 10, views: 15600,
    publishedAt: new Date("2025-05-22"),
  },
  {
    slug: "huong-dan-xay-long-cu-gay",
    title: "Hướng Dẫn Xây Lồng Cu Gáy Chuẩn Kỹ Thuật Cho Người Mới",
    excerpt: "Lồng chim là môi trường sống quan trọng ảnh hưởng trực tiếp đến sức khỏe và giọng gáy. Hướng dẫn chi tiết từ kích thước, vật liệu đến cách bố trí.",
    content: "Một chiếc lồng tốt không chỉ giữ chim an toàn mà còn ảnh hưởng trực tiếp đến giọng gáy...",
    coverImage: CG[5], author: "Thợ lồng Cao Thắng", authorAvatar: AVATARS[1],
    category: "Hướng dẫn", readTime: 7, views: 7200,
    publishedAt: new Date("2025-05-20"),
  },
  {
    slug: "chon-giong-cu-gay-dau-tien",
    title: "Chọn Giống Cu Gáy Đầu Tiên: Thổ, Đồng, Kim Hay Vàng?",
    excerpt: "Người mới chơi thường băn khoăn nên chọn giọng nào để bắt đầu. Bài viết phân tích ưu nhược điểm từng dòng giọng và lời khuyên từ các chuyên gia.",
    content: "Mỗi dòng giọng cu gáy đều có đặc điểm riêng, phù hợp với các mục đích nuôi khác nhau...",
    coverImage: CG[0], author: "Ban Biên Tập CuGay.vn", authorAvatar: AVATARS[2],
    category: "Kinh nghiệm", readTime: 6, views: 11200,
    publishedAt: new Date("2025-05-18"),
  },
  {
    slug: "giao-luu-cu-gay-mien-trung-2025",
    title: "Giao Lưu Cu Gáy Miền Trung 2025: Đà Nẵng Đón 500 Chiến Binh",
    excerpt: "Sự kiện giao lưu cu gáy miền Trung lần thứ 5 tại Đà Nẵng quy tụ hơn 500 chú chim từ 15 tỉnh thành, hứa hẹn là ngày hội lớn nhất của cộng đồng.",
    content: "Đà Nẵng sẽ là điểm hội tụ của những chiến binh cu gáy xuất sắc nhất miền Trung...",
    coverImage: CG[1], author: "Phóng viên Thanh Hải", authorAvatar: AVATARS[3],
    category: "Sự kiện", readTime: 3, views: 4300,
    publishedAt: new Date("2025-05-16"),
  },
];

async function main() {
  console.log("🌱 Seeding news articles...");
  for (const article of NEWS) {
    await prisma.newsArticle.upsert({
      where: { slug: article.slug },
      update: { views: article.views, coverImage: article.coverImage },
      create: { ...article, published: true },
    });
    console.log(`  ✅ ${article.title.slice(0, 50)}...`);
  }
  console.log(`\n✅ Seeded ${NEWS.length} articles`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
