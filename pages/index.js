import { Inter } from "@next/font/google";

import ProductItem from "@/components/ProductItem";
import { client } from "@/lib/client";

export default function Home({ products }) {
  // console.log(products);

  return (
    <div>
      <div className="w-full flex">
        {products.map((item, index) => (
          <ProductItem key={`${item._id}`} item={item} width="500px" />
        ))}
      </div>
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
