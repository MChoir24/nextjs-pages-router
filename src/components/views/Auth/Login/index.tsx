import { useRouter } from "next/router";
import { Button } from "@/components/elements/Button";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/elements/Input";
import { signIn } from "next-auth/react";

export default function LoginViews() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { push, query } = useRouter();
  const callbackUrl = (query.callbackUrl as string) || "/";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (event: any) => {
    event.preventDefault();
    setError(null);
    const form = event.target;
    const formData = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl: callbackUrl,
      });
      console.log(res);
      if (res && !res.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Invalid email or password");
      }
    } catch (error) {
      setIsLoading(false);
      alert(`Error logging in: ${error}`);
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Login Page</h1>
      <div className="w-full max-w-sm border border-gray-300 p-6 bg-white rounded shadow-md mb-4 flex flex-col">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
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
          <Button
            type="submit"
            className="display-block w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <span className="mt-4 text-center">
          Don&apos;t have an account? Register{" "}
          <Link href={"/auth/register"} className="text-blue-600 underline">
            Here
          </Link>
        </span>
      </div>
    </div>
  );
}
