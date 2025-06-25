import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const reservations = [
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
  {
    reservationDate: "2025.06.19",
    reservationTime: "12:00",
    storeName: "백암순대",
    personCount: 3,
    reservationStatus: "예약완료",
    reviewStatus: "작성완료",
  },
  {
    reservationDate: "2025.06.24",
    reservationTime: "08:00",
    storeName: "마라탕나라",
    personCount: 2,
    reservationStatus: "예약완료",
    reviewStatus: "작성완료",
  },
  {
    reservationDate: "2025.06.21",
    reservationTime: "11:00",
    storeName: "바른고기",
    personCount: 2,
    reservationStatus: "예약완료",
    reviewStatus: "작성완료",
  },
  {
    reservationDate: "2025.06.23",
    reservationTime: "20:30",
    storeName: "다이닝맛집",
    personCount: 5,
    reservationStatus: "예약완료",
    reviewStatus: "작성하기",
  },
  {
    reservationDate: "2025.06.24",
    reservationTime: "23:59",
    storeName: "샤브로이",
    personCount: 2,
    reservationStatus: "예약취소",
    reviewStatus: "작성자격없음",
  },
  {
    reservationDate: "2025.06.22",
    reservationTime: "17:30",
    storeName: "카츠시",
    personCount: 3,
    reservationStatus: "예약완료",
    reviewStatus: "작성완료",
  },
];

const formatDateTime = (dateStr, timeStr) => {
  return new Date(`${dateStr}T${timeStr}:00`);
};

const MyReservationList = () => {
  const now = new Date();

  const navi = useNavigate();

  return (
    <div className="flex flex-col items-center pt-10 pb-20 px-4">
      <h2 className="text-3xl font-bold mb-5">내 예약 내역</h2>
      <ul className="w-full max-w-4xl border-black border-t-2 border-b-2 mt-5">
        <li className="grid grid-cols-6 text-sm font-semibold py-3 border-b border-gray-500 ">
          <span className="text-center">날짜</span>
          <span className="text-center">가게명</span>
          <span className="text-center">시간</span>
          <span className="text-center">인원수</span>
          <span className="text-center">예약상태</span>
          <span className="text-center">리뷰</span>
        </li>
        {reservations.map((res, idx) => {
          const reservationDateTime = formatDateTime(
            res.reservationDate,
            res.reservationTime
          );
          const handleWriteReview = (res) => {
            navi("/review-form", { state: { reservation: res } });
          };

          return (
            <li
              key={idx}
              className="grid grid-cols-6 items-center text-sm py-4 border-b border-gray-300 cursor-pointer  hover:bg-gray-200"
            >
              <span
                onClick={() => navi("/my-reservation-detail")}
                className="text-center"
              >
                {res.reservationDate}
              </span>
              <span
                onClick={() => navi("/my-reservation-detail")}
                className="pl-8 truncate overflow-hidden whitespace-nowrap w-40"
              >
                {res.storeName}
              </span>
              <span
                onClick={() => navi("/my-reservation-detail")}
                className="text-center"
              >
                {res.reservationTime}
              </span>
              <span
                onClick={() => navi("/my-reservation-detail")}
                className="text-center"
              >
                {res.personCount}
              </span>
              <span
                onClick={() => navi("/my-reservation-detail")}
                className={`text-center ${
                  res.reservationStatus === "예약취소"
                    ? "text-red-500"
                    : "text-gray-700"
                }`}
              >
                {res.reservationStatus}
              </span>
              <span className="text-center">
                {res.reviewStatus === "작성자격없음" ? (
                  "-"
                ) : res.reviewStatus === "작성하기" ? (
                  <button
                    className="bg-orange-400 text-white text-xs px-3 py-1 rounded hover:bg-orange-500 cursor-pointer"
                    onClick={() => handleWriteReview(res)}
                  >
                    작성하기
                  </button>
                ) : res.reviewStatus === "작성완료" ? (
                  <button
                    className="bg-orange-300 text-white text-xs px-3 py-1 rounded hover:bg-orange-400 cursor-pointer"
                    onClick={() => handleViewReview(res)}
                  >
                    작성한 리뷰보기
                  </button>
                ) : (
                  "-"
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyReservationList;
