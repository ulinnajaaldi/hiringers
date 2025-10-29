import React from "react";

import { Metadata } from "next";

import RegisterFeature from "@/features/Auth/Register";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage: React.FC = () => {
  return <RegisterFeature />;
};

export default RegisterPage;
