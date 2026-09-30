import type { Photo as PhotoData } from "@/app/lib/photos";

// Responsive <img> for the pre-optimized WebP variants in /public/images.
export default function Photo({
  photo,
  alt,
  sizes,
  className,
  priority = false,
}: {
  photo: PhotoData;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export: variants are pre-generated
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
