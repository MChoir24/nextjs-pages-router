import { Product } from "@/pages/api/[[...products]]";

export default function ProductDetails({
  data,
  isLoading,
}: {
  data: Product;
  isLoading: boolean;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {isLoading ? (
          <span className="animate-pulse bg-gray-300 h-4 w-1/2 inline-block"></span>
        ) : (
          <span className="uppercase font-bold">{data.name}</span>
        )}
      </h1>
    </div>
  );
}
