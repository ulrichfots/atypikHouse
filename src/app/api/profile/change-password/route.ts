import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { currentPassword, newPassword } = body;

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id
    }
  });

  if (!user || !user.hashedPassword) {
    return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
  }

  const isCorrectPassword = await bcrypt.compare(currentPassword, user.hashedPassword);

  if (!isCorrectPassword) {
    return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      hashedPassword: hashedNewPassword
    }
  });

  return NextResponse.json({ message: "Password updated successfully" });
}
