
import ProductItem from "@/components/ProductItem";
import ShoppingList from "@/components/ShoppingList";
import { Typography } from "@mui/material";
import { client } from "@/lib/client";
export default function Home({newArrivals, popular, topRated, allProducts}) {
  

  return (
    <div>
      <div className="bg-blue-girl min-h-[600px] lg:min-h-[500px] xl:min-h-[40vw] bg-fixed bg-center bg-no-repeat bg-cover p-7">
        <div className="p-5 border-[1px] text-left bg-black/40 absolute text-white rounded-lg top-[35%] left-4 md:left-[10%] right-4 md:right-auto">
          <Typography color="red">--- NEW ITEMS</Typography>
          <Typography variant="h1">Latest Fashion Trends</Typography>
          <Typography color="red">Discover More</Typography>
        </div>
      </div>
     <ShoppingList newArrivals={newArrivals} popular={popular} topRated={topRated} allProducts={allProducts}/>
    </div>
  );
}

export async function getServerSideProps(context) {
  const getAll = '*[_type == "product"]';
  const query = '*[_type == "product" && "New-Arrival" in category]';
  const query1 = '*[_type == "product" && "Popular" in category]';
  const query2 = '*[_type == "product" && "Top-Rated" in category]';
  const newArrivals = await client.fetch(query);
  const popular = await client.fetch(query1);
  const topRated = await client.fetch(query2);
  const allProducts = await client.fetch(getAll);
  return {
    props: { newArrivals, popular , topRated , allProducts},
  };
}

