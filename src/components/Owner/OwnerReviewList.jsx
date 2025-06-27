import { useNavigate } from "react-router-dom";

// 예시 리뷰 데이터
const reviews = [
  {
    reviewDate: "2025.06.18",
    reviewContent: "기다림이 길긴 했지만, 고기의 깊은 풍미는 잊을 수 없었어요.",
    userName: "홍길동",
    storeGrade: 5,
  },
];

const OwnerReviewList = () => {
  const navi = useNavigate();

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-6">내 가게 리뷰 내역</h2>

      <table className="w-full border-t-2 border-black mt-5 text-sm text-center table-fixed">
        <thead>
          <tr className="font-semibold border-b border-black">
            <th className="py-3">날짜</th>
            <th className="py-3 w-[50%]">리뷰 내용</th>
            <th className="py-3">작성자</th>
            <th className="py-3 w-[80px]">점수</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
              onClick={() => navi("/store-review-detail")}
            >
              <td className="py-3">{review.reviewDate}</td>
              <td className="px-2 truncate max-w-[300px]">
                {review.reviewContent}
              </td>
              <td>{review.userName}</td>
              <td>
                <span className="text-yellow-400 mr-1 text-lg">★</span>
                {review.storeGrade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerReviewList;
