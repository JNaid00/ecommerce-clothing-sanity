import { sanityClient } from "../../ecommerce-sanity";
import { groq } from "next-sanity";

const query = groq`*[_type == "product" && _id == "$productId"][0]`;

export default async function handler(req, res) {
  const { productId } = req.query;
  const product = await sanityClient.fetch(query, {
    productId,
  });

  res.status(200).json(product);
}
