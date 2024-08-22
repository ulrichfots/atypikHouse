import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/app/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { reservationId } = req.query;
  const { paymentId } = req.body as { paymentId: string };

  console.log('ID de réservation:', reservationId);
  console.log('ID de paiement:', paymentId);

  if (!reservationId || typeof reservationId !== 'string') {
    return res.status(400).json({ error: 'ID de réservation invalide' });
  }

  if (!paymentId || typeof paymentId !== 'string') {
    return res.status(400).json({ error: 'ID de paiement invalide' });
  }

  try {
    // Vérification si la réservation existe et si elle est déjà payée
    const reservation = await prisma.reservation.findUnique({ where: { id: reservationId } });

    if (!reservation) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }

    if (reservation.status === 'Paid') {
      return res.status(400).json({ error: 'Cette réservation a déjà été payée.' });
    }

    // Mise à jour de la réservation pour marquer comme payée
    const updatedReservation = await prisma.reservation.update({
      where: { id: reservationId },
      data: { status: 'Paid', paymentId },
    });

    return res.status(200).json(updatedReservation);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la réservation:', error);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour de la réservation' });
  }
}
