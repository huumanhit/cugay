"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Bird, Camera, Phone, MapPin, DollarSign,
  CheckCircle2, ChevronRight, X, Plus, ArrowLeft,
} from "lucide-react";

const VOICES = ["Thổ", "Đồng", "Kim", "Thủy", "Đấu", "Vàng"];
const PROVINCES = [
  "Hà Nội","TP. Hồ Chí Minh","Đà Nẵng","Cần Thơ","Hải Phòng",
  "Thừa Thiên Huế","Khánh Hòa","Lâm Đồng","Nghệ An","Bình Dương",
  "Đồng Nai","Vũng Tàu","Quảng Nam","Bình Định","Gia Lai",
  "Đắk Lắk","Kiên Giang","An Giang","Tiền Giang","Long An",
];

const STEPS = [
  { id: 1, label: "Thông tin chim", icon: Bird },
  { id: 2, label: "Hình ảnh",       icon: Camera },
  { id: 3, label: "Giá & Mô tả",   icon: DollarSign },
  { id: 4, label: "Liên hệ",        icon: Phone },
];

const CLOUD = "dl51jugpu";
const PRESET = "cugay_uploads";

async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", PRESET);
  form.append("folder", "cugay/listings");
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload thất bại");
  const data = await res.json();
  return data.secure_url as string;
}

export default function ListingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [newBirdId, setNewBirdId] = useState("");
  const mainImgRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  // Form state
  const [form, setForm] = useState({
    birdName: "", voice: "Thổ", age: "", province: "TP. Hồ Chí Minh",
    weight: "", color: "", lineage: "", description: "",
    image: "", imagePreview: "", gallery: [] as string[],
    price: "", negotiable: false, listingDescription: "",
    sellerName: "", sellerPhone: "", sellerProvince: "",
  });
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  async function handleMainImage(file: File) {
    setUploadingMain(true);
    try {
      const url = await uploadFile(file);
      set("image", url);
      set("imagePreview", URL.createObjectURL(file));
    } finally {
      setUploadingMain(false);
    }
  }

  async function handleGalleryImage(file: File) {
    if (form.gallery.length >= 5) return;
    setUploadingGallery(true);
    try {
      const url = await uploadFile(file);
      setForm((f) => ({ ...f, gallery: [...f.gallery, url] }));
    } finally {
      setUploadingGallery(false);
    }
  }

  function validateStep() {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!form.birdName.trim()) e.birdName = "Nhập tên chim";
      if (!form.age || Number(form.age) <= 0) e.age = "Nhập tuổi hợp lệ";
    }
    if (step === 2 && !form.image) e.image = "Cần ít nhất 1 ảnh";
    if (step === 3) {
      if (!form.price || Number(form.price) <= 0) e.price = "Nhập giá hợp lệ";
    }
    if (step === 4) {
      if (!form.sellerName.trim()) e.sellerName = "Nhập tên người bán";
      if (!form.sellerPhone.trim()) e.sellerPhone = "Nhập số điện thoại";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() { if (validateStep()) setStep((s) => Math.min(s + 1, 4)); }
  function back() { setStep((s) => Math.max(s - 1, 1)); }

  async function submit() {
    if (!validateStep()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, age: Number(form.age), price: Number(form.price) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Lỗi server");
      setNewBirdId(data.birdId);
      setDone(true);
    } catch (err: any) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  // ── SUCCESS ──
  if (done) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Đăng tin thành công!</h2>
          <p className="text-muted text-sm mb-8">
            Tin của bạn đã được đăng lên chợ chim CuGay.vn. Người mua có thể liên hệ trực tiếp với bạn.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push(`/ho-so-chim/${newBirdId}`)}
              className="w-full bg-primary-500 text-white font-semibold py-3 rounded-xl hover:bg-primary-600 transition-colors"
            >
              Xem hồ sơ chim
            </button>
            <button
              onClick={() => router.push("/cho-chim")}
              className="w-full bg-white border border-border text-text-primary font-semibold py-3 rounded-xl hover:bg-accent transition-colors"
            >
              Xem chợ chim
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-white hover:bg-accent transition-colors">
          <ArrowLeft className="w-4 h-4 text-muted" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-text-primary">Đăng tin bán chim</h1>
          <p className="text-xs text-muted">Miễn phí · Tiếp cận hàng nghìn người mua</p>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                step > s.id ? "bg-green-500" : step === s.id ? "bg-primary-500" : "bg-accent border border-border"
              }`}>
                {step > s.id
                  ? <CheckCircle2 className="w-5 h-5 text-white" />
                  : <s.icon className={`w-4 h-4 ${step === s.id ? "text-white" : "text-muted"}`} />
                }
              </div>
              <span className={`text-[10px] mt-1 font-medium hidden sm:block ${step === s.id ? "text-primary-600" : "text-muted"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 rounded-full transition-all ${step > s.id ? "bg-green-400" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-card p-6">

        {/* ── STEP 1: Bird Info ── */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="font-bold text-text-primary text-lg flex items-center gap-2">
              <Bird className="w-5 h-5 text-primary-500" /> Thông tin chim
            </h2>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">
                Tên chim <span className="text-red-500">*</span>
              </label>
              <input value={form.birdName} onChange={(e) => set("birdName", e.target.value)}
                placeholder="VD: Chiến Binh Sài Gòn, Dũng Sĩ Tây Đô..."
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all ${errors.birdName ? "border-red-400 bg-red-50" : "border-border bg-accent focus:bg-white"}`}
              />
              {errors.birdName && <p className="text-xs text-red-500 mt-1">{errors.birdName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">Giọng <span className="text-red-500">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {VOICES.map((v) => (
                    <button key={v} type="button" onClick={() => set("voice", v)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        form.voice === v ? "bg-primary-500 text-white border-primary-500" : "bg-white text-muted border-border hover:border-primary-300"
                      }`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">Tuổi <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <input type="number" min="1" max="20" value={form.age} onChange={(e) => set("age", e.target.value)}
                    placeholder="VD: 3"
                    className={`flex-1 px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all ${errors.age ? "border-red-400 bg-red-50" : "border-border bg-accent focus:bg-white"}`}
                  />
                  <span className="text-sm text-muted">tuổi</span>
                </div>
                {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">
                <MapPin className="w-3.5 h-3.5 inline mr-1" />Tỉnh/Thành <span className="text-red-500">*</span>
              </label>
              <select value={form.province} onChange={(e) => set("province", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-accent text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all text-text-primary">
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">Cân nặng</label>
                <input value={form.weight} onChange={(e) => set("weight", e.target.value)}
                  placeholder="VD: 180g"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-accent text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1.5">Màu lông</label>
                <input value={form.color} onChange={(e) => set("color", e.target.value)}
                  placeholder="VD: Xanh lam + Nâu"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-accent text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Dòng chim / Phả hệ</label>
              <input value={form.lineage} onChange={(e) => set("lineage", e.target.value)}
                placeholder="VD: Dòng Tây Đô, dòng Bắc Bộ..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-accent text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Mô tả về chim</label>
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
                rows={3} placeholder="Mô tả đặc điểm, tính cách, thành tích của chim..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-accent text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all resize-none"
              />
            </div>
          </div>
        )}

        {/* ── STEP 2: Photos ── */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="font-bold text-text-primary text-lg flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary-500" /> Hình ảnh chim
            </h2>

            {/* Main photo */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Ảnh đại diện <span className="text-red-500">*</span>
              </label>
              <div
                onClick={() => !uploadingMain && mainImgRef.current?.click()}
                className={`relative h-56 rounded-2xl border-2 border-dashed cursor-pointer overflow-hidden transition-all ${
                  errors.image ? "border-red-400 bg-red-50" : "border-border hover:border-primary-400 bg-accent hover:bg-primary-50/30"
                }`}
              >
                {form.imagePreview ? (
                  <Image src={form.imagePreview} alt="preview" fill className="object-cover" unoptimized />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted">
                    {uploadingMain ? (
                      <>
                        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm">Đang tải lên...</p>
                      </>
                    ) : (
                      <>
                        <div className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center shadow-sm">
                          <Camera className="w-7 h-7 text-primary-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-text-primary">Tải ảnh đại diện</p>
                          <p className="text-xs text-muted mt-0.5">JPG, PNG, WebP · Tối đa 10MB</p>
                        </div>
                      </>
                    )}
                  </div>
                )}
                {form.imagePreview && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-sm font-medium">Đổi ảnh</p>
                  </div>
                )}
              </div>
              <input ref={mainImgRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleMainImage(f); }} />
              {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
            </div>

            {/* Gallery */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-text-primary">Ảnh bổ sung</label>
                <span className="text-xs text-muted">{form.gallery.length}/5 ảnh</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {form.gallery.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-accent group">
                    <Image src={url} alt="" fill className="object-cover" unoptimized />
                    <button
                      onClick={() => setForm((f) => ({ ...f, gallery: f.gallery.filter((_, j) => j !== i) }))}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {form.gallery.length < 5 && (
                  <button
                    onClick={() => galleryRef.current?.click()}
                    disabled={uploadingGallery}
                    className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary-400 bg-accent hover:bg-primary-50/30 flex items-center justify-center transition-all"
                  >
                    {uploadingGallery
                      ? <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                      : <Plus className="w-5 h-5 text-muted" />
                    }
                  </button>
                )}
              </div>
              <input ref={galleryRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleGalleryImage(f); }} />
            </div>

            <div className="bg-primary-50 rounded-xl p-3 text-xs text-primary-700">
              💡 Ảnh đẹp, rõ nét sẽ giúp tin của bạn thu hút nhiều người mua hơn. Nên chụp ảnh chim trong ánh sáng tốt.
            </div>
          </div>
        )}

        {/* ── STEP 3: Price & Description ── */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="font-bold text-text-primary text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-500" /> Giá & Mô tả bán
            </h2>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">
                Giá bán (triệu đồng) <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center rounded-xl border overflow-hidden transition-all ${errors.price ? "border-red-400 bg-red-50" : "border-border bg-accent focus-within:ring-2 focus-within:ring-primary-300 focus-within:bg-white"}`}>
                <span className="px-3 text-sm text-muted font-medium border-r border-border py-2.5 bg-white">₫</span>
                <input type="number" min="1" value={form.price} onChange={(e) => set("price", e.target.value)}
                  placeholder="VD: 35"
                  className="flex-1 px-3 py-2.5 text-sm bg-transparent focus:outline-none text-text-primary"
                />
                <span className="px-3 text-sm text-muted border-l border-border py-2.5 bg-white">triệu</span>
              </div>
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
              {form.price && Number(form.price) > 0 && (
                <p className="text-xs text-primary-600 font-medium mt-1">
                  = {(Number(form.price) * 1_000_000).toLocaleString("vi-VN")} VNĐ
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Hình thức giá</label>
              <div className="flex gap-3">
                <button type="button" onClick={() => set("negotiable", false)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${!form.negotiable ? "bg-primary-500 text-white border-primary-500" : "bg-white text-muted border-border hover:border-primary-300"}`}>
                  Giá cố định
                </button>
                <button type="button" onClick={() => set("negotiable", true)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${form.negotiable ? "bg-primary-500 text-white border-primary-500" : "bg-white text-muted border-border hover:border-primary-300"}`}>
                  Thương lượng
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Mô tả tin bán</label>
              <textarea value={form.listingDescription} onChange={(e) => set("listingDescription", e.target.value)}
                rows={4} placeholder="Lý do bán, tình trạng chim, yêu cầu người mua, điều kiện giao dịch..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-accent text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all resize-none"
              />
              <p className="text-xs text-muted mt-1">{form.listingDescription.length}/500 ký tự</p>
            </div>

            {/* Preview card */}
            {form.birdName && form.price && (
              <div className="border border-primary-200 rounded-xl p-4 bg-primary-50/50">
                <p className="text-xs font-semibold text-primary-600 mb-2 uppercase tracking-wide">Xem trước tin</p>
                <div className="flex gap-3">
                  {form.imagePreview && (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-accent">
                      <Image src={form.imagePreview} alt="" fill className="object-cover" unoptimized />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-text-primary text-sm">{form.birdName}</p>
                    <p className="text-xs text-muted">{form.voice} · {form.age} tuổi · {form.province}</p>
                    <p className="text-primary-600 font-bold text-sm mt-1">
                      {Number(form.price).toLocaleString()} triệu đ
                      {form.negotiable && <span className="text-xs text-emerald-600 font-medium ml-1">· Thương lượng</span>}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 4: Contact ── */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="font-bold text-text-primary text-lg flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary-500" /> Thông tin liên hệ
            </h2>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
              ⚠️ Thông tin này sẽ hiển thị cho người mua. Hãy đảm bảo số điện thoại chính xác.
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">
                Tên người bán <span className="text-red-500">*</span>
              </label>
              <input value={form.sellerName} onChange={(e) => set("sellerName", e.target.value)}
                placeholder="Tên thật hoặc biệt danh..."
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all ${errors.sellerName ? "border-red-400 bg-red-50" : "border-border bg-accent focus:bg-white"}`}
              />
              {errors.sellerName && <p className="text-xs text-red-500 mt-1">{errors.sellerName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input type="tel" value={form.sellerPhone} onChange={(e) => set("sellerPhone", e.target.value)}
                placeholder="0901 234 567"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all ${errors.sellerPhone ? "border-red-400 bg-red-50" : "border-border bg-accent focus:bg-white"}`}
              />
              {errors.sellerPhone && <p className="text-xs text-red-500 mt-1">{errors.sellerPhone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">
                <MapPin className="w-3.5 h-3.5 inline mr-1" />Khu vực của bạn
              </label>
              <select value={form.sellerProvince || form.province} onChange={(e) => set("sellerProvince", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-accent text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all text-text-primary">
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Summary */}
            <div className="bg-accent rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-3">Tóm tắt tin đăng</p>
              {[
                ["Chim", `${form.birdName} · Giọng ${form.voice} · ${form.age} tuổi`],
                ["Khu vực", form.province],
                ["Giá", `${Number(form.price).toLocaleString()} triệu đ${form.negotiable ? " · Thương lượng" : ""}`],
                ["Ảnh", `${1 + form.gallery.length} ảnh`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-muted">{k}</span>
                  <span className="font-medium text-text-primary text-right max-w-[60%] truncate">{v}</span>
                </div>
              ))}
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                {errors.submit}
              </div>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-border">
          {step > 1 && (
            <button onClick={back}
              className="flex-1 py-3 rounded-xl border border-border text-text-primary font-semibold text-sm hover:bg-accent transition-colors">
              Quay lại
            </button>
          )}
          {step < 4 ? (
            <button onClick={next}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-500 text-white font-semibold py-3 rounded-xl hover:bg-primary-600 transition-colors text-sm">
              Tiếp theo <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={submit} disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-500 text-white font-semibold py-3 rounded-xl hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm">
              {submitting ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Đang đăng...</>
              ) : (
                <><CheckCircle2 className="w-4 h-4" /> Đăng tin ngay</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
