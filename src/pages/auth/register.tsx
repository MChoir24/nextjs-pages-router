import Link from "next/link";
import PrimaryButton from "@/components/elements/PrimaryButton";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const { push } = useRouter();
  const handleRegister = () => {
    push("/");
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4">Register Page</h1>
      <PrimaryButton onClick={() => handleRegister()}>Register</PrimaryButton>
      <p>Please fill in the form to create an account.</p>
      <span>
        or Login{" "}
        <Link href={"/auth/login"} className="text-blue-600 underline">
          Here
        </Link>
      </span>
    </div>
  );
}
