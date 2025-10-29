import React from "react";

import { Metadata } from "next";

import LoginFeature from "@/features/Auth/Login";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage: React.FC = () => {
  return <LoginFeature />;
};

export default LoginPage;
