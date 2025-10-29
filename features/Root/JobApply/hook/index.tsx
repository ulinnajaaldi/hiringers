"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DIALOG_TYPES } from "@/constants/dialog";

import useDialog from "@/hooks/useDialog";
import { toast } from "@/hooks/useToast";

import { useGetProvinces } from "@/useCases/Domicile";
import { useCreateJobApplication } from "@/useCases/JobApplication";
import { useGetJobOpening } from "@/useCases/JobOpening";

interface JobApplyProps {
  queryProvinces: ReturnType<typeof useGetProvinces>;
  queryDetail: ReturnType<typeof useGetJobOpening>;
  mutationAdd: ReturnType<typeof useCreateJobApplication>;
  isLoading: boolean;
  formSchema: z.ZodObject<any>;
  form: ReturnType<typeof useForm<any>>;
  selectedPhoto: File | null;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<File | null>>;
  photoPreview: string | null;
  setPhotoPreview: React.Dispatch<React.SetStateAction<string | null>>;
  handleOpenCamera: () => Promise<void>;
  handlePhotoCapture: (photoDataUrl: string) => void;
  isFieldRequired: (key: string) => boolean;
  isFieldOff: (key: string) => boolean;
  onSubmit: (values: any) => void;
}

const JobApply = createContext<JobApplyProps | undefined>(undefined);

export const JobApplyStore: React.FC<{
  children: React.ReactNode;
  params: { slug: string };
}> = ({ children, params }) => {
  const { slug } = params;
  const router = useRouter();

  const { openDialog, closeDialog } = useDialog();

  const queryProvinces = useGetProvinces();
  const queryDetail = useGetJobOpening(slug);
  const mutationAdd = useCreateJobApplication();

  const isLoading = queryProvinces.isLoading || queryDetail.isLoading;

  const formSchema = useMemo(() => {
    const profileInfo = queryDetail.data?.minimum_profile_information || [];

    const getFieldValidation = (key: string) => {
      const field = profileInfo.find((item: any) => item.key === key);
      return field?.validation;
    };

    const createStringValidation = (key: string, label: string) => {
      const validation = getFieldValidation(key);
      if (validation?.is_off) return z.string().optional();
      if (validation?.required) {
        return z.string().min(1, { message: `${label} is required` });
      }
      return z.string().optional();
    };

    const createLinkedInValidation = () => {
      const validation = getFieldValidation("linkedin_link");
      if (validation?.is_off) return z.string().optional();

      const baseValidation = validation?.required
        ? z.string().min(1, "LinkedIn URL is required")
        : z.string().optional();

      return baseValidation.refine(
        (value) => {
          if (!value) return !validation?.required;
          try {
            const url = new URL(value);
            return (
              url.hostname === "linkedin.com" ||
              url.hostname === "www.linkedin.com" ||
              url.hostname.endsWith(".linkedin.com")
            );
          } catch {
            return false;
          }
        },
        {
          message:
            "Please copy paste your Linkedin URL, example: https://www.linkedin.com/in/username",
        },
      );
    };

    const createFileValidation = () => {
      const validation = getFieldValidation("photo_profile");
      if (validation?.is_off) return z.instanceof(File).optional();
      if (validation?.required) {
        return z.instanceof(File, { message: "Photo profile is required" });
      }
      return z.instanceof(File).optional();
    };

    return z.object({
      photo_profile: createFileValidation(),
      full_name: createStringValidation("full_name", "Fullname"),
      date_of_birth: getFieldValidation("date_of_birth")?.is_off
        ? z.date().optional()
        : getFieldValidation("date_of_birth")?.required
          ? z.date()
          : z.date().optional(),
      gender: createStringValidation("gender", "Gender"),
      domicile: createStringValidation("domicile", "Domicile"),
      phone: getFieldValidation("phone_number")?.is_off
        ? z.string().optional()
        : getFieldValidation("phone_number")?.required
          ? z
              .string()
              .min(1, { message: "Phone number is required" })
              .refine(
                (value) => {
                  return /^\+[1-9]\d{6,14}$/.test(value);
                },
                { message: "Please enter a valid phone number" },
              )
          : z
              .string()
              .optional()
              .refine(
                (value) => {
                  if (!value || value === "") return true;
                  return /^\+[1-9]\d{6,14}$/.test(value);
                },
                { message: "Please enter a valid phone number" },
              ),
      email: getFieldValidation("email")?.is_off
        ? z.string().optional()
        : getFieldValidation("email")?.required
          ? z
              .string()
              .email({
                message:
                  "Please enter your email in the format: name@example.com",
              })
          : z.string().optional(),
      linkedin_link: createLinkedInValidation(),
    });
  }, [queryDetail.data?.minimum_profile_information]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo_profile: undefined,
      full_name: "",
      date_of_birth: new Date(),
      domicile: "",
      gender: "",
      phone: "",
      email: "",
      linkedin_link: "",
    },
  });

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: false,
      });

      stream.getTracks().forEach((track) => track.stop());
      openDialog(DIALOG_TYPES.PHOTO_CAPTURE);
    } catch (error: any) {
      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        toast({
          variant: "destructive",
          title: "Camera Permission Denied",
          description: "Please allow camera access to capture your photo.",
        });
      } else if (error.name === "NotFoundError") {
        toast({
          variant: "destructive",
          title: "No Camera Found",
          description: "Please make sure your device has a camera.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Camera Error",
          description: "Failed to access camera. Please try again.",
        });
      }
    }
  };

  const handlePhotoCapture = (photoDataUrl: string) => {
    fetch(photoDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], `photo-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        setSelectedPhoto(file);
        form.setValue("photo_profile", file);
        setPhotoPreview(photoDataUrl);
        closeDialog();
      })
      .catch((error) => {
        console.error("Error converting photo:", error);
      });
  };

  const isFieldRequired = (key: string) => {
    const profileInfo = queryDetail.data?.minimum_profile_information || [];
    const field = profileInfo.find((item: any) => item.key === key);
    return field?.validation?.required || false;
  };

  const isFieldOff = (key: string) => {
    const profileInfo = queryDetail.data?.minimum_profile_information || [];
    const field = profileInfo.find((item: any) => item.key === key);
    return field?.validation?.is_off || false;
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!queryDetail.data?.id) {
      return;
    }

    mutationAdd.mutate(
      {
        job_opening_id: queryDetail.data.id,
        photo_profile: values.photo_profile,
        full_name: values.full_name,
        date_of_birth: values.date_of_birth
          ? values.date_of_birth.toISOString()
          : undefined,
        gender: values.gender as "female" | "male" | undefined,
        domicile: values.domicile,
        phone: values.phone,
        email: values.email,
        linkedin_link: values.linkedin_link,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      },
    );
  };

  return (
    <JobApply.Provider
      value={{
        queryProvinces,
        queryDetail,
        mutationAdd,
        isLoading,
        formSchema,
        form,
        selectedPhoto,
        setSelectedPhoto,
        photoPreview,
        setPhotoPreview,
        handleOpenCamera,
        handlePhotoCapture,
        isFieldRequired,
        isFieldOff,
        onSubmit,
      }}
    >
      {children}
    </JobApply.Provider>
  );
};

export const useJobApply = () => {
  const context = useContext(JobApply);
  if (context === undefined) {
    throw new Error("useJobApply must be used within a JobApply");
  }
  return context;
};
