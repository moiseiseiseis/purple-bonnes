"use client";

import Image from "next/image";
import { useState, useRef, MouseEvent, TouchEvent } from "react";

export default function ZoomImage({
  src,
  alt,
  className = "object-contain",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [zoomed, setZoomed] = useState(false);
  // Guardamos la posición X e Y en porcentajes para el punto focal
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Maneja el clic inicial para hacer zoom o quitarlo
  const handleZoom = (e: MouseEvent<HTMLDivElement>) => {
    if (!zoomed && containerRef.current) {
      // Si vamos a hacer zoom, centramos la lupa donde el usuario hizo clic
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setPosition({ x, y });
    } else {
      // Al quitar el zoom, regresamos el foco al centro
      setPosition({ x: 50, y: 50 });
    }
    setZoomed(!zoomed);
  };

  // Permite explorar la imagen moviendo el mouse (Escritorio)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!zoomed || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  // Permite explorar la imagen arrastrando el dedo (Móviles/Tablets)
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!zoomed || !containerRef.current) return;
    const touch = e.touches[0];
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - left) / width) * 100;
    const y = ((touch.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden flex items-center justify-center ${
        zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
      }`}
      onClick={handleZoom}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      // Bloquea el scroll natural de la página en móviles mientras exploras la imagen
      style={{ touchAction: zoomed ? "none" : "auto" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width:768px) 100vw, 60vw"
        // La animación de transición solo aplica a la escala para que el paneo no se sienta con lag
        className={`${className} transition-transform duration-300 ease-out`}
        style={{
          // Aumentamos el zoom a 2.5 para que los detalles se aprecien mejor
          transform: zoomed ? "scale(2.5)" : "scale(1)",
          // El punto de origen del zoom se actualiza con el mouse
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  );
}