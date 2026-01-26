import { useRouter } from "next/router";
import Navbar from "../Navbar";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const disableNavbarRoutes = ["/auth/login", "/auth/register", "/404"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  return (
    <div className={roboto.className}>
      {/* <div> */}
      {!disableNavbarRoutes.includes(pathname) && <Navbar />}
      <main>{children}</main>
    </div>
  );
}
