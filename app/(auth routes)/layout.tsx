'use client'
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <div>
      {children} 
    </div>
  );
}
