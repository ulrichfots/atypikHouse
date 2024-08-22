import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

interface PayPalButtonProps {
  totalPrice: number;
  reservationId: string;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ totalPrice, reservationId }) => {
  const router = useRouter();

  const handleApprove = async (data: any) => {
    try {
      const response = await axios.post(`/api/reservations/${reservationId}/complete`, {
        paymentId: data.orderID,
      });
      
      if (response.status === 200) {
        toast.success('Paiement réussi!');
        router.push('/reservations/paid');
      } else {
        throw new Error("Erreur lors de la finalisation de la réservation.");
      }
      
    } catch (error) {
      console.error('Erreur lors de l\'approbation du paiement:', error);
      toast.error('Le paiement a échoué.');
    }
  };

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "", currency: "EUR" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          if (totalPrice <= 0) {
            toast.error('Le montant du paiement est invalide.');
            return Promise.reject();
          }
          
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "EUR",
                  value: totalPrice.toString(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          if (actions && actions.order) {
            return actions.order.capture()
              .then((details) => handleApprove(data))
              .catch((error) => {
                console.error('Erreur lors de la capture du paiement:', error);
                toast.error('Une erreur est survenue lors de la capture du paiement.');
              });
          } else {
            toast.error('Une erreur est survenue lors de l\'approbation du paiement.');
            return Promise.resolve();
          }
        }}
        onError={(error) => {
          console.error('Erreur PayPal:', error);
          toast.error('Une erreur est survenue lors du paiement.');
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
