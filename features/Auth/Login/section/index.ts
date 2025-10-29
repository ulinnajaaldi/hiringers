import dynamic from "next/dynamic";

export const LoginForm = dynamic(() => import("./login-form"), {
  ssr: false,
});
export const LoginFormPassword = dynamic(
  () => import("./login-form-password"),
  {
    ssr: false,
  },
);
