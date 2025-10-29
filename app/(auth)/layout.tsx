import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-[#FAFAFA]">
      {children}
    </main>
  );
};

export default AuthLayout;
