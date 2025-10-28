"use client";

import React from "react";

import { z } from "zod";

import { DIALOG_TYPES } from "@/constants/dialog";
import { JOB_TYPE, PROFILE_INFORMATION_FIELDS } from "@/constants/variables";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import useDialog from "@/hooks/useDialog";

import { formatNumber, parseFormattedNumber } from "@/lib/number";
import { cn } from "@/lib/utils";

import { useJobOpening } from "../hook";
import { formSchema } from "../types";

const FormAdd: React.FC = () => {
  const { closeDialog, type } = useDialog();

  const { isDraft, mutationAdd, setIsDraft, form, onSubmit } = useJobOpening();

  return (
    <Dialog open={type === DIALOG_TYPES.CREATE_JOB} onOpenChange={closeDialog}>
      <DialogContent className="w-full sm:max-w-3xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Job Opening</DialogTitle>
              <DialogDescription className="sr-only">
                Fill in the form below to create a new job opening.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className={cn("h-[70svh] w-full")}>
              <div className="relative flex w-full flex-col gap-4 px-6 py-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Job Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex. Front End Engineer"
                          type="text"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Job Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {JOB_TYPE.map((job) => (
                            <SelectItem key={job.value} value={job.value}>
                              {job.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ex."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="number_candidate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Number of Candidate Needed</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex. 2"
                          type="text"
                          {...field}
                          min={0}
                          value={field.value ? formatNumber(field.value) : ""}
                          onChange={(e) => {
                            const parsed = parseFormattedNumber(e.target.value);
                            field.onChange(parsed);
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator dashed />

                <div className="mt-2 flex flex-col gap-4">
                  <p className="text-neutral-90 text-s">Job Salary</p>
                  <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
                    <FormField
                      control={form.control}
                      name="min_salary"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Minimum Estimated Salary</FormLabel>
                          <FormControl>
                            <InputGroup>
                              <InputGroupInput
                                placeholder="7.000.000"
                                type="text"
                                value={
                                  field.value ? formatNumber(field.value) : ""
                                }
                                onChange={(e) => {
                                  const parsed = parseFormattedNumber(
                                    e.target.value,
                                  );
                                  field.onChange(parsed);
                                }}
                                className="pl-1!"
                              />
                              <InputGroupAddon>
                                <p className="text-m text-neutral-90 font-bold">
                                  Rp
                                </p>
                              </InputGroupAddon>
                            </InputGroup>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Separator className="mt-4 hidden max-w-4 md:block" />
                    <FormField
                      control={form.control}
                      name="max_salary"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Maximum Estimated Salary</FormLabel>
                          <FormControl>
                            <InputGroup>
                              <InputGroupInput
                                placeholder="8.000.000"
                                type="text"
                                value={
                                  field.value ? formatNumber(field.value) : ""
                                }
                                onChange={(e) => {
                                  const parsed = parseFormattedNumber(
                                    e.target.value,
                                  );
                                  field.onChange(parsed);
                                }}
                                className="pl-1!"
                              />
                              <InputGroupAddon>
                                <p className="text-m text-neutral-90 font-bold">
                                  Rp
                                </p>
                              </InputGroupAddon>
                            </InputGroup>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-neutral-30 flex flex-col gap-2 rounded-xl border p-4 md:gap-4">
                  <p className="text-neutral-90 text-m font-bold">
                    Minimum Profile Information Required
                  </p>
                  <div className="flex flex-col gap-1 p-2">
                    {PROFILE_INFORMATION_FIELDS.map((field, index) => {
                      const fieldNameMap: Record<string, string> = {
                        "Full Name": "minimum_profile_information.full_name",
                        "Photo Profile":
                          "minimum_profile_information.photo_profile",
                        Gender: "minimum_profile_information.gender",
                        Domicile: "minimum_profile_information.domicile",
                        Email: "minimum_profile_information.email",
                        "Phone number":
                          "minimum_profile_information.phone_number",
                        "Linkedin link":
                          "minimum_profile_information.linkedin_link",
                        "Date of birth":
                          "minimum_profile_information.date_of_birth",
                      };

                      const fieldName = fieldNameMap[
                        field.title
                      ] as `minimum_profile_information.${keyof z.infer<typeof formSchema>["minimum_profile_information"]}`;

                      return (
                        <FormField
                          key={field.title}
                          control={form.control}
                          name={fieldName}
                          render={({ field: formField }) => (
                            <FormItem>
                              <div
                                className={cn(
                                  "flex flex-col justify-between gap-4 p-2 md:flex-row md:items-center",
                                  index <
                                    PROFILE_INFORMATION_FIELDS.length - 1 &&
                                    "border-neutral-40 border-b pb-4",
                                )}
                              >
                                <p className="text-neutral-90 text-m">
                                  {field.title}
                                </p>
                                <FormControl>
                                  <ToggleGroup
                                    spacing={2}
                                    type="single"
                                    variant="outline"
                                    value={formField.value as string}
                                    onValueChange={formField.onChange}
                                  >
                                    <ToggleGroupItem
                                      value="mandatory"
                                      disabled={
                                        field.fields.mandatory === "disabled"
                                      }
                                    >
                                      Mandatory
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                      value="optional"
                                      disabled={
                                        field.fields.optional === "disabled"
                                      }
                                    >
                                      Optional
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                      value="off"
                                      disabled={field.fields.off === "disabled"}
                                    >
                                      Off
                                    </ToggleGroupItem>
                                  </ToggleGroup>
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Label htmlFor="is-draft">Make it Draft</Label>
                  <Switch
                    id="is-draft"
                    checked={isDraft}
                    onCheckedChange={(checked) => setIsDraft(checked)}
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid ||
                  form.formState.isSubmitting ||
                  mutationAdd.isPending
                }
              >
                Publish Job
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormAdd;
