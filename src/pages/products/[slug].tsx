import { fetcher } from "@/lib/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DetailProductPage() {
  const { query } = useRouter();

  const { data, error, isLoading } = useSWR(
    `/api/products/${query.slug}`,
    fetcher
  );
  !isLoading && data.data && console.log(data.data);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Product Detail Page</h1>
      <p>
        This is the detail page for{" "}
        {isLoading ? (
          <span className="animate-pulse bg-gray-300 h-4 w-1/2 inline-block"></span>
        ) : (
          <span className="uppercase font-bold">{data?.data.name}</span>
        )}
      </p>
    </div>
  );
}
