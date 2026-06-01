const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dl51jugpu";
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET ?? "cugay_uploads";
const FOLDER = "cugay/birds";

export const cloudinary = {
  cloudName: CLOUD_NAME,
  uploadPreset: UPLOAD_PRESET,
  folder: FOLDER,
};

/** Build URL ảnh Cloudinary với transform tùy chọn */
export function getCloudinaryUrl(
  publicId: string,
  options: { width?: number; height?: number; quality?: number } = {}
): string {
  const transforms: string[] = ["f_auto"];
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.quality) transforms.push(`q_${options.quality}`);
  else transforms.push("q_auto");

  const t = transforms.join(",");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t}/${publicId}`;
}

/** Upload file ảnh lên Cloudinary qua unsigned preset, trả về publicId và secure_url */
export async function uploadToCloudinary(file: File): Promise<{
  publicId: string;
  url: string;
  width: number;
  height: number;
}> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", FOLDER);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `Upload thất bại: ${res.status}`);
  }

  const data = await res.json();
  return {
    publicId: data.public_id,
    url: data.secure_url,
    width: data.width,
    height: data.height,
  };
}
