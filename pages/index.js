import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CartMenu from "@/components/CartMenu";
import {useSelector } from "react-redux";
import { client } from "@/lib/client";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ products }) {
  const isCartOpen = useSelector((state) => state.myCart.isCartOpen);
  return (
    <div>
      <Navbar />
      <HeroBanner />
      {isCartOpen && <CartMenu/>}
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
