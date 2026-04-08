import Image, { type ImageProps } from "next/image";

import { getOptimizedImageSrc, isCloudinaryUrl } from "@/lib/image";

export function OptimizedImage(props: ImageProps) {
  const { alt, src, sizes, ...rest } = props;
  const resolvedSrc =
    typeof src === "string" && isCloudinaryUrl(src)
      ? getOptimizedImageSrc(src)
      : src;

  return (
    <Image
      {...rest}
      alt={alt}
      src={resolvedSrc}
      sizes={sizes}
    />
  );
}
