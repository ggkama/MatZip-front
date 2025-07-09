import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiService } from "../../../api/apiService";

// 날짜 포맷 가공 함수
function formatVisitDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const WriteReviewForm = () => {
  const location = useLocation();
  const navi = useNavigate();

  const reviewData = location.state?.review;
  const reservationData = location.state?.reservation;

  const reservationNo =
    reservationData?.reservationNo ||
    reviewData?.reservationNo ||
    "";

  const storeNo =
    reservationData?.storeNo ||
    reviewData?.storeNo ||
    "";

  const storeName =
    reservationData?.storeName ||
    reviewData?.storeName ||
    "";

  const reviewDate =
    reservationData?.reservationDate ||
    reviewData?.createDate ||
    "";

  const [grade, setGrade] = useState(reviewData?.storeGrade || "");
  const [content, setContent] = useState(reviewData?.reviewContent || "");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState(
    reviewData?.imageUrls
      ? reviewData.imageUrls.map(
          (url) =>
            url.startsWith("http")
              ? url
              : `http://localhost:8080${url}`
        )
      : []
  );

  useEffect(() => {
    if (reviewData?.imageUrls) {
      setPreviewUrls(
        reviewData.imageUrls.map(
          (url) =>
            url.startsWith("http")
              ? url
              : `http://localhost:8080${url}`
        )
      );
    }
  }, [reviewData]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. 필수값 체크
    if (!reservationNo || !storeNo) {
      alert("예약번호와 매장번호가 누락되었습니다.");
      return;
    }
    if (!grade) {
      alert("점수를 선택해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    if (images.length === 0 && (!reviewData || !reviewData.imageUrls)) {
      alert("이미지 한 장 이상은 필수입니다.");
      return;
    }

    // FormData 구성
    const formData = new FormData();
    formData.append("reservationNo", Number(reservationNo));
    formData.append("storeNo", Number(storeNo));
    formData.append("reviewContent", content);
    formData.append("storeGrade", Number(grade));
    images.forEach((img) => formData.append("files", img));

    // 작성/수정
    if (reviewData?.reviewNo) {
      // 수정
      apiService
        .put(`/api/review/${reviewData.reviewNo}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          alert("리뷰 수정 완료");
          navi("/my-review-list");
        })
        .catch((err) => {
          alert("리뷰 수정 실패");
        });
    } else {
      // 작성
      apiService
        .post("/api/review/write", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          alert("리뷰 작성 완료");
          navi("/my-review-list");
        })
        .catch((err) => {
          alert("리뷰 작성 실패");
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[500px] mx-auto pt-10 pb-20 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">
        {reviewData ? "리뷰 수정" : "리뷰 작성"}하기
      </h2>
      <p className="text-xl text-center">
        <strong className="text-orange-600 font-extrabold">
          {formatVisitDate(reviewDate) || "YYYY-MM-DD"}
        </strong>
        에 방문하셨던 <br />
        <strong className="text-orange-600 font-extrabold">
          {storeName || "매장명"}
        </strong>
        에 대해 평가를 남겨주세요.
      </p>
      <div className="space-y-2">
        <p className="font-medium">점수를 입력해주세요 *</p>
        {[5, 4, 3, 2, 1].map((score) => (
          <label key={score} className="block">
            <input
              type="radio"
              value={score}
              checked={String(grade) === String(score)}
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
        {reviewData ? "수정하기" : "작성하기"}
      </button>
    </form>
  );
};

export default WriteReviewForm;
