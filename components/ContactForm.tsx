"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const tituloObra = searchParams.get("titulo") ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const defaultMessage = tituloObra
    ? `Hola, me interesa la obra "${tituloObra}". Me gustaría saber más detalles sobre disponibilidad y precio.`
    : "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
          obra: tituloObra || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al enviar");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "No se pudo enviar el mensaje. Inténtalo de nuevo.");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-8 max-w-xl text-center space-y-3">
        <p className="font-display text-2xl text-pb-lilac">¡Mensaje enviado!</p>
        <p className="text-pb-lavender/80 text-sm">
          Te responderemos a la brevedad. Revisa tu bandeja de entrada.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 grid gap-4 max-w-xl">
      {tituloObra && (
        <p className="text-sm text-pb-lavender/80 bg-pb-purple/20 border border-pb-purple/40 rounded-xl px-4 py-2">
          Consultando sobre:{" "}
          <strong className="text-pb-lilac">{tituloObra}</strong>
        </p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          className="input w-full"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="input w-full"
          placeholder="tucorreo@dominio.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          defaultValue={defaultMessage}
          className="input w-full"
          placeholder="Cuéntanos..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary"
      >
        {status === "loading" ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
