import React from "react";

import { Check, TriangleAlert } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

import { FormSchemaWithPasswordType } from "../types";

interface RegisterFormProps {
  formWithPassword: UseFormReturn<FormSchemaWithPasswordType>;
  onSubmitWithPassword: (values: FormSchemaWithPasswordType) => void;
  isMobile: boolean;
}

const LoginFormPassword: React.FC<RegisterFormProps> = (props) => {
  const { formWithPassword, onSubmitWithPassword, isMobile } = props;

  return (
    <Form {...formWithPassword} key="password-form">
      <form
        onSubmit={formWithPassword.handleSubmit(onSubmitWithPassword)}
        className="flex w-full flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <FormField
            control={formWithPassword.control}
            name="emailPass"
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
                {formWithPassword.formState.errors.emailPass && (
                  <p className="text-s text-destructive flex items-center gap-1">
                    <TriangleAlert className="size-4" />
                    {formWithPassword.formState.errors.emailPass.message}
                  </p>
                )}
                {!formWithPassword.formState.errors.emailPass &&
                  field.value && (
                    <p className="text-s text-success-main flex items-center gap-1">
                      <Check className="size-4" />
                      Alamat email teridentikasi
                    </p>
                  )}
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={formWithPassword.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="secondary" size={isMobile ? "default" : "lg"}>
          Masuk
        </Button>
      </form>
    </Form>
  );
};

export default LoginFormPassword;
