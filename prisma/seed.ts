import { PrismaClient, ArticleStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ---- Layouts ----
  const layout1 = await prisma.articleLayout.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Layout Uno",
      description: "Layout clásico",
      template: 1,
    },
  });

  const layout2 = await prisma.articleLayout.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "Layout Dos",
      description: "Layout alternativo",
      template: 2,
    },
  });

  // ---- Sections ----
  const news = await prisma.section.upsert({
    where: { slug: "news" },
    update: {},
    create: {
      name: "Noticias",
      slug: "news",
      description: "Sección de noticias",
    },
  });

  // ---- Users ----
  const admin = await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      name: "Administrador",
      alias: "admin",
      email: "admin@test.com",
      role: "ADMIN",
    },
  });

  // ---- Tag ----
  const tech = await prisma.tag.upsert({
    where: { slug: "tech" },
    update: {},
    create: { name: "Tecnología", slug: "tech" },
  })

  // ---- Article ----
  await prisma.article.create({
    data: {
      title: "Primer artículo",
      summary: "Resumen inicial",
      content: "Contenido del primer artículo",
      status: ArticleStatus.PUBLISHED,
      layoutId: layout1.id,
      sectionId: news.id,
      authorId: admin.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
