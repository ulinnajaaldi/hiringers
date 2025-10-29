import React from "react";

import { Check, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";

import IcGoogle from "@/components/common/ic-google";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { FormSchemaType } from "../types";

interface RegisterFormProps {
  isValid: boolean;
  form: UseFormReturn<FormSchemaType>;
  onSubmit: (values: FormSchemaType) => void;
  onSubmitGoogle: () => void;
  isMobile: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { isValid, form, onSubmit, onSubmitGoogle, isMobile } = props;

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-neutral-90 text-l font-bold md:text-xl">
          Bergabung dengan Rakamin
        </h1>
        <p className="text-s md:text-m text-neutral-90">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="text-primary">
            Masuk
          </Link>
        </p>
      </div>

      {isValid && (
        <div className="text-destructive bg-danger-surface border-danger-border text-s flex items-center justify-center rounded-[4px] border px-2 py-0.5 text-center">
          <p>
            Email ini sudah terdaftar sebagai akun di Rakamin Academy.{" "}
            <Link href="/auth/login" className="font-bold">
              Masuk
            </Link>
          </p>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukan alamat email"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.email && (
                    <p className="text-s text-destructive flex items-center gap-1">
                      <TriangleAlert className="size-4" />
                      {form.formState.errors.email.message}
                    </p>
                  )}
                  {form.formState.isValid && (
                    <p className="text-s text-success-main flex items-center gap-1">
                      <Check className="size-4" />
                      Alamat email teridentikasi
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>
          <Button variant="secondary" size={isMobile ? "default" : "lg"}>
            Daftar dengan email
          </Button>
        </form>
      </Form>

      <div className="flex w-full items-center justify-between gap-3">
        <Separator className="flex-1" />
        <span className="text-s text-neutral-60">or</span>
        <Separator className="flex-1" />
      </div>
      <Button
        size={isMobile ? "default" : "lg"}
        variant="outline"
        className="flex items-center gap-2.5"
        onClick={onSubmitGoogle}
      >
        <IcGoogle className="size-6" />
        <span className="hidden md:inline-block">Daftar dengan Google</span>
      </Button>
    </>
  );
};

export default RegisterForm;
