import * as React from "react";
import { cn } from "@/lib/utils";

/** Largeur et marges communes à toutes les sections. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12", className)} {...props} />;
}

/**
 * Tête de rubrique, à la manière d'un journal : filet épais,
 * nom de rubrique à gauche, mention libre à droite.
 */
export function SectionHead({
  label,
  aside,
  className,
}: {
  label: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-6 border-t-2 border-current pt-3 label-caps",
        className
      )}
    >
      <h2>{label}</h2>
      {aside && <span className="text-right opacity-70">{aside}</span>}
    </div>
  );
}
