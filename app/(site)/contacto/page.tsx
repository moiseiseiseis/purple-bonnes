import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "Contacto — Purple Bonnes" };

export default function ContactoPage() {
  return (
    <div className="container py-10">
      <SectionHeader title="Contacto" subtitle="Consultas, prensa y adquisiciones" />
      <form className="card p-6 grid gap-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input className="mt-1 w-full rounded-xl border p-2" placeholder="Tu nombre" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full rounded-xl border p-2" placeholder="tucorreo@dominio.com" />
        </div>
        <div>
          <label className="block text-sm font-medium">Mensaje</label>
          <textarea className="mt-1 w-full rounded-xl border p-2" rows={5} placeholder="Cuéntanos..."></textarea>
        </div>
        <button type="button" className="btn-primary">Enviar (próximamente)</button>
      </form>
    </div>
  );
}
