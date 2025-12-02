import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductsView from "@/views/Products";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";

export default function ProductsPage() {
  const { push } = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, [isLogin, push]);

  const { data, error, isLoading } = useSWR("/api/products", fetcher);

  // useEffect(() => {
  //   fetch("/api/products")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching products:", error);
  //     });
  // }, []);

  return (
    <div>
      <ProductsView products={data?.data} isLoading={isLoading} />
    </div>
  );
}
