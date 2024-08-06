import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { listingId } = req.query;

  try {
    const comments = await prisma.comment.findMany({
      where: { listingId: listingId as string },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
