import dynamic from "next/dynamic";

export const FormAdd = dynamic(() => import("./form-add"), {
  ssr: false,
});
