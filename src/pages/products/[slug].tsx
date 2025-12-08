import { fetcher } from "@/lib/swr/fetcher";
import ProductDetails from "@/views/ProductDetails";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DetailProductPage() {
  const { query } = useRouter();

  const { data, error, isLoading } = useSWR(
    `/api/products/${query.slug}`,
    fetcher
  );

  return (
    <div className="p-8">
      <ProductDetails data={data?.data} isLoading={isLoading}></ProductDetails>
    </div>
  );
}
