'use client';
import { useEffect, useState } from "react";
import { SafeListing, SafeUser, SafeReservation } from "@/app/types";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import PayPalButton from "@/app/components/PayPalButton";

interface LocationValue {
    region?: string;
    label?: string;
}

interface ListingCardProps {
    data: SafeListing & { locationValue: LocationValue | string };
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter();

    const location = typeof data.locationValue === 'object' && data.locationValue !== null && 'region' in data.locationValue
        ? `${(data.locationValue as LocationValue).region}, ${(data.locationValue as LocationValue).label}`
        : data.locationValue as string;

    const reservationDate = reservation
        ? `${format(new Date(reservation.startDate), "PP")} - ${format(new Date(reservation.endDate), "PP")}`
        : data.category;

    const price = reservation ? reservation.totalPrice : data.price;

    return (
        <div
           onClick={() => router.push(`/listings/${data.id}`)}
           className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                      fill  
                      alt="listing"
                      src={data.imageSrc}
                      className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">€ {price}</div>
                    {!reservation && (
                        <div className="font-light">/Nuit</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button 
                      disabled={disabled}
                      small
                      label={actionLabel}
                      onClick={(e) => {
                          e.stopPropagation();
                          onAction(actionId);
                      }}
                    />
                )}
                {reservation && (
                    <div className="mt-2">
                        <PayPalButton
                            totalPrice={reservation.totalPrice}
                            reservationId={reservation.id}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListingCard;
