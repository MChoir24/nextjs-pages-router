import Link from "next/link";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
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
