import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const article = await prisma.article.findUnique({
    where: { id },
    include: { author: true, section: true, layout: true },
  });

  if (!article) return new Response("No encontrado", { status: 404 });
  return new Response(JSON.stringify(article), { status: 200 });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await req.json();

  const updated = await prisma.article.update({
    where: { id },
    data: body,
  });

  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  await prisma.article.delete({ where: { id } });
  return new Response("Eliminado", { status: 204 });
}
