import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data } = useSession();
  console.log(data);
  return (
    <div className="flex p-4 justify-between bg-gray-800 text-white gap-4">
      {/* <div className={style.navbar}> */}
      <div className="flex items-end gap-4">
        <Link href="/" className="font-bold text-2xl">
          My Navbar
        </Link>
        <Link href="/products">Products</Link>
      </div>
      {data?.user ? (
        <div className="flex gap-3 items-end">
          <div className="cursor-pointer">
            Signed in as <strong>{data.user.email}</strong>
          </div>
          <button
            className="cursor-pointer bg-red-600 px-3 py-1 rounded"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          className="cursor-pointer bg-green-600 px-3 py-1 rounded"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </div>
  );
}
