'use client';

import React from 'react';

const CGVPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Conditions Générales de Vente de Prestations de Services en Ligne à des Consommateurs Particuliers d’AtypikHouse SARL
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Préambule</h2>
        <p className="mb-4">
          Les présentes conditions générales de vente s’appliquent à toutes les prestations de services conclues sur le site Internet AtypikHouse.
        </p>
        <p className="mb-4">
          Le site Internet AtypikHouse est un service de :
        </p>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>Société : AtypikHouse SARL</li>
          <li>Siège social : 123 Rue des Aventuriers, 60000 Pierrefonds, France</li>
          <li>Adresse URL du site : <a href="http://www.atypikhouse.fr" className="text-blue-500 hover:underline">www.atypikhouse.fr</a></li>
          <li>Adresse email : <a href="mailto:contact@atypikhouse.fr" className="text-blue-500 hover:underline">contact@atypikhouse.fr</a></li>
          <li>Téléphone : 09.50.41.41.41</li>
        </ul>
        <p className="mb-4">
          Le client déclare avoir pris connaissance et avoir accepté les conditions générales de vente antérieurement à la passation de la commande.
          La validation de la commande vaut donc acceptation des conditions générales de vente.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Article 1 - Contenu et champ d’application</h2>
        <p>
          Les présentes conditions générales de vente s’appliquent de plein droit aux prestations de services suivantes : réservation en ligne de séjours en hébergements insolites.
        </p>
        <p>
          Elles s’appliquent à l’exclusion de toutes autres conditions, et notamment celles applicables pour les ventes sur internet ou au moyen d’autres circuits de distribution et de commercialisation.
        </p>
        <p>
          La vente est réputée conclue à la date d’acceptation de la commande ou à l’achat immédiat par le vendeur.
        </p>
        <p>
          Toute commande ou achat immédiat implique l’adhésion sans réserve aux présentes conditions générales de vente qui prévalent sur toutes autres conditions, à l’exception de celles qui ont été acceptées expressément par le vendeur.
        </p>
        <p>
          L’acheteur déclare avoir pris connaissance des présentes conditions générales de vente et les avoir acceptées avant son achat immédiat ou la passation de sa commande.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Article 2 - Informations précontractuelles</h2>
        <p className="mb-4">
          Préalablement à l’achat immédiat ou à la passation de la commande et à la conclusion du contrat, ces conditions générales de vente sont communiquées à l’acheteur, qui reconnaît les avoir reçues.
        </p>
        <p className="mb-4">
          Sont transmises à l’acheteur, de manière claire et compréhensible, les informations suivantes :
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Les caractéristiques essentielles du service ;</li>
          <li>Le prix du service ou le mode de calcul du prix et, s’il y a lieu, tous les frais supplémentaires ;</li>
          <li>La date ou le délai d’exécution du service ;</li>
          <li>Les informations relatives à l’identité du prestataire, ses coordonnées et ses activités ;</li>
          <li>Les modalités de traitement des réclamations ;</li>
          <li>La durée du contrat ou les conditions de résiliation ;</li>
          <li>Les informations pertinentes sur l’interopérabilité du contenu numérique.</li>
        </ul>
        <p className="mt-4">
          Le prestataire de services doit également communiquer à l’acheteur ou mettre à sa disposition les informations suivantes :
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Statut et forme juridique, coordonnées de contact ;</li>
          <li>Numéro d’inscription au registre du commerce et des sociétés ;</li>
          <li>Autorisation(s) éventuelle(s) nécessaire(s) pour l’exercice de l’activité ;</li>
          <li>Numéro de TVA intracommunautaire ;</li>
          <li>Titre professionnel et organisme d’inscription pour les professions réglementées ;</li>
          <li>Garantie financière ou assurance de responsabilité professionnelle.</li>
        </ul>
      </section>

      {/* Répétez ce format pour les autres articles */}
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Article 5 - Exécution de la prestation et résolution du contrat</h2>
        <p>
          Sauf conditions particulières expresses propres à la vente, l’exécution de la prestation s’effectuera dans le délai dès le jour de la réservation à compter de la réception par le vendeur d’une commande en bonne et due forme.
        </p>
        <p>
          En cas de manquement du vendeur à son obligation d’exécution à la date ou à l’expiration du délai prévu ci-dessus, l’acheteur peut résoudre le contrat dans les conditions prévues par la loi.
        </p>
        <p>
          Les frais et risques liés à cette opération sont à la charge exclusive du prestataire.
        </p>
        <p>
          Hormis cas de force majeure, l’acompte versé à la commande est acquis de plein droit et ne peut donner lieu à aucun remboursement.
        </p>
      </section>

      {/* Continuez à ajouter d'autres sections/articles en suivant le même schéma */}

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Article 15 - Protection des données personnelles</h2>
        <p>
          Pour toute information sur la collecte et l’utilisation des données personnelles, veuillez vous référer à notre politique de confidentialité disponible sur notre site web.
        </p>
        <p>
          Ces conditions générales de vente sont susceptibles d’être modifiées par AtypikHouse SARL. En cas de modification, une version mise à jour sera publiée sur le site web et entrera en vigueur à la date indiquée sur la nouvelle version.
        </p>
      </section>
    </div>
  );
};

export default CGVPage;
