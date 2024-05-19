export default function generateColorFromText(text: string) {
  let hash = 0;

  // Convert the input text to a unique hash value
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate a color value based on the hash value
  let hue = (hash % 360) / 360; // Calculate hue from the hash value
  let saturation = 0.8; // Increase saturation to 80%
  let lightness = 0.6; // Increase lightness to 60%

  const color = `hsl(${hue * 360}, ${saturation * 100}%, ${lightness * 100}%)`;

  return color;
}