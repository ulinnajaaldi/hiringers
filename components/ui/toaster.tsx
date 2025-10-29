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

  const getIcon = (variant?: string | null) => {
    switch (variant) {
      case "success":
        return <CheckCircle2 className="text-success-main h-5 w-5 shrink-0" />;
      case "destructive":
        return <AlertCircle className="text-destructive h-5 w-5 shrink-0" />;
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
          <div className="flex items-center gap-2">
            {getIcon(variant)}
            <div className="flex w-full flex-col gap-1">
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
