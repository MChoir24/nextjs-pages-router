import ProductsView from "@/components/views/Products";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";

export default function ProductsPage() {
  // const [products, setProducts] = useState([]);

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
