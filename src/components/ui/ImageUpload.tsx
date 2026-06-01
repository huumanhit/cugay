"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

interface ImageUploadProps {
  onUpload: (result: UploadResult) => void;
  defaultImage?: string;
  label?: string;
}

export default function ImageUpload({ onUpload, defaultImage, label = "Tải ảnh lên" }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(defaultImage ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setLoading(true);
    setPreview(URL.createObjectURL(file));

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Upload thất bại");

      onUpload(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload thất bại");
      setPreview(defaultImage ?? null);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-400 transition-colors bg-gray-50 overflow-hidden"
      >
        {preview ? (
          <Image src={preview} alt="preview" fill className="object-cover" unoptimized />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <span className="text-sm font-medium">{label}</span>
            <span className="text-xs">Kéo thả hoặc click để chọn (JPG, PNG, WebP · tối đa 10MB)</span>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
