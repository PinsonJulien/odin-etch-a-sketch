export function getRandomHexColor() {
  return intToHexString(
    Math.floor(Math.random() * (0xffffff + 1))
  );
}

export function adjustColorLighting(color, percentage) {
  if (color[0] === "#") color = color.slice(1);

  const nb = parseInt(color, 16);

  //Between including 00 (0) and FF (255)
  const hexFormat = ((value) => {
    return (
      (value > 255)
      ? 255
      : (value < 0)
        ? 0
        : value
    );
  });

  const red = hexFormat((nb >> 16) + percentage);
  const green = hexFormat((nb & 0x0000FF) + percentage);
  const blue = hexFormat(((nb >> 8) & 0x00FF) + percentage);

  return intToHexString(green | (blue << 8) | (red << 16));
}

export function intToHexString (nb) {
  return (
    '#' + nb.toString(16).padStart(6, '0')
  );
}