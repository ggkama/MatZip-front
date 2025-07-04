import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const MyReservationList = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loginUser = JSON.parse(sessionStorage.getItem("user"));
    if (!loginUser?.userNo) {
      setError("로그인이 필요합니다.");
      return;
    }

    axiosInstance
      .get(`/api/reservation/mypage/${loginUser.userNo}`)
      .then((res) => {
        const list = res.data.map((r) => ({
          ...r,
          reservationStatus: r.reservationStatus || "예약완료",
          reviewStatus: r.reviewStatus || "작성하기",
        }));
        setReservations(list);
      })
      .catch((err) => {
        console.error("예약 목록 조회 실패", err);
        setError("예약 내역을 불러올 수 없습니다.");
      });
  }, []);

  const handleWriteReview = (res) => {
    navigate("/review-form", { state: { reservation: res } });
  };

  const handleViewReview = (res) => {
    navigate("/my-review-detail", { state: { reservation: res } });
  };

  const handleViewDetail = (res) => {
    navigate("/my-reservation-detail", {
      state: { reservationNo: res.reservationNo },
    });
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-5">내 예약 내역</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {reservations.length === 0 ? (
        <p className="text-gray-500">예약 내역이 없습니다.</p>
      ) : (
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
                <td className="py-3">
                  {res.reservationDate
                    ? new Date(res.reservationDate)
                        .toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace(/\. /g, "")
                        .replace(".", "") //
                    : "-"}
                </td>
                <td
                  className="truncate max-w-[160px] px-2"
                  title={res.storeName}
                >
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
      )}
    </div>
  );
};

export default MyReservationList;
