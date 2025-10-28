"use client";

import { AlertCircle, CheckCircle2, Info } from "lucide-react";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

import { useToast } from "@/hooks/useToast";

export function Toaster() {
  const { toasts } = useToast();

  const getIcon = (variant?: string) => {
    switch (variant) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-500" />;
      case "destructive":
        return <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />;
      case "info":
        return <Info className="h-5 w-5 shrink-0 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <Toast key={id} variant={variant as any} {...props}>
          <div className="flex items-center gap-3">
            {getIcon(variant)}
            <div className="flex flex-col gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
