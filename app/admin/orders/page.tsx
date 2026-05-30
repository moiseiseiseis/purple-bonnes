import { prisma } from "@/lib/prisma";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-pb-lilac">
          Órdenes de Compra
        </h1>
        <div className="bg-neutral-900 border border-neutral-800 px-4 py-1.5 rounded-full text-sm text-pb-lavender">
          Total: {orders.length}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900/30 rounded-xl border border-dashed border-neutral-700">
          <p className="text-pb-lavender/60 text-lg">Aún no hay órdenes registradas.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => {
            // Stripe guarda la dirección como un objeto JSON
            const address = order.shippingAddress as any;

            return (
              <div
                key={order.id}
                className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl shadow-lg flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Etiqueta superior */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-pb-lavender/60 font-mono">
                      {new Intl.DateTimeFormat("es-MX", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(order.createdAt))}
                    </p>
                    <h2 className="text-lg font-bold text-white mt-1">
                      {new Intl.NumberFormat("es-MX", {
                        style: "currency",
                        currency: order.currency.toUpperCase(),
                      }).format(order.amount / 100)}
                    </h2>
                  </div>
                  <span className="bg-purple-900/30 text-purple-300 border border-purple-800/50 text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                    {order.productType}
                  </span>
                </div>

                <hr className="border-neutral-800" />

                {/* Datos del Cliente */}
                <div className="text-sm space-y-2">
                  <p>
                    <strong className="text-pb-lilac">Cliente:</strong>{" "}
                    <span className="text-pb-lavender">{order.customerName || "N/A"}</span>
                  </p>
                  <p>
                    <strong className="text-pb-lilac">Email:</strong>{" "}
                    <span className="text-pb-lavender">{order.customerEmail || "N/A"}</span>
                  </p>
                  {order.phone && (
                    <p>
                      <strong className="text-pb-lilac">Teléfono:</strong>{" "}
                      <span className="text-pb-lavender">{order.phone}</span>
                    </p>
                  )}
                </div>

                {/* Dirección de Envío */}
                {address && (
                  <div className="bg-neutral-950 p-3 rounded-md border border-neutral-800 text-xs text-pb-lavender/80">
                    <strong className="text-pb-lilac block mb-1">Dirección de envío:</strong>
                    <p>{address.line1} {address.line2}</p>
                    <p>
                      {address.city}, {address.state} {address.postal_code}
                    </p>
                    <p>{address.country}</p>
                  </div>
                )}

                {/* Datos técnicos ocultos en un bloque más discreto */}
                <div className="mt-auto pt-4 text-xs text-neutral-500 font-mono space-y-1">
                  <p className="truncate" title={order.productId}>
                    PID: {order.productId}
                  </p>
                  <p className="truncate" title={order.stripeSessionId}>
                    Stripe: {order.stripeSessionId}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}