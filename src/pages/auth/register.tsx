import Link from "next/link";
import Button from "@/components/elements/Button";
import { useRouter } from "next/router";
import RegisterView from "@/components/views/Auth/Register";

export default function RegisterPage() {
  const { push } = useRouter();
  const handleRegister = () => {
    push("/");
  };

  return (
    <>
      <RegisterView />
    </>
  );
}
