import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import prisma from '@/app/libs/prismadb';
import { authOptions } from '../auth/[...nextauth]';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode Non Autorisée' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ error: 'Non authentifié' });
  }

  const { currentPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.hashedPassword) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const isCorrectPassword = await bcrypt.compare(currentPassword, user.hashedPassword);

    if (!isCorrectPassword) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { email: session.user.email },
      data: { hashedPassword: hashedNewPassword },
    });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to change password' });
  }
}
