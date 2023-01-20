export const fetchProduct = async (productId) => {
  console.log("🚀 ~ file: fetchProduct.js:2 ~ fetchProduct ~ productId", productId)
  
  const res = await fetch(`/api/getProduct?productId=${productId}`);
  const data = await res.json();
  return data;
};
