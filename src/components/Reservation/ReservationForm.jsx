import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../api/axiosInstance";
import PeopleCounter from "./styleComponents/util/PeopleCounter";
import TimeSelector from "./styleComponents/util/TimeSelector";
import {
  formatTimeLabel,
  generateHourlyTimes,
} from "./styleComponents/js/timeUtils";
import { dateUtils } from "./styleComponents/js/dateUtils";

const ReservationForm = () => {
  const navigate = useNavigate();
  const { storeNo: paramStoreNo } = useParams();
  const storeNo = paramStoreNo || "81";
  const [storeInfo, setStoreInfo] = useState({
    name: "",
    openTime: "",
    closeTime: "",
    dayOff: [],
    startDate: null,
    endDate: null,
  });

  const [reservationDate, setReservationDate] = useState(new Date());
  const [reservationTime, setReservationTime] = useState("");
  const [personCount, setPersonCount] = useState(1);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchReservationInfo = () => {
      const url = `/api/reservation/store/${storeNo || 81}`;
      axiosInstance
        .get(url)
        .then((res) => {
          const data = res.data;
          setStoreInfo({
            name: data.storeName || "",
            openTime: data.openTime || "14:00",
            closeTime: data.closeTime || "22:00",
            dayOff: data.dayOff || [],
            startDate: data.startDate ? new Date(data.startDate) : null,
            endDate: data.endDate ? new Date(data.endDate) : null,
          });
        })
        .catch((err) => {
          console.error("예약 정보 불러오기 실패", err);
          setError("예약 정보를 불러올 수 없습니다.");
        });
    };

    fetchReservationInfo();
  }, [storeNo]);

  useEffect(() => {
    if (!reservationDate || !storeInfo.openTime || !storeInfo.closeTime) return;
    const times = generateHourlyTimes(storeInfo.openTime, storeInfo.closeTime);
    setAvailableTimes(times);

    const reserved = reservationDate.getDate() === 18 ? ["17:00"] : [];
    setReservedTimes(reserved);
  }, [reservationDate, storeInfo]);

  const handleReservation = () => {
    if (!reservationDate || !reservationTime || personCount < 1) {
      setError("날짜, 시간, 인원을 정확히 선택해주세요.");
      return;
    }
    const dayName = dateUtils(reservationDate);
    const isDayOff = storeInfo.dayOff.includes(dayName);
    const isInShutdown =
      storeInfo.startDate &&
      storeInfo.endDate &&
      reservationDate >= storeInfo.startDate &&
      reservationDate <= storeInfo.endDate;

    if (isDayOff || isInShutdown) {
      setError("선택한 날짜는 휴무일입니다.");
      return;
    }

    if (reservedTimes.includes(reservationTime)) {
      setError("이미 예약된 시간입니다.");
      return;
    }
    const loginUser = JSON.parse(sessionStorage.getItem("user"));
    const userNo = loginUser?.userNo;

    if (!userNo) {
      setError("로그인이 필요합니다.");
      return;
    }

    const payload = {
      userNo,
      storeNo: Number(storeNo),
      reservationDate: reservationDate.toISOString().split("T")[0], // yyyy-MM-dd
      reservationTime,
      personCount,
    };

    axiosInstance
      .post("/api/reservation", payload)
      .then(() => {
        setError("");
        setSuccess(true);
      })
      .catch((err) => {
        console.error("예약 저장 실패", err);
        setError("예약 저장에 실패했습니다.");
      });
  };

  const increaseCount = () => setPersonCount((prev) => prev + 1);
  const decreaseCount = () => setPersonCount((prev) => Math.max(1, prev - 1));

  return (
    <div className="flex flex-col items-center pt-20 pb-20">
      <h2 className="text-3xl font-bold mb-10">
        {storeInfo.name || "가게명 불러오는 중..."} 예약
      </h2>

      <div className="flex gap-10 items-start">
        <DatePicker
          selected={reservationDate}
          onChange={(date) => setReservationDate(date)}
          dateFormat="yyyy.MM.dd"
          minDate={new Date()}
          filterDate={(date) => {
            const dayKor = ["일", "월", "화", "수", "목", "금", "토"];
            const dayName = dayKor[date.getDay()];
            const isDayOff = storeInfo.dayOff.includes(dayName);
            const isInShutdown =
              storeInfo.startDate &&
              storeInfo.endDate &&
              date >= storeInfo.startDate &&
              date <= storeInfo.endDate;
            return !isDayOff && !isInShutdown;
          }}
          inline
        />

        <div className="space-y-6">
          <PeopleCounter
            personCount={personCount}
            increaseCount={increaseCount}
            decreaseCount={decreaseCount}
          />

          <TimeSelector
            availableTimes={availableTimes}
            reservedTimes={reservedTimes}
            reservationTime={reservationTime}
            setReservationTime={setReservationTime}
            formatTimeLabel={formatTimeLabel}
          />
        </div>
      </div>

      {error && <div className="text-red-500 mt-4">{error}</div>}
      {success && (
        <div className="text-green-600 mt-4">예약이 완료되었습니다!</div>
      )}
      <button
        onClick={handleReservation}
        className="mt-8 bg-orange-500 text-white px-6 py-2 rounded"
      >
        예약하기
      </button>
    </div>
  );
};

export default ReservationForm;
