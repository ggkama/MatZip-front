import { useNavigate } from "react-router-dom";

const reservations = [
  {
    reservationDate: "2025.06.25",
    reservationTime: "12:00",
    userName: "김민수",
    personCount: 2,
    reservationStatus: "예약완료",
  },
  {
    reservationDate: "2025.06.26",
    reservationTime: "18:30",
    userName: "박지현",
    personCount: 4,
    reservationStatus: "예약완료",
  },
  {
    reservationDate: "2025.06.27",
    reservationTime: "19:00",
    userName: "최예은",
    personCount: 3,
    reservationStatus: "예약취소",
  },
  {
    reservationDate: "2025.06.28",
    reservationTime: "17:00",
    userName: "이도윤",
    personCount: 5,
    reservationStatus: "예약완료",
  },
  {
    reservationDate: "2025.06.29",
    reservationTime: "11:30",
    userName: "정하영",
    personCount: 2,
    reservationStatus: "예약완료",
  },
  {
    reservationDate: "2025.06.30",
    reservationTime: "13:00",
    userName: "서준호",
    personCount: 1,
    reservationStatus: "예약완료",
  },
  {
    reservationDate: "2025.07.01",
    reservationTime: "20:00",
    userName: "윤지후",
    personCount: 6,
    reservationStatus: "예약완료",
  },
  {
    reservationDate: "2025.07.02",
    reservationTime: "14:30",
    userName: "한예진",
    personCount: 2,
    reservationStatus: "예약취소",
  },
  {
    reservationDate: "2025.07.03",
    reservationTime: "16:00",
    userName: "장세림",
    personCount: 3,
    reservationStatus: "예약완료",
  },
  {
    reservationDate: "2025.07.04",
    reservationTime: "15:00",
    userName: "백도현",
    personCount: 4,
    reservationStatus: "예약완료",
  },
];

const OwnerReservationList = () => {
  const navi = useNavigate();

  const handleCancel = (e) => {
    e.stopPropagation();
    alert("예약이 취소되었습니다.");
  };

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-5">내 가게 예약 내역</h2>

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
          {reservations.map((res, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-100 cursor-pointer border-b border-gray-300"
              onClick={() => navi("/store-reservation-detail")}
            >
              <td className="py-3">{res.reservationDate}</td>
              <td>{res.reservationTime}</td>
              <td>{res.userName}</td>
              <td>{res.personCount}</td>
              <td>
                <button
                  className="bg-orange-500 text-white text-xs px-3 py-1 rounded hover:bg-orange-600"
                  onClick={handleCancel}
                >
                  예약취소
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerReservationList;
