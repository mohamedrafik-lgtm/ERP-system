"use client";

import { usePathname } from "next/navigation";
import { StoreProvider } from "@/lip/StoreProvider";
import { Navbar } from "@/components/ui/Navbar";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login";

  return (
    <StoreProvider>
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
    </StoreProvider>
  );
}
