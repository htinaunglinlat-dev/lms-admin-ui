"use client";

import { uploadImage } from "@/api/upload";
import {
  ImageFieldNameEnum,
  ImageUploadResponse,
  UploadEndpointEnum,
} from "@/types/upload";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppFieldError } from "@/components/custom/elements/app-field-error";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  endpoint: UploadEndpointEnum;
  fieldName: ImageFieldNameEnum;
}

export function ImageUpload({
  value = "",
  onChange,
  endpoint,
  fieldName,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadImage(file, endpoint, fieldName);
      console.log("response.data", response.data);
      const imageUrl = response.data[0].url;
      console.log("imageUrl", imageUrl);
      onChange(imageUrl);
      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    onChange(newUrl);
  };

  const handleRemove = () => {
    onChange("");
  };

  const hasImage = !!value;

  return (
    <div className="space-y-3 max-w-xs">
      <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20">
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="size-8 animate-spin" />
            <span className="text-xs">Uploading...</span>
          </div>
        ) : hasImage ? (
          <>
            <img
              src={value}
              alt="Upload preview"
              className="size-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-background/80 text-muted-foreground hover:bg-background hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImagePlus className="size-8" />
            <span className="text-xs">No image</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? (
              <Loader2 className="mr-1 size-3 animate-spin" />
            ) : (
              <ImagePlus className="mr-1 size-3" />
            )}
            Choose File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
        <Input
          type="url"
          value={value}
          onChange={handleUrlChange}
          disabled={uploading}
          placeholder="Paste image URL or upload..."
        />
      </div>
    </div>
  );
}
