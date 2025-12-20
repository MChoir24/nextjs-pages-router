import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import NavLink from "@/components/elements/NavLink";

export default function Navbar() {
  const { data } = useSession();

  return (
    <div className="flex p-4 justify-between bg-gray-800 text-white gap-4">
      {/* <div className={style.navbar}> */}
      <div className="flex items-end gap-4">
        <Link href="/" className="font-bold text-3xl">
          My Navbar
        </Link>
        <NavLink lineColor="bg-blue-600" href="/products">
          Products
        </NavLink>
        <NavLink lineColor="bg-blue-600" href="/profile">
          Profile
        </NavLink>
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
