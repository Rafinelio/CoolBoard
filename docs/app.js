const field = document.querySelector("[data-pixel-field]");
const hero = document.querySelector(".hero");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (field && hero) {
  let pixels = [];
  let columns = 0;
  let rows = 0;

  const numberVariable = (name, fallback) => {
    const value = Number.parseInt(getComputedStyle(field).getPropertyValue(name), 10);
    return Number.isFinite(value) ? value : fallback;
  };

  const isSeed = (index) => {
    return index % 37 === 0 || index % 71 === 13 || index % 113 === 42;
  };

  const buildPixels = () => {
    const nextColumns = numberVariable("--pixel-columns", 96);
    const nextRows = numberVariable("--pixel-rows", 44);
    if (nextColumns === columns && nextRows === rows && pixels.length > 0) {
      return;
    }

    columns = nextColumns;
    rows = nextRows;
    field.replaceChildren();
    pixels = [];

    for (let index = 0; index < columns * rows; index += 1) {
      const pixel = document.createElement("span");
      pixel.className = isSeed(index) ? "pixel is-seed" : "pixel";
      field.appendChild(pixel);
      pixels.push(pixel);
    }
  };

  const clearPixels = () => {
    pixels.forEach((pixel) => pixel.classList.remove("is-lit"));
  };

  const lightPixels = (event) => {
    const fieldRect = field.getBoundingClientRect();
    const fieldStyle = getComputedStyle(field);
    const pixelSize = numberVariable("--pixel-size", 4);
    const pixelGap = Number.parseFloat(fieldStyle.gap) || numberVariable("--pixel-gap", 6);
    const gridWidth = columns * pixelSize + Math.max(0, columns - 1) * pixelGap;
    const gridHeight = rows * pixelSize + Math.max(0, rows - 1) * pixelGap;
    const startX = fieldRect.width - gridWidth;
    const startY = (fieldRect.height - gridHeight) / 2;
    const x = event.clientX - fieldRect.left;
    const y = event.clientY - fieldRect.top;
    const radius = Math.min(70, Math.max(46, fieldRect.width / 16));

    pixels.forEach((pixel, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const px = startX + column * (pixelSize + pixelGap) + pixelSize / 2;
      const py = startY + row * (pixelSize + pixelGap) + pixelSize / 2;
      const distance = Math.hypot(px - x, py - y);
      pixel.classList.toggle("is-lit", distance < radius);
    });
  };

  buildPixels();

  if (!reducedMotion) {
    hero.addEventListener("pointermove", lightPixels);
    hero.addEventListener("pointerleave", clearPixels);
    window.addEventListener("resize", buildPixels);
  }
}
