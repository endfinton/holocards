export function toCardTextureUrl(imageUrl: string): string {
  return `/api/card-image?url=${encodeURIComponent(imageUrl)}`;
}
