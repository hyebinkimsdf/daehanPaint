// models/Image.ts
import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }, // 이미지 주소
  createdAt: { type: Date, default: Date.now }, // 저장된 날짜
});

// 이 모델을 불러서 나중에 저장하거나 불러올 수 있어
export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
