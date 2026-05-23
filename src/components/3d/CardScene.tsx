"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";

import { Card3D } from "@/components/3d/Card3D";
import { toCardTextureUrl } from "@/lib/card-image";

type CardSceneProps = {
  imageUrl: string | null;
  cardName: string;
  rarity: string;
};

export function CardScene({
  imageUrl,
  cardName,
  rarity,
}: CardSceneProps) {
  const [rotation, setRotation] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [cameraZ, setCameraZ] = useState(6);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  if (!imageUrl) {
    return <p>No se pudo cargar la imagen de la carta.</p>;
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(true);
    dragStart.current = { x: event.clientX, y: event.clientY };
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging || !dragStart.current) {
      return;
    }

    const deltaX = event.clientX - dragStart.current.x;
    const deltaY = event.clientY - dragStart.current.y;

    setRotation(([x, y, z]) => [x + deltaY * 0.01, y + deltaX * 0.01, z]);
    dragStart.current = { x: event.clientX, y: event.clientY };
  }

  function stopDragging() {
    setIsDragging(false);
    dragStart.current = null;
  }

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    setCameraZ((current) =>
      Math.min(6, Math.max(2.5, current + event.deltaY * 0.002)),
    );
  }

  return (
    <div
      className="h-full w-full"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerLeave={stopDragging}
      onWheel={handleWheel}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={45} />
        <ambientLight intensity={1.8} />
        <directionalLight position={[2, 2, 4]} intensity={2} />
        <Suspense fallback={null}>
          <Card3D
            imageUrl={toCardTextureUrl(imageUrl)}
            cardName={cardName}
            rotation={rotation}
            rarity={rarity}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
