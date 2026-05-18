const ALLOWED_IMAGE_HOST = "cards.scryfall.io";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const imageUrl = requestUrl.searchParams.get("url");

  if (!imageUrl) {
    return new Response("Missing image URL", { status: 400 });
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return new Response("Invalid image URL", { status: 400 });
  }

  if (
    parsedUrl.protocol !== "https:" ||
    parsedUrl.hostname !== ALLOWED_IMAGE_HOST
  ) {
    return new Response("Image host not allowed", { status: 400 });
  }

  const response = await fetch(parsedUrl);

  if (!response.ok || !response.body) {
    return new Response("Unable to load image", { status: 502 });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
