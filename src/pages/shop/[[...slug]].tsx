import { useRouter } from "next/router";

export default function ShopPage() {
  const { query } = useRouter();
  console.log(query);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Shop Page</h1>
      <p>
        You are viewing the shop page for{" "}
        <span className="uppercase font-bold">{Array.isArray(query.slug) ? query.slug.join(">") : query.slug}</span>
      </p>
    </div>
  );
}