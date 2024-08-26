import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import axios from "axios";
import ClientOnly from "./components/ClientOnly";

interface HomeProps {
  searchParams: any;
}

const Home = async ({ searchParams }: HomeProps) => {
  let listings = [];
  let currentUser = null;

  try {
    const response = await axios.get(`${process.env.DATABASE_URL}/api/listings`, {
      params: searchParams,
    });
    listings = response.data;
  } catch (error) {
    console.error("Failed to fetch listings", error);
  }

  try {
    currentUser = await getCurrentUser();
  } catch (error) {
    console.error("Failed to fetch current user", error);
  }

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
          {listings.map((listing: any) => (
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
};

export default Home;
