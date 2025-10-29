"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { VALID_EMAIL, VALID_PASSWORD } from "@/constants/config";

import IcGoogle from "@/components/common/ic-google";
import ValidRegister from "@/components/common/valid-register";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { toast } from "@/hooks/useToast";

import { LoginForm, LoginFormPassword } from "./section";
import {
  formSchema,
  FormSchemaType,
  formSchemaWithPassword,
  FormSchemaWithPasswordType,
} from "./types";

const LoginFeature: React.FC = () => {
  const [isValid, setIsValid] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isWithPassword, setIsWithPassword] = useState(false);

  const isMobile = useMediaQuery("(max-width: 1024px)");

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  const formWithPassword = useForm<FormSchemaWithPasswordType>({
    resolver: zodResolver(formSchemaWithPassword),
    mode: "all",
    defaultValues: {
      emailPass: "",
      password: "",
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    if (values.email === VALID_EMAIL) {
      setIsValid(false);
      setIsSubmited(true);
    } else {
      setIsValid(true);
    }
  };

  const onSubmitWithPassword = (values: FormSchemaWithPasswordType) => {
    if (
      values.emailPass === VALID_EMAIL &&
      values.password === VALID_PASSWORD
    ) {
      setIsValid(false);
      setIsSubmited(true);
    } else {
      setIsValid(true);
    }
  };

  const handleSwitchToPasswordForm = () => {
    setIsWithPassword(true);
    setIsValid(false);
    formWithPassword.reset({
      emailPass: "",
      password: "",
    });
  };

  const handleSwitchToEmailForm = () => {
    setIsWithPassword(false);
    setIsValid(false);
    form.reset({
      email: "",
    });
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
          <ValidRegister
            email={
              isWithPassword
                ? formWithPassword.getValues("emailPass")
                : form.getValues("email")
            }
          />
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <h1 className="text-neutral-90 text-l font-bold md:text-xl">
                Bergabung dengan Rakamin
              </h1>
              <p className="text-s md:text-m text-neutral-90">
                Sudah punya akun?{" "}
                <Link href="/auth/register" className="text-primary">
                  Daftar menggunakan email
                </Link>
              </p>
            </div>

            {isValid && (
              <div className="text-destructive bg-danger-surface border-danger-border text-s flex items-center justify-center rounded-[4px] border px-2 py-0.5 text-center">
                <p>
                  Email ini belum terdaftar sebagai akun di Rakamin Academy.{" "}
                  <Link href="/auth/register" className="font-bold">
                    Daftar
                  </Link>
                </p>
              </div>
            )}

            {isWithPassword ? (
              <LoginFormPassword
                formWithPassword={formWithPassword}
                onSubmitWithPassword={onSubmitWithPassword}
                isMobile={isMobile}
              />
            ) : (
              <LoginForm form={form} onSubmit={onSubmit} isMobile={isMobile} />
            )}

            <div className="flex w-full items-center justify-between gap-3">
              <Separator className="flex-1" />
              <span className="text-s text-neutral-60">or</span>
              <Separator className="flex-1" />
            </div>

            {isWithPassword ? (
              <Button
                size={isMobile ? "default" : "lg"}
                variant="outline"
                className="flex items-center gap-2.5"
                onClick={handleSwitchToEmailForm}
              >
                <KeyRound className="size-5 md:size-6" />
                <span className="hidden md:inline-block">
                  Kirim link login melalui email
                </span>
              </Button>
            ) : (
              <Button
                size={isMobile ? "default" : "lg"}
                variant="outline"
                className="flex items-center gap-2.5"
                onClick={handleSwitchToPasswordForm}
              >
                <KeyRound className="size-5 md:size-6" />
                <span className="hidden md:inline-block">
                  Masuk dengan kata sandi
                </span>
              </Button>
            )}
            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className="flex items-center gap-2.5"
              onClick={onSubmitGoogle}
            >
              <IcGoogle className="size-5 md:size-6" />
              <span className="hidden md:inline-block">
                Daftar dengan Google
              </span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginFeature;
