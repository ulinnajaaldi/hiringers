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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FormSchemaType } from "../types";

interface LoginFormProps {
  form: UseFormReturn<FormSchemaType>;
  onSubmit: (values: FormSchemaType) => void;
  isMobile: boolean;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { form, onSubmit, isMobile } = props;

  return (
    <Form {...form} key="email-form">
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
                {!form.formState.errors.email && field.value && (
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
          Kirim link
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
