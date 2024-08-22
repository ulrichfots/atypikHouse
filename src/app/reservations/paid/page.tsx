'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Reservation {
  id: string;
  status: string;
  paymentId: string;
  // Ajoutez ici les autres champs de la réservation que vous souhaitez afficher
}

const PaidReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaidReservations = async () => {
      try {
        const response = await axios.get('/api/reservations/paid');
        setReservations(response.data);
      } catch (error) {
        setError('Erreur lors du chargement des réservations payées.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaidReservations();
  }, []);

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Mes Réservations Payées</h1>
      {reservations.length === 0 ? (
        <p>Aucune réservation payée trouvée.</p>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              Réservation ID: {reservation.id} - Statut: {reservation.status} - Payment ID: {reservation.paymentId}
              {/* Affichez ici d'autres informations pertinentes */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaidReservations;
