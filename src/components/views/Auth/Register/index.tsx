import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import { Input } from "@/components/elements/Input";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RegisterView() {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const handleRegister = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
      email: form.email.value,
      name: form.name.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status) {
        event.target.reset();
        setIsLoading(false);
        push("/api/auth/signin");
      } else {
        setIsLoading(false);
        alert(data.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Register Page</h1>
      <div className="w-full max-w-sm border border-gray-300 p-6 bg-white rounded shadow-md mb-4 flex flex-col">
        <form className="" onSubmit={handleRegister}>
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
            placeholder="Confirm Password"
            name="confirmPassword"
            className="mb-4"
            required
          />
        </form>
        <PrimaryButton type="submit">Register</PrimaryButton>
        <span className="mt-4 text-center">
          Already have an account? Login{" "}
          <Link href={"/auth/login"} className="text-blue-600 underline">
            Here
          </Link>
        </span>
      </div>
    </div>
  );
}
