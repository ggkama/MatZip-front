import { useNavigate } from "react-router-dom";

// 예시 리뷰 데이터
const reviews = [
  {
    reviewDate: "2025.06.18",
    reviewContent: "기다림이 길긴 했지만, 고기의 깊은 풍미는 잊을 수 없었어요.",
    storeName: "우래옥 본점",
    grade: 5,
  },
  {
    reviewDate: "2025.06.15",
    reviewContent: "순대국은 괜찮았지만, 밥이 조금 질었던 게 아쉬웠어요.",
    storeName: "농민백암순대 본점",
    grade: 3,
  },
  {
    reviewDate: "2025.06.12",
    reviewContent: "진한 육수와 완벽한 면발의 조합. 여긴 다시 간다.",
    storeName: "오레노라멘 본점",
    grade: 4,
  },
  {
    reviewDate: "2025.06.10",
    reviewContent: "기대보다 평범했지만 서비스가 친절해서 좋았어요.",
    storeName: "88점 팀호완",
    grade: 4,
  },
  {
    reviewDate: "2025.06.09",
    reviewContent: "갈비탕이 너무 짰어요. 다음엔 다른 메뉴를 시켜야 할 듯.",
    storeName: "우래옥 본점",
    grade: 2,
  },
  {
    reviewDate: "2025.06.07",
    reviewContent: "가성비 최고. 근처 오면 꼭 다시 들릴 생각이에요.",
    storeName: "농민백암순대 본점",
    grade: 5,
  },
  {
    reviewDate: "2025.06.05",
    reviewContent: "면은 탱글했지만 국물이 살짝 심심했어요.",
    storeName: "오레노라멘 본점",
    grade: 3,
  },
  {
    reviewDate: "2025.06.03",
    reviewContent: "기본에 충실한 맛. 줄 서서 먹을 정도까진 아니에요.",
    storeName: "88점 팀호완",
    grade: 3,
  },
  {
    reviewDate: "2025.06.01",
    reviewContent: "대기 시간이 너무 길어서 지쳤지만 음식은 훌륭했어요.",
    storeName: "우래옥 본점",
    grade: 4,
  },
];

const MyReviews = () => {
  const navi = useNavigate();

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-6">내 리뷰 내역</h2>

      <table className="w-full border-t-2 border-black mt-5 text-sm text-center">
        <thead>
          <tr className="font-semibold border-b border-black">
            <th className="py-3">날짜</th>
            <th className="py-3">리뷰 내용</th>
            <th className="py-3">가게명</th>
            <th className="py-3" width="120">
              점수
            </th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
              onClick={() => navi("/my-review-detail")}
            >
              <td className="py-3">{review.reviewDate}</td>
              <td
                className="px-2 max-w-[300px] truncate"
                title={review.reviewContent}
              >
                {review.reviewContent}
              </td>
              <td>{review.storeName}</td>
              <td>
                <span className="text-yellow-400 mr-1 text-lg">★</span>
                {review.grade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReviews;
