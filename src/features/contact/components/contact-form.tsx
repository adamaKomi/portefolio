"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useT } from "@/shared/i18n";
import { cn } from "@/lib/utils";

import { makeContactSchema, type ContactFormValues } from "../schemas/contact-schema";

const FIELDS = ["name", "email", "message"] as const;

// Champs « à remplir » : un simple filet, comme sur un formulaire imprimé.
const fieldClass =
  "rounded-none border-0 border-b border-input bg-transparent px-0 text-base shadow-none focus-visible:border-primary focus-visible:ring-0 dark:bg-transparent";
const labelClass = "label-caps";

/**
 * Formulaire de contact.
 * - Validation client via RHF + zodResolver
 * - Validation serveur via l'API route (source de vérité)
 */
export function ContactForm({ className }: { className?: string }) {
  const t = useT();

  // Schéma localisé : recalculé quand la langue change.
  const localizedSchema = React.useMemo(
    () =>
      makeContactSchema({
        nameMin: t("contact.err.name"),
        nameMax: t("contact.err.nameMax"),
        email: t("contact.err.email"),
        messageMin: t("contact.err.message"),
        messageMax: t("contact.err.messageMax"),
      }),
    [t]
  );

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(localizedSchema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ContactFormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success(t("contact.success"));
        reset();
        return;
      }

      // Erreurs de validation serveur : on les remonte sur les champs.
      const data = (await res.json().catch(() => ({}))) as {
        errors?: Record<string, string>;
      };

      let hasFieldError = false;
      for (const [key, message] of Object.entries(data.errors ?? {})) {
        if ((FIELDS as readonly string[]).includes(key)) {
          setError(key as (typeof FIELDS)[number], { type: "server", message });
          hasFieldError = true;
        } else if (key === "_root") {
          toast.error(message);
          return;
        }
      }
      toast.error(hasFieldError ? t("contact.form.toastValidation") : t("contact.error"));
    } catch {
      toast.error(t("contact.form.toastNetwork"));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn("flex flex-col gap-7", className)}>
        <div className="grid gap-7 sm:grid-cols-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>{t("contact.field.name")}</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="name" className={cn(fieldClass, "h-11")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>{t("contact.field.email")}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" autoComplete="email" className={cn(fieldClass, "h-11")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>{t("contact.field.message")}</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} className={cn(fieldClass, "min-h-32 resize-y")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2 self-start rounded-none px-8">
          {isSubmitting && <Loader2 className="animate-spin" />}
          {isSubmitting ? t("contact.sending") : t("contact.submit")}
        </Button>
      </form>
    </Form>
  );
}
