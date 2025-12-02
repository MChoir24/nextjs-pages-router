import { Product } from "@/pages/api/[[...products]]";
import Link from "next/link";

export default function ProductsView({
  products = [],
  isLoading = false,
}: {
  products: Product[];
  isLoading?: boolean;
}) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Products Page</h1>
      <p>
        Welcome to the products page. Here you will find a variety of products
        available for purchase.
      </p>
      {isLoading ? (
        <div className="border flex animate-pulse">
          <div className="h-48 aspect-square bg-gray-300" />
          <div className="p-4 my-4 flex-1 space-y-3">
            <div className="h-6 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
            <div className="h-4 bg-gray-300 rounded w-1/3" />
          </div>
        </div>
      ) : products.length > 0 ? (
        <>
          {products.map((product: Product) => (
            <Link
              key={product.id}
              className="border flex mb-4 overflow-hidden hover:shadow-lg transition-shadow duration-300 active:shadow-none active:bg-neutral-200 hover:cursor-pointer"
              href={`/products/${product.id}`}
            >
              <img
                src={product.image}
                alt="Products Banner"
                className="h-48 aspect-square object-cover scale-105 transition-all duration-300 hover:scale-100"
              />
              <div className="p-4 my-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p>Price: ${product.price}</p>
                <p>Size: {product.size}</p>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}
