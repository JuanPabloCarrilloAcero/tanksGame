export function getBlockImage(type) {
    const image = new Image();
    image.src = `/src/assets/${type}.png`;
    return image;
}