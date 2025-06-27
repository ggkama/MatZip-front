import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyReviewsDetail = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: API 연동 시 아래 라인 교체
    setReviews(mockReviews);
  }, []);

  if (!reviews.length) {
    return <div className="text-center mt-10">작성한 리뷰가 없습니다.</div>;
  }

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-12">내 리뷰 내역</h2>

      {reviews.map((review, idx) => (
        <div key={idx} className="border rounded-md p-8 mb-10">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">{review.storeName}</h3>
            <span className="text-sm text-gray-500">
              {formatDate(review.createdDate)}
            </span>
          </div>

          <div className="text-sm text-gray-700 font-semibold mb-4">
            {review.storeGrade}점
          </div>

          <p className="text-sm text-gray-800 mb-4">{review.content}</p>

          {review.imgUrls?.length > 0 && (
            <div className="flex gap-4">
              {review.imgUrls.slice(0, 3).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`리뷰 이미지 ${i + 1}`}
                  className="w-[100px] h-[100px] object-cover rounded bg-gray-200"
                />
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="text-center mt-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded"
        >
          목록
        </button>
      </div>
    </div>
  );
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate()).padStart(2, "0")}`;
};

export default MyReviewsDetail;

// 더미 데이터
const mockReviews = [
  {
    storeName: "우래옥 본점",
    createdDate: "2025-06-18",
    content:
      "기다림의 인내심이 왠만큼 강하지 않으면 먹어 볼 수 없는 집...\n평양냉면의 육수는 첫 술에도 육향이 진동하고...",
    imgUrls: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    storeGrade: 5,
  },
];
