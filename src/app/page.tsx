import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import ListingCard from "@/app/components/listings/ListingCard";

interface HomeProps {
  listings: any[];
  currentUser: any;
}

export default async function Home() {
  // Suppose you remove searchParams dependency and fetch all listings
  const listings = await getListings({});
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
