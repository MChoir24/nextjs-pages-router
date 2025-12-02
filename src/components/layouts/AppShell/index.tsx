import { useRouter } from "next/router";
import Navbar from "../Navbar";

const disableNavbarRoutes = ['/auth/login', '/auth/register', '/404'];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  return (
    <div>
      {!disableNavbarRoutes.includes(pathname) && <Navbar />}
      <main>{children}</main>
    </div>
  );
}