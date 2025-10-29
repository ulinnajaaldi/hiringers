"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { VALID_EMAIL } from "@/constants/config";

import ValidRegister from "@/components/common/valid-register";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { toast } from "@/hooks/useToast";

import { RegisterForm } from "./section";
import { formSchema, FormSchemaType } from "./types";

const RegisterFeature: React.FC = () => {
  const [isValid, setIsValid] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const isMobile = useMediaQuery("(max-width: 1024px)");

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    if (values.email === VALID_EMAIL) {
      setIsValid(true);
    } else {
      setIsValid(false);
      setIsSubmited(true);
    }
  };

  const onSubmitGoogle = () => {
    toast({
      variant: "info",
      title: "Should be implemented google login",
    });
  };

  return (
    <div className="flex w-full flex-col gap-6 px-4 md:w-[500px] md:px-0">
      <div className="relative h-[50px] w-auto">
        <Image
          src="/images/rakamin-logo-full.png"
          alt="Rakamin Logo"
          width={240}
          height={240}
          className="h-auto w-auto object-contain"
        />
      </div>
      <div
        id="container"
        className="bg-neutral-10 flex flex-col gap-3 p-6 md:gap-4 md:p-10"
      >
        {isSubmited ? (
          <ValidRegister email={form.getValues("email")} />
        ) : (
          <RegisterForm
            form={form}
            isValid={isValid}
            onSubmit={onSubmit}
            onSubmitGoogle={onSubmitGoogle}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterFeature;
