
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching users' }), { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  const { name, email } = body;
  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating user' }), { status: 500 });
  }
}

export async function PUT(req) {
  const body = await req.json();
  const { id, name, email } = body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email },
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error updating user' }), { status: 500 });
  }
}

export async function DELETE(req) {
  const body = await req.json();
  const { id } = body;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error deleting user' }), { status: 500 });
  }
}
