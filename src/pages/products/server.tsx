import ProductsView from "@/views/Products";
import { Product } from "../api/[[...products]]";

export default function ProductsPage({ products }: { products: Product[] }) {
  return (
    <>
      <ProductsView products={products} />
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from an API or database
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();
  return {
    props: {
      products: data.data,
    },
  };
}
