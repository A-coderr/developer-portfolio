import Image from "next/image";
import brandIcon from "@/app/brand-icon.svg";

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl bg-background px-6 pb-8 pt-8 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-3 border-t border-border/70 pt-8 font-mono text-xs font-medium uppercase text-muted sm:flex-row sm:items-center sm:justify-between">
        <Image
          src={brandIcon}
          alt="Anzhelika Lab"
          width={180}
          height={61}
          className="h-auto w-32 object-contain"
          unoptimized
        />
        <p>© 2026 Anzhelika Kostyuk</p>
        <p>Kitchener, Canada</p>
      </div>
    </footer>
  );
}
