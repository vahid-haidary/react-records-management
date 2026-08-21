import { useState } from "react";

import logoDefault from "@/assets/logo-default.png";

interface RecordImageProps {
  src?: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export function RecordImage({
  src,
  alt,
  className = "",
  loading = "lazy",
}: RecordImageProps) {
  const [hasError, setHasError] = useState(false);

  const imageSrc = !src || hasError ? logoDefault : src;

  return (
    <img
      src={imageSrc}
      alt={alt || "لوگو"}
      loading={loading}
      onError={() => setHasError(true)}
      className={`block h-full! w-full object-cover ${className}`}
    />
  );
}
