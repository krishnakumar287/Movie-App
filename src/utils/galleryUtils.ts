export function calculateGalleryDimensions(isScreenSizeSm: boolean, faceCount: number) {
  // Increased cylinder width for better spacing
  const cylinderWidth = isScreenSizeSm ? 2000 : 3000;
  const faceWidth = (cylinderWidth / faceCount) * 1.8; // Increased multiplier for wider spacing
  const radius = cylinderWidth / (2 * Math.PI);

  return {
    cylinderWidth,
    faceWidth,
    radius,
  };
}