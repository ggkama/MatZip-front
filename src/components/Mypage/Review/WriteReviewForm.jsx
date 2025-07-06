import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiService } from "../../../api/apiService";

const WriteReviewForm = () => {
  const [grade, setGrade] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const navi = useNavigate();
  const { state } = useLocation();
  const { storeId, storeName, reservationNo, mode, review } = state || {};

  useEffect(() => {
    // 수정모드라면 기존 내용 채워넣기
    if (mode === "edit" && review) {
      setGrade(review.storeGrade);
      setContent(review.reviewContent);
      if (review.imageUrls && review.imageUrls.length > 0) {
        setPreviewUrls(review.imageUrls.map(url =>
          url.startsWith("http") ? url : `http://localhost:8080${url}`
        ));
      }
    }
  }, [mode, review]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert("이미지는 최대 5장까지 업로드할 수 있습니다.");
      return;
    }
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [...prev, ...previews]);
  };

  const handleRemoveImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (!grade) {
      alert("점수를 선택해주세요.");
      return;
    }
    if (previewUrls.length === 0 && images.length === 0) {
      alert("이미지를 1장 이상 업로드해주세요.");
      return;
    }
    const formData = new FormData();
    formData.append("reviewContent", content);
    formData.append("storeGrade", grade);
    formData.append("storeNo", storeId);
    formData.append("reservationNo", reservationNo);
    images.forEach((img) => formData.append("files", img));
    try {
      if (mode === "edit" && review?.reviewNo) {
        // 수정
        await apiService.put(`/api/review/${review.reviewNo}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("리뷰 수정 완료");
      } else {
        // 작성
        await apiService.post("/api/review/write", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("리뷰 작성 완료");
      }
      navi("/my-review-list");
    } catch (err) {
      alert("리뷰 작성/수정 실패");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[500px] mx-auto pt-10 pb-20 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">
        {mode === "edit" ? "리뷰 수정하기" : "리뷰 작성하기"}
      </h2>
      <p className="text-xl text-center">
        {storeName && <span className="text-orange-600 font-extrabold">{storeName}</span>}
      </p>
      <div className="space-y-2">
        <p className="font-medium">점수를 입력해주세요 *</p>
        {[5, 4, 3, 2, 1].map((score) => (
          <label key={score} className="block">
            <input
              type="radio"
              value={score}
              checked={grade == score}
              onChange={() => setGrade(score)}
              className="mr-2"
            />
            {score}점
          </label>
        ))}
      </div>
      <div className="space-y-1">
        <label htmlFor="content" className="block font-medium">
          내용을 입력해주세요 *
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full border border-orange-400 rounded px-3 py-2 resize-none"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="font-medium block">매장 이미지 *</label>
        <label className="inline-block px-4 py-2 bg-orange-600 text-white text-sm rounded cursor-pointer hover:bg-orange-700">
          이미지 업로드
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {previewUrls.map((url, idx) => (
            <div key={idx} className="relative w-24 h-24">
              <img
                src={url}
                alt={`preview-${idx}`}
                className="w-full h-full object-cover rounded bg-gray-300"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute -top-2 -right-2 bg-black bg-opacity-60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-orange-600 text-white py-3 rounded hover:bg-orange-700"
      >
        {mode === "edit" ? "수정하기" : "작성하기"}
      </button>
    </form>
  );
};
export default WriteReviewForm;
