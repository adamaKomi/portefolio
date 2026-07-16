"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Magnetic } from "@/shared/ui/magnetic";
import { useT } from "@/shared/i18n";
import { cn } from "@/lib/utils";

import {
  makeContactSchema,
  budgetOptions,
  type ContactFormValues,
} from "../schemas/contact-schema";

/**
 * Formulaire de contact premium.
 * - Validation client via RHF + zodResolver
 * - Validation serveur via l'API route (source de vérité)
 * - État de chargement, toasts sonner, gestion des erreurs champ par champ
 */
export function ContactForm() {
  const t = useT();
  const [submitted, setSubmitted] = React.useState(false);

  // Schéma Zod localisé : les messages d'erreur sont traduits via i18n.
  // Recalculé uniquement quand `t` change (i.e. quand la locale change).
  const localizedSchema = React.useMemo(
    () =>
      makeContactSchema({
        nameMin: t("contact.err.name"),
        nameMax: t("contact.err.nameMax"),
        email: t("contact.err.email"),
        messageMin: t("contact.err.message"),
        messageMax: t("contact.err.messageMax"),
      }),
    [t],
  );

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(localizedSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
      message: "",
    },
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

      // Succès
      if (res.ok) {
        toast.success(t("contact.success"));
        reset();
        setSubmitted(true);
        // Réautorise un nouvel envoi après un court délai.
        window.setTimeout(() => setSubmitted(false), 4000);
        return;
      }

      // Erreur de validation serveur — on remonte les erreurs sur les champs.
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: Record<string, string>;
        error?: string;
      };

      if (data.errors && typeof data.errors === "object") {
        let hasFieldError = false;
        for (const [key, message] of Object.entries(data.errors)) {
          if (key === "_root") {
            toast.error(message);
          } else if (
            ["name", "email", "company", "budget", "message"].includes(key)
          ) {
            setError(key as keyof ContactFormValues, {
              type: "server",
              message,
            });
            hasFieldError = true;
          }
        }
        if (!hasFieldError) {
          toast.error(t("contact.error"));
        } else {
          toast.error(t("contact.form.toastValidation"));
        }
        return;
      }

      toast.error(t("contact.error"));
    } catch {
      toast.error(t("contact.form.toastNetwork"));
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
        aria-label={t("contact.form.ariaLabel")}
      >
        {/* Nom + Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <FormLabel className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {t("contact.field.name")} <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("contact.field.namePlaceholder")}
                    autoComplete="name"
                    className={cn(
                      "h-11 rounded-xl bg-card/40 border-border",
                      "placeholder:text-muted-foreground/60",
                      "focus:border-primary focus-visible:ring-primary/25 focus-visible:ring-2 focus:shadow-[0_0_0_4px_oklch(0.78_0.17_162/0.08)]",
                      "transition-colors"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <FormLabel className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {t("contact.field.email")} <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder={t("contact.field.emailPlaceholder")}
                    autoComplete="email"
                    className={cn(
                      "h-11 rounded-xl bg-card/40 border-border",
                      "placeholder:text-muted-foreground/60",
                      "focus:border-primary focus-visible:ring-primary/25 focus-visible:ring-2 focus:shadow-[0_0_0_4px_oklch(0.78_0.17_162/0.08)]",
                      "transition-colors"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* Société + Budget */}
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={control}
            name="company"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <FormLabel className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {t("contact.field.company")}{" "}
                  <span className="text-muted-foreground/50 normal-case tracking-normal">
                    ({t("contact.field.companyPlaceholder")})
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("contact.field.companyPlaceholder")}
                    autoComplete="organization"
                    className={cn(
                      "h-11 rounded-xl bg-card/40 border-border",
                      "placeholder:text-muted-foreground/60",
                      "focus:border-primary focus-visible:ring-primary/25 focus-visible:ring-2 focus:shadow-[0_0_0_4px_oklch(0.78_0.17_162/0.08)]",
                      "transition-colors"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="budget"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <FormLabel className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {t("contact.field.budget")}{" "}
                  <span className="text-muted-foreground/50 normal-case tracking-normal">
                    ({t("contact.field.companyPlaceholder")})
                  </span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        "h-11 w-full rounded-xl bg-card/40 border-border",
                        "placeholder:text-muted-foreground/60",
                        "focus:border-primary focus-visible:ring-primary/25 focus-visible:ring-2 focus:shadow-[0_0_0_4px_oklch(0.78_0.17_162/0.08)]",
                        "transition-colors data-[placeholder]:text-muted-foreground/60"
                      )}
                    >
                      <SelectValue placeholder={t("contact.field.budgetPlaceholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    className="rounded-xl border-border bg-popover/95 backdrop-blur-xl"
                    position="popper"
                    sideOffset={6}
                  >
                    {budgetOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="rounded-lg focus:bg-primary/10 focus:text-foreground"
                      >
                        {t(opt.labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* Message */}
        <FormField
          control={control}
          name="message"
          render={({ field }) => (
            <FormItem className="gap-1.5">
              <FormLabel className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                {t("contact.field.message")} <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t("contact.field.messagePlaceholder")}
                  rows={5}
                  className={cn(
                    "min-h-[132px] resize-y rounded-xl bg-card/40 border-border",
                    "placeholder:text-muted-foreground/60",
                    "focus:border-primary focus-visible:ring-primary/25 focus-visible:ring-2 focus:shadow-[0_0_0_4px_oklch(0.78_0.17_162/0.08)]",
                    "transition-colors premium-scroll"
                  )}
                />
              </FormControl>
              <div className="flex items-center justify-between gap-2">
                <FormMessage className="text-xs" />
                <span
                  className={cn(
                    "ml-auto font-mono text-[10px] text-muted-foreground/60 tabular-nums",
                    field.value.length > 2000 && "text-destructive"
                  )}
                  aria-hidden
                >
                  {t("contact.field.messageCount", { n: String(field.value.length) })}
                </span>
              </div>
            </FormItem>
          )}
        />

        {/* Submit */}
        <Magnetic strength={0.2} className="block">
          <Button
            type="submit"
            disabled={isSubmitting || submitted}
            className={cn(
              "group relative h-12 w-full overflow-hidden rounded-xl",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "shadow-glow transition-all",
              "disabled:opacity-80 disabled:shadow-none"
            )}
            aria-label={t("contact.submit")}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{t("contact.sending")}</span>
              </>
            ) : submitted ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>{t("contact.sent")}</span>
              </>
            ) : (
              <>
                <span>{t("contact.submit")}</span>
                <motion.span
                  className="inline-flex"
                  initial={false}
                  whileHover={{ x: 2 }}
                >
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </motion.span>
              </>
            )}
          </Button>
        </Magnetic>

        <p className="text-center font-mono text-[11px] text-muted-foreground/70">
          {t("contact.form.footerDisclaimer")}
        </p>
      </form>
    </Form>
  );
}
