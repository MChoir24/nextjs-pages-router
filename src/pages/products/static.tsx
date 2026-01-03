import ProductsView from "@/components/views/Products";
import { Product } from "../api/[[...products]]";

export default function ProductsPage({ products }: { products: Product[] }) {
  return (
    <>
      <ProductsView products={products} />
    </>
  );
}

export async function getStaticProps() {
  // Fetch data from an API or database
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();
  return {
    props: {
      products: data.data,
    },
    // revalidate: 10, // Revalidate every 60 seconds
  };
}
