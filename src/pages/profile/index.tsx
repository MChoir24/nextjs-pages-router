import {
  BeakerIcon,
  PencilIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  console.log(session?.user);
  return (
    <div className="p-8">
      <div>
        {/* Profile header */}
        <h1 className="text-3xl font-bold">Welcome, {session?.user?.name}</h1>
        {/* date information Day, d M Y */}
        <p className="text-gray-600 mt-2">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="mt-4">
        {/* Profile information */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center gap-4">
            <p>
              <span className="font-semibold">Name:</span> {session?.user?.name}
            </p>
            <button>
              <PencilSquareIcon className="size-5 text-gray-500" />
            </button>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <p className="mt-2">
              <span className="font-semibold">Email:</span>{" "}
              {session?.user?.email}
            </p>
            <button>
              <PencilSquareIcon className="size-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
