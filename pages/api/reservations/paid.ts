import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/app/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Méthode de requête reçue:', req.method);  // Log de la méthode de requête

  if (req.method !== 'GET') {
    console.error('Méthode non autorisée:', req.method);
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        status: 'Paid',
      },
    });

    console.log('Réservations récupérées:', reservations);
    return res.status(200).json(reservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations payées:', error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des réservations payées' });
  }
}
