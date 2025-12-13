import { useRouter } from "next/router";
import style from "./Login.module.css";
import PrimaryButton from "@/components/elements/PrimaryButton";
import Link from "next/link";

export default function LoginViews() {
  const { push } = useRouter();
  const handleLogin = () => {
    push("/products");
  };

  return (
    // <div className="">
    <div className={style.loginContainer}>
      <h1 className="text-3xl font-bold mb-4">Login Page</h1>
      <PrimaryButton onClick={() => handleLogin()}>Login</PrimaryButton>
      <p>Please enter your credentials to log in.</p>
      <span>
        or register{" "}
        <Link href={"/auth/register"} className="text-blue-600 underline">
          Here
        </Link>
      </span>
    </div>
  );
}
