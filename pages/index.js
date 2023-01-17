import { Inter } from "@next/font/google";

import ProductItem from "@/components/ProductItem";
import { client } from "@/lib/client";
import { Typography } from "@mui/material";

export default function Home({ products }) {
  // console.log(products);

  return (
    <div>
      <div className="bg-blue-girl min-h-[600px] lg:min-h-[500px] xl:min-h-[40vw] bg-fixed bg-center bg-no-repeat bg-cover p-7">
        <div className="p-5 border-[1px] text-left bg-black/40 absolute text-white rounded-lg top-[35%] left-4 md:left-[10%] right-4 md:right-auto">
          <Typography color="red">--- NEW ITEMS</Typography>
          <Typography variant="h1">Latest Fashion Trends</Typography>
          <Typography color="red">Discover More</Typography>
        </div>
      </div>
      <div className="h-[1000px]"></div>
      {/* <div className="w-full flex">
        {products.map((item, index) => (
          <ProductItem key={`${item._id}`} item={item} width="500px" />
        ))}
      </div> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products }, // will be passed to the page component as props
  };
}
