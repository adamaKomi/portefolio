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
import { cn } from "@/lib/utils";

import {
  contactSchema,
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
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
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
        toast.success("Message envoyé ! Je vous réponds rapidement.");
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
          toast.error(
            "Une erreur est survenue. Réessayez ou écrivez-moi directement."
          );
        } else {
          toast.error("Certains champs nécessitent votre attention.");
        }
        return;
      }

      toast.error(
        "Une erreur est survenue. Réessayez ou écrivez-moi directement."
      );
    } catch {
      toast.error(
        "Réseau indisponible. Réessayez ou écrivez-moi directement par email."
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
        aria-label="Formulaire de contact"
      >
        {/* Nom + Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <FormLabel className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  Nom <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Votre nom"
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
                  Email <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="vous@entreprise.com"
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
                  Société{" "}
                  <span className="text-muted-foreground/50 normal-case tracking-normal">
                    (optionnel)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Acme Inc."
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
                  Budget{" "}
                  <span className="text-muted-foreground/50 normal-case tracking-normal">
                    (optionnel)
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
                      <SelectValue placeholder="Sélectionnez une fourchette" />
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
                        {opt.label}
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
                Message <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Parlez-moi de votre projet, votre besoin, vos contraintes… Plus c'est précis, mieux c'est."
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
                  {field.value.length} / 2000
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
            aria-label="Envoyer le message"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Envoi…</span>
              </>
            ) : submitted ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Message envoyé</span>
              </>
            ) : (
              <>
                <span>Envoyer le message</span>
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
          {"// Réponse sous 24h ouvrées · Vos données ne sont jamais stockées."}
        </p>
      </form>
    </Form>
  );
}
