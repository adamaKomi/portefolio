import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fr } from "@/shared/i18n/messages/fr";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 text-center">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="font-display text-4xl tracking-tight md:text-5xl">{fr["notFound.title"]}</h1>
      <p className="max-w-sm text-muted-foreground">{fr["notFound.message"]}</p>
      <Button asChild size="lg" className="mt-3">
        <Link href="/">{fr["notFound.backHome"]}</Link>
      </Button>
    </main>
  );
}
