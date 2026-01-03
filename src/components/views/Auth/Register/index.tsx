import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import { Input } from "@/components/elements/Input";
import Link from "next/link";
import { useRouter } from "next/router";

export default function RegisterView() {
  const { push } = useRouter();
  const handleRegister = () => {
    push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Register Page</h1>
      <div className="w-full max-w-sm border border-gray-300 p-6 bg-white rounded shadow-md mb-4 flex flex-col">
        <form className="">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            className="mb-3"
            required
          />
          <Input
            id="text"
            type="text"
            placeholder="Name"
            name="name"
            className="mb-3"
            required
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            className="mb-3"
            required
          />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm"
            name="confirmPassword"
            className="mb-4"
            required
          />
        </form>
        <PrimaryButton type="submit">Register</PrimaryButton>
        <span className="mt-4 text-center">
          or Login{" "}
          <Link href={"/auth/login"} className="text-blue-600 underline">
            Here
          </Link>
        </span>
      </div>
    </div>
  );
}
