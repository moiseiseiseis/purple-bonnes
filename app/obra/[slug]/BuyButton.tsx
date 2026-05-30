"use client";

import { useState } from "react";

export default function BuyButton({ artworkId }: { artworkId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "artwork", id: artworkId }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Error iniciando el pago");
      }

      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || "No se pudo iniciar el pago. Inténtalo de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Redirigiendo…" : "Comprar Obra"}
      </button>
      {error && (
        <p className="text-xs text-red-400 text-center leading-snug">{error}</p>
      )}
    </div>
  );
}
