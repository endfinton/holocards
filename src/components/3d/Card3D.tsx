"use client";

import { useTexture } from "@react-three/drei";

type Card3DProps = {
  imageUrl: string;
  cardName: string;
  rotation: [number, number, number];
};

export function Card3D({ imageUrl, rotation }: Card3DProps) {
  const texture = useTexture(imageUrl);

  return (
    <mesh rotation={rotation}>
      <boxGeometry args={[2.5, 3.5, 0.04]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
