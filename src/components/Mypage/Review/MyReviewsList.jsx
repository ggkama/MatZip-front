import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { apiService } from "../../../api/apiService"; // 실제 API 사용 시 주석 해제

const MyReviewsList = () => {
  const navi = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // 테스트용 데이터 삽입
    const mockData = [
      {
        createdDate: "2025-06-25",
        content: "음식이 정말 맛있었고, 서비스도 친절했어요!",
        storeName: "맛있는 고깃집",
        storeGrade: 5,
      },
      {
        createdDate: "2025-06-20",
        content: "대기 시간이 길었지만 음식은 괜찮았어요.",
        storeName: "분식천국",
        storeGrade: 4,
      },
      {
        createdDate: "2025-06-15",
        content: "기대 이하였습니다. 재방문은 안 할 것 같아요.",
        storeName: "해물파전집",
        storeGrade: 2,
      },
    ];
    setReviews(mockData);

    // 실제 API 연동 시 사용
    // const fetchReviews = async () => {
    //   try {
    //     const res = await apiService.get("/mypage/reviews");
    //     const data = res.data;
    //     if (Array.isArray(data)) {
    //       setReviews(data);
    //     } else if (Array.isArray(data.reviews)) {
    //       setReviews(data.reviews);
    //     } else {
    //       setReviews([]);
    //       console.warn("리뷰 데이터 형식이 배열이 아닙니다.", data);
    //     }
    //   } catch (err) {
    //     console.error("리뷰 목록을 불러오는 데 실패했습니다.", err);
    //     setReviews([]);
    //   }
    // };
    // fetchReviews();
  }, []);

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-6">내 리뷰 내역</h2>

      <table className="w-full border-t-2 border-black mt-5 text-sm text-center max-w-5xl">
        <thead>
          <tr className="font-semibold border-b border-black">
            <th className="py-3">날짜</th>
            <th className="py-3">리뷰 내용</th>
            <th className="py-3">가게명</th>
            <th className="py-3" width="80">
              점수
            </th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                onClick={() => navi("/my-review-detail", { state: { review } })}
              >
                <td className="py-3">{formatDate(review.createdDate)}</td>
                <td
                  className="px-2 max-w-[300px] truncate"
                  title={review.content}
                >
                  {review.content}
                </td>
                <td>{review.storeName}</td>
                <td>{review.storeGrade}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-6 text-gray-500">
                리뷰가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
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

export default MyReviewsList;
