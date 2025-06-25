import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const MyReviewsDetail = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 임시 데이터 (axios 제거)
    const mockData = [
      {
        storeName: "우래옥 본점",
        createdDate: "2025-06-18",
        content:
          "기다림의 인내심이 왠만큼 강하지 않으면 먹어 볼 수 없는 집너무 사람이 많아 몇 년을 안가다가 더운 여름과 픽크타임을 피해 작년 가을 주말 오후 4시 30분경 도착했는데도 1시간 30분 정도를 대기해야 한다고해서 그냥 포기.냉면 비수기인 추운 겨울을 틈타 재도전했는데 7시경에 도착해서도 30분을 대기하고 들어갔습니다.맛과 푸짐한 양은 여전히 최상급이네요.평양냉면의 육수는 첫 술에도 육향이 진동하고 동치미의 시큼한 맛으로 육향의 느끼함을 깔끔하게 마무리 합니다. 여기에 메밀면을 풀면 중화되어 감칠맛이 더욱 올라옵니다.고명으로 올린 채썬 배의 달달함과 시큼한 백김치 그리고 양지 수육까지도 훌륭한 하모니를 이룹니다.",
        imgUrls: [
          "https://via.placeholder.com/100",
          "https://via.placeholder.com/100",
          "https://via.placeholder.com/100",
        ],
        storeGrade: 5,
      },
    ];

    // 1초 뒤 mock 데이터 설정 (로딩 효과 시뮬레이션)
    setTimeout(() => {
      setReviews(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="text-center mt-10">로딩 중입니다...</div>;
  if (reviews.length === 0)
    return <div className="text-center mt-10">작성한 리뷰가 없습니다.</div>;

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h2 className="text-center text-3xl font-semibold mb-12">내 리뷰 내역</h2>

      {reviews.map((review, idx) => (
        <div key={idx} className="border rounded-md p-8 mb-10">
          {/* 별점 + 점수 */}
          <div className="flex items-center mb-2">
            <span className="text-yellow-400 mr-2 text-lg">★</span>
            <span className="text-sm text-gray-700 font-bold">
              {review.storeGrade}점
            </span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">{review.storeName}</h3>
            <p className="text-sm text-gray-500">
              {dayjs(review.createdDate).format("YYYY.MM.DD")}
            </p>
          </div>

          <div className="whitespace-pre-line text-sm leading-relaxed text-gray-800">
            {review.content}
          </div>

          {review.imgUrls && review.imgUrls.length > 0 && (
            <div className="flex gap-4 mt-6">
              {review.imgUrls.slice(0, 3).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`리뷰 이미지 ${i + 1}`}
                  className="w-[100px] h-[100px] object-cover rounded-md bg-gray-200"
                />
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="text-center">
        <button
          onClick={() => window.history.back()}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded"
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default MyReviewsDetail;
