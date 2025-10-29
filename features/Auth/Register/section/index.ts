import dynamic from "next/dynamic";

export const RegisterForm = dynamic(() => import("./register-form"), {
  ssr: false,
});
