// pages/api/messages/markDelivered.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { messageId } = req.body;

  try {
    const message = await prisma.message.update({
      where: { id: messageId },
      data: { isDelivered: true },
    });

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de livraison du message' });
  }
}
