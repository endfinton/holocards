"use client";

import { useTexture } from "@react-three/drei";
import type { Texture } from "three";

type Card3DProps = {
  imageUrl: string;
  cardName: string;
  rotation: [number, number, number];
  rarity: string;
};

const foilRarities = new Set(["rare", "mythic"]);

export function Card3D({
  imageUrl,
  rotation,
  rarity,
}: Card3DProps) {
  const texture = useTexture(imageUrl);
  const hasFoil = foilRarities.has(rarity);

  return (
    <mesh rotation={rotation}>
      <boxGeometry args={[2.5, 3.5, 0.04]} />
      {hasFoil ? (
        <FoilMaterial texture={texture} />
      ) : (
        <meshStandardMaterial map={texture} />
      )}
    </mesh>
  );
}

type FoilMaterialProps = {
  texture: Texture;
};

function FoilMaterial({ texture }: FoilMaterialProps) {
  return (
    <shaderMaterial
      uniforms={{
        uTexture: { value: texture },
      }}
      vertexShader={`
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDirection;

        void main() {
          vUv = uv;
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewDirection = normalize(cameraPosition - worldPosition.xyz);
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `}
      fragmentShader={`
        uniform sampler2D uTexture;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDirection;

        vec3 rainbow(float t) {
          return vec3(
            0.5 + 0.5 * sin(6.28318 * (t + 0.0)),
            0.5 + 0.5 * sin(6.28318 * (t + 0.33)),
            0.5 + 0.5 * sin(6.28318 * (t + 0.66))
          );
        }

        void main() {
          vec4 baseColor = texture2D(uTexture, vUv);
          float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDirection)), 0.0), 0.1);
          vec3 foilColor = rainbow(vUv.x + vUv.y + fresnel * 0.35);
          vec3 finalColor = mix(baseColor.rgb, baseColor.rgb + foilColor * 0.35, fresnel * 0.8);
          gl_FragColor = vec4(finalColor, baseColor.a);
        }
      `}
    />
  );
}
