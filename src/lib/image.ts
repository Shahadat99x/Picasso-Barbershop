const CLOUDINARY_UPLOAD_PATH = "/image/upload/";

export function isCloudinaryUrl(src: string) {
  try {
    const url = new URL(src);
    return (
      url.hostname === "res.cloudinary.com" &&
      url.pathname.includes(CLOUDINARY_UPLOAD_PATH)
    );
  } catch {
    return false;
  }
}

export function buildCloudinaryImageUrl(
  src: string,
  width?: number,
  quality?: number,
) {
  if (!isCloudinaryUrl(src)) {
    return src;
  }

  const url = new URL(src);
  const [prefix, suffix] = url.pathname.split(CLOUDINARY_UPLOAD_PATH);

  if (!prefix || !suffix) {
    return src;
  }

  const transforms = [
    "f_auto",
    quality ? `q_${quality}` : "q_auto:good",
    ...(typeof width === "number"
      ? ["dpr_auto", `w_${Math.max(1, Math.round(width))}`, "c_limit"]
      : []),
  ].join(",");

  url.pathname = `${prefix}${CLOUDINARY_UPLOAD_PATH}${transforms}/${suffix.replace(
    /^\/+/,
    "",
  )}`;

  return url.toString();
}

export function getOptimizedImageSrc(src: string) {
  return buildCloudinaryImageUrl(src);
}
