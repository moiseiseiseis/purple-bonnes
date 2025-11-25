import Link from "next/link";
import Image from "next/image";

interface Props {
  collections: {
    key: string;
    label: string;
    preview: string; // primera imagen
  }[];
}

export default function AudiovisualCollections({ collections }: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-3 mt-12">
      {collections.map((col) => (
        <Link
          key={col.key}
          href={`/audiovisual/${col.key}`}
          className="relative group h-64 rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Imagen de fondo */}
          <Image
            src={col.preview}
            alt={col.label}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />

          {/* Overlay artístico */}
          <div className="absolute inset-0 bg-gradient-to-b from-pb-grape/40 via-pb-purple/40 to-pb-grape/90 mix-blend-multiply" />

          {/* Destellos */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(50%_80%_at_50%_20%,rgba(206,168,240,0.3),transparent_80%)] opacity-70" />

          {/* Texto */}
          <div className="absolute inset-0 flex items-end p-6">
            <h3 className="font-display text-2xl text-white drop-shadow-lg">
              {col.label}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
