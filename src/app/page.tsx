import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  listings: any[];
  currentUser: any;
}

const Home = ({ listings, currentUser }: HomeProps) => {
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
};

export const getStaticPaths = async () => {
  // Generate a list of paths that should be statically generated.
  // You need to define the possible values of `searchParams` (e.g., `category`, `location`).
  
  const paths = [
    {
      params: { searchParams: { /* predefined params */ } }
    },
    // Add more paths as needed
  ];

  return {
    paths,
    fallback: true, // Set to 'blocking' or 'true' if you want to dynamically generate pages on first request
  };
};

export const getStaticProps = async ({ params }: { params: { searchParams: IListingsParams } }) => {
  const listings = await getListings(params.searchParams);
  const currentUser = await getCurrentUser();

  return {
    props: {
      listings,
      currentUser,
    },
    revalidate: 10, // Re-generate the page at most once every 10 seconds
  };
};

export default Home;
