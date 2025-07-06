import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const OwnerReservationList = () => {
  const navi = useNavigate();
  const [reservations, setReservations] = useState([]);

  const storeNo = sessionStorage.getItem("storeNo");

  useEffect(() => {
    if (!storeNo) {
      alert("가게 정보가 없습니다.");
      return;
    }

    console.log("storeNo 확인:", storeNo);

    axiosInstance
      .get(`/api/reservation/owner/${storeNo}`)
      .then((res) => {
        console.log("가져온 예약 목록:", res.data);
        setReservations(res.data);
      })
      .catch((err) => {
        console.error("예약 목록 조회 실패", err);
        alert("예약 목록을 불러오는 데 실패했습니다.");
      });
  }, [storeNo]);

  const handleCancel = (e, reservationNo) => {
    e.stopPropagation();

    const reason = prompt("예약 취소 사유를 입력해주세요:");
    if (!reason || !reason.trim()) {
      alert("취소 사유가 입력되지 않았습니다.");
      return;
    }

    axiosInstance
      .patch("/api/reservation/owner/cancel", {
        reservationNo,
        cancelReason: reason.trim(),
      })
      .then(() => {
        alert("예약이 취소되었습니다.");
        // 목록 갱신
        setReservations((prev) =>
          prev.map((r) =>
            r.reservationNo === reservationNo ? { ...r, status: "N" } : r
          )
        );
      })
      .catch((err) => {
        console.error("예약 취소 실패", err);
        alert("예약 취소에 실패했습니다.");
      });
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-10">내 가게 예약 내역</h2>

      <table className="w-full max-w-4xl border-t-2 border-b-2 border-black text-sm text-center table-fixed">
        <thead>
          <tr className="border-b border-gray-500 font-semibold">
            <th className="py-3">날짜</th>
            <th className="py-3">시간</th>
            <th className="py-3">예약자명</th>
            <th className="py-3" width="80">
              인원수
            </th>
            <th className="py-3">예약상태</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr
              key={res.reservationNo}
              className="hover:bg-gray-100 cursor-pointer border-b border-gray-300"
              onClick={() =>
                navi(`/store-reservation-detail/${res.reservationNo}`)
              }
            >
              <td className="py-3">{res.reservationDate?.split("T")[0]}</td>
              <td>{res.reservationTime}</td>
              <td>{res.userName}</td>
              <td>{res.personCount}</td>
              <td>
                {res.status === "Y" ? (
                  <span className="text-green-600 font-semibold">예약완료</span>
                ) : (
                  <span className="text-red-500">예약취소</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerReservationList;
