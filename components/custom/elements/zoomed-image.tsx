import { PhotoProvider, PhotoView } from "react-photo-view";
import React from "react";

type ZoomedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

export function ZoomedImage({
  src,
  alt = "",
  className,
  ...props
}: ZoomedImageProps) {
  return (
    <PhotoProvider>
      <PhotoView src={src}>
        <img
          src={src}
          alt={alt}
          className={`cursor-zoom-in ${className || ""}`}
          {...props}
        />
      </PhotoView>
    </PhotoProvider>
  );
}
