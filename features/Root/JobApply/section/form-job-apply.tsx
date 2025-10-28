"use client";

import React from "react";

import { format } from "date-fns";
import { CalendarDays, CircleCheck, Upload } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SearchableSelect } from "@/components/ui/searable-select";

import { cn } from "@/lib/utils";

import { useJobApply } from "../hook";

const FormJobApply = () => {
  const {
    queryProvinces,
    mutationAdd,
    form,
    selectedPhoto,
    photoPreview,
    handleOpenCamera,
    isFieldRequired,
    isFieldOff,
    onSubmit,
  } = useJobApply();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <p className="text-destructive text-s font-bold">* Required</p>

        {!isFieldOff("photo_profile") && (
          <div className="flex flex-col gap-2">
            <p className="text-s text-neutral-90 font-bold">
              Photo Profile
              {isFieldRequired("photo_profile") && (
                <span className="text-destructive">*</span>
              )}
            </p>
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl">
              <Image
                src={photoPreview || "/images/avatar.avif"}
                alt="Photo Profile"
                height={400}
                width={400}
                className="h-full w-full object-cover"
              />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-fit"
              onClick={handleOpenCamera}
            >
              <Upload className="size-4 stroke-2" />
              {selectedPhoto ? "Change Picture" : "Take a Picture"}
            </Button>
            {form.formState.errors.photo_profile && (
              <p className="text-destructive text-sm font-medium">
                {form.formState.errors.photo_profile?.message as string}
              </p>
            )}
          </div>
        )}

        {!isFieldOff("full_name") && (
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required={isFieldRequired("full_name")}>
                  Fullname
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!isFieldOff("date_of_birth") && (
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel required={isFieldRequired("date_of_birth")}>
                  Date of birth
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start border-2 p-2 px-4 text-left leading-5 font-normal shadow-none",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarDays className="h-4 w-4 opacity-50" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto border-transparent bg-transparent p-0 shadow-none"
                    align="start"
                  >
                    <DatePicker
                      selectedDate={field.value}
                      onDateSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!isFieldOff("gender") && (
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel required={isFieldRequired("gender")}>
                  Pronoun (gender)
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex items-center gap-6"
                  >
                    {[
                      ["She/her (Female)", "female"],
                      ["He/him (Male)", "male"],
                    ].map((option, index) => (
                      <FormItem className="flex items-center gap-1" key={index}>
                        <FormControl>
                          <RadioGroupItem value={option[1]} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option[0]}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!isFieldOff("domicile") && (
          <FormField
            control={form.control}
            name="domicile"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel required={isFieldRequired("domicile")}>
                  Domicile
                </FormLabel>
                <FormControl className="w-full">
                  <SearchableSelect
                    options={
                      queryProvinces.data?.value.map(
                        (province) => province.name,
                      ) || []
                    }
                    placeholder="Select your province"
                    onSelect={field.onChange}
                    disabled={queryProvinces.isLoading}
                    hasError={!!fieldState.error}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!isFieldOff("phone_number") && (
          <FormField
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel required={isFieldRequired("phone_number")}>
                  Phone number
                </FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    placeholder="81XXXXXXXXX"
                    {...field}
                    defaultCountry="ID"
                    hasError={!!fieldState.error}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!isFieldOff("email") && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required={isFieldRequired("email")}>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    type="email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!isFieldOff("linkedin_link") && (
          <FormField
            control={form.control}
            name="linkedin_link"
            render={({ field }) => {
              const isValidLinkedInUrl = (() => {
                if (!field.value) return false;
                try {
                  const url = new URL(field.value);
                  return (
                    url.hostname === "linkedin.com" ||
                    url.hostname === "www.linkedin.com" ||
                    url.hostname.endsWith(".linkedin.com")
                  );
                } catch {
                  return false;
                }
              })();

              return (
                <FormItem>
                  <FormLabel required={isFieldRequired("linkedin_link")}>
                    Link Linkedin
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/in/username"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  {isValidLinkedInUrl &&
                    !form.formState.errors.linkedin_link && (
                      <FormDescription className="flex items-center gap-0.5">
                        <CircleCheck className="fill-primary size-5 text-white" />
                        <span className="text-primary text-s">
                          URL address found
                        </span>
                      </FormDescription>
                    )}
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}
        <Button type="submit" disabled={mutationAdd.isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormJobApply;
