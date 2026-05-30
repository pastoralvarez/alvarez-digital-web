// src/components/ads/AdSlot.tsx
"use client";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "leaderboard" | "skyscraper";
  className?: string;
  label?: boolean;
}

declare global {
  interface Window { adsbygoogle: unknown[] }
}

export function AdSlot({ slot, format = "auto", className, label = true }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (client && typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {}
    }
  }, [client]);

  if (!client) {
    // Development placeholder
    return (
      <div className={cn("ad-placeholder", className)} style={{ minHeight: format === "leaderboard" ? 90 : format === "rectangle" ? 250 : 100 }}>
        <span>Anuncio — {format}</span>
      </div>
    );
  }

  return (
    <div className={cn("text-center", className)}>
      {label && <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Publicidad</p>}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
