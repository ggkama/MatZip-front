import { useState } from "react";
const WriteReviewForm = () => {
  const [grade, setGrade] = useState(5);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      alert("이미지는 최대 5장까지 업로드할 수 있습니다.");
      return;
    }

    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [...prev, ...newImagePreviews]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setPreviewUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("grade", grade);
    formData.append("content", content);
    formData.append("reviewDate", "2025-06-25"); // 예시값
    formData.append("storeId", 123); // 실제 storeId 대입 필요
    images.forEach((img) => formData.append("reviewImages", img));

    fetch("/api/mypage/myReviews/write", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "200") {
          alert("리뷰 작성 완료");
          // 이동 로직 필요 시 추가
        } else {
          alert(data.message || "리뷰 작성 실패");
        }
      })
      .catch((err) => alert("요청 실패: " + err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[500px] mx-auto pt-10 pb-20 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">리뷰 작성하기</h2>

      <p className="text-xl text-center">
        <strong className="text-orange-600 font-extrabold">
          2025년 6월 25일
        </strong>
        에 방문하셨던 <br />
        <strong className="text-orange-600  font-extrabold">비스트로트</strong>
        에 대해 평가를 남겨주세요.
      </p>

      <div className="space-y-2">
        <p className="font-medium">점수를 입력해주세요 *</p>
        {[5, 4, 3, 2, 1].map((score) => (
          <label key={score} className="block">
            <input
              type="radio"
              value={score}
              checked={grade === score}
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

        {/* 업로드 버튼 */}
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

        {/* 썸네일 + 삭제버튼 */}
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
        작성하기
      </button>
    </form>
  );
};

export default WriteReviewForm;
