import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { apiService } from "../../api/apiService"; // 나중에 사용 예정

const MyReservationList = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // TODO: 백엔드 붙이면 여기서 API 호출
    // const fetchData = async () => {
    //   const res = await apiService.get("/api/mypage/reservations");
    //   setReservations(res.data);
    // };
    // fetchData();

    // 지금은 임시 mock 데이터
    setReservations(mockReservations);
  }, []);

  const handleWriteReview = (res) => {
    navigate("/review-form", { state: { reservation: res } });
  };

  const handleViewReview = (res) => {
    navigate("/my-review-detail", { state: { reservation: res } });
  };

  const handleViewDetail = (res) => {
    navigate("/my-reservation-detail", { state: { reservation: res } });
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-5">내 예약 내역</h2>

      <table className="w-full max-w-4xl border-t-2 border-b-2 border-black text-sm table-fixed text-center">
        <thead>
          <tr className="border-b border-gray-500 font-semibold">
            <th className="py-3">날짜</th>
            <th className="py-3">가게명</th>
            <th className="py-3">시간</th>
            <th className="py-3">인원수</th>
            <th className="py-3">예약상태</th>
            <th className="py-3">리뷰</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleViewDetail(res)}
            >
              <td className="py-3">{res.reservationDate}</td>
              <td className="truncate max-w-[160px] px-2" title={res.storeName}>
                {res.storeName}
              </td>
              <td>{res.reservationTime}</td>
              <td>{res.personCount}</td>
              <td
                className={
                  res.reservationStatus === "예약취소"
                    ? "text-red-500"
                    : "text-gray-700"
                }
              >
                {res.reservationStatus}
              </td>
              <td>
                {res.reviewStatus === "작성자격없음" ? (
                  "-"
                ) : res.reviewStatus === "작성하기" ? (
                  <button
                    className="bg-orange-400 text-white text-xs px-3 py-1 rounded hover:bg-orange-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWriteReview(res);
                    }}
                  >
                    작성하기
                  </button>
                ) : (
                  <button
                    className="bg-orange-300 text-white text-xs px-3 py-1 rounded hover:bg-orange-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewReview(res);
                    }}
                  >
                    작성한 리뷰보기
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReservationList;

// 백엔드 붙기 전 임시 mock 데이터
const mockReservations = [
  {
    reservationDate: "2025.06.20",
    reservationTime: "10:00",
    storeName: "88점 팀호완",
    personCount: 4,
    reservationStatus: "예약완료",
    reviewStatus: "작성하기",
  },
  {
    reservationDate: "2025.06.22",
    reservationTime: "18:00",
    storeName: "우래옥 본점",
    personCount: 2,
    reservationStatus: "예약완료",
    reviewStatus: "작성하기",
  },
  {
    reservationDate: "2025.06.23",
    reservationTime: "15:00",
    storeName: "오레노라멘",
    personCount: 1,
    reservationStatus: "예약완료",
    reviewStatus: "작성완료",
  },
  {
    reservationDate: "2025.06.24",
    reservationTime: "22:00",
    storeName: "라무진",
    personCount: 2,
    reservationStatus: "예약취소",
    reviewStatus: "작성자격없음",
  },
];
