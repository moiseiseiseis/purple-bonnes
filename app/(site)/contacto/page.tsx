import { Suspense } from "react";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contacto — Purple Bonnes" };

export default function ContactoPage() {
  return (
    <div className="container py-10">
      <SectionHeader title="Contacto" subtitle="Consultas, prensa y adquisiciones" />
      {/* Suspense requerido por useSearchParams en ContactForm */}
      <Suspense
        fallback={
          <div className="card p-6 max-w-xl animate-pulse h-64 opacity-40" />
        }
      >
        <ContactForm />
      </Suspense>
    </div>
  );
}
