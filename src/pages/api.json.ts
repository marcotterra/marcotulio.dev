export async function get({ params, request }) {
  const response = await fetch(
    "https://docs.astro.build/assets/full-logo-light.png"
  );
  const buffer = Buffer.from(await response.arrayBuffer());
  return {
    body: buffer,
    encoding: "binary",
  };
}
