import { Listing, Reservation, User , Comment as PrismaComment} from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "listing"
> & {
  createdAt: string;
  startDate: Date; // Modifier le type de startDate
  endDate: Date; // Modifier le type de endDate
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};


export type SafeComment = Omit<PrismaComment, "createdAt"> & {
  createdAt: string;
  user: SafeUser;
};