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
import {
  getDayNameKor,
  isDateInRange,
  formatDate,
} from "./styleComponents/js/dateUtils";

const ReservationForm = () => {
  const navi = useNavigate();
  const { storeNo } = useParams();

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
  const [availablePerson, setAvailablePerson] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/api/reservation/store/${storeNo}`)
      .then((res) => {
        const data = res.data;
        const openTime = data.openTime;
        const closeTime = data.closeTime;
        const dayOff = data.dayOff;
        const startDate = data.startDate ? new Date(data.startDate) : null;
        const endDate = data.endDate ? new Date(data.endDate) : null;

        setStoreInfo({
          name: data.storeName,
          openTime,
          closeTime,
          dayOff,
          startDate,
          endDate,
        });

        const today = new Date();
        const maxDaysToCheck = 30;
        let validDate = null;

        for (let i = 0; i < maxDaysToCheck; i++) {
          const candidate = new Date();
          candidate.setDate(today.getDate() + i);

          const dayName = getDayNameKor(candidate);
          const isDayOff = dayOff.includes(dayName);
          const isInShutdown = isDateInRange(candidate, startDate, endDate);

          if (!isDayOff && !isInShutdown) {
            validDate = candidate;
            break;
          }
        }

        if (validDate) {
          setReservationDate(validDate);
        }
      })
      .catch((err) => {
        console.error("예약 정보 불러오기 실패", err);
        setError("예약 정보를 불러올 수 없습니다.");
      });
  }, [storeNo]);

  useEffect(() => {
    if (storeInfo.openTime && storeInfo.closeTime) {
      let times = generateHourlyTimes(storeInfo.openTime, storeInfo.closeTime);

      const isToday =
        reservationDate.toDateString() === new Date().toDateString();
      if (isToday) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMin = now.getMinutes();

        times = times.filter((time) => {
          const [hour, min] = time.split(":").map(Number);
          return (
            hour > currentHour || (hour === currentHour && min > currentMin)
          );
        });
      }

      setAvailableTimes(times);
    }

    setReservedTimes([]);
  }, [reservationDate, storeInfo]);

  useEffect(() => {
    if (availableTimes.length > 0) {
      setReservationTime(availableTimes[0]);
    }
  }, [availableTimes]);

  useEffect(() => {
    if (reservationDate && reservationTime) {
      axiosInstance
        .get("/api/reservation/available-person", {
          params: {
            storeNo,
            reservationDate: formatDate(reservationDate),
            reservationTime,
          },
        })
        .then((res) => {
          setAvailablePerson(res.data);
        })
        .catch((err) => {
          console.error("예약 가능 인원 불러오기 실패", err);
          setAvailablePerson(null);
        });
    } else {
      setAvailablePerson(null);
    }
  }, [reservationDate, reservationTime]);

  const handleReservation = () => {
    if (!reservationDate || !reservationTime || personCount < 1) {
      setError("날짜, 시간, 인원을 정확히 선택해주세요.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(reservationDate);
    selectedDate.setHours(0, 0, 0, 0);

    const dayName = getDayNameKor(selectedDate);
    const isDayOff = storeInfo.dayOff.includes(dayName);
    const isInShutdown = isDateInRange(
      selectedDate,
      storeInfo.startDate,
      storeInfo.endDate
    );

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
      reservationDate: formatDate(reservationDate),
      reservationTime,
      personCount,
    };

    axiosInstance
      .get("/api/reservation/available-person", {
        params: {
          storeNo,
          reservationDate: formatDate(reservationDate),
          reservationTime,
        },
      })
      .then((res) => {
        const availablePerson = res.data;
        if (personCount > availablePerson) {
          setError(
            `해당 시간에는 최대 ${availablePerson}명까지 예약 가능합니다.`
          );
          return Promise.reject("인원 초과");
        }

        return axiosInstance.post("/api/reservation", payload);
      })
      .then(() => {
        setError("");
        setSuccess(true);
      })
      .catch((err) => {
        if (err !== "인원 초과") {
          console.error("예약 실패", err);
          setError("예약 저장에 실패했습니다.");
        }
      });
  };

  const increaseCount = () => setPersonCount((prev) => prev + 1);
  const decreaseCount = () => setPersonCount((prev) => Math.max(1, prev - 1));

  return (
    <div className="flex flex-col items-center pt-20 pb-20">
      <h2 className="text-3xl font-bold mb-10">{storeInfo.name} 예약</h2>

      <div className="flex gap-10 items-start">
        <DatePicker
          selected={reservationDate}
          onChange={setReservationDate}
          dateFormat="yyyy.MM.dd"
          minDate={new Date()}
          filterDate={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const checkDate = new Date(date);
            checkDate.setHours(0, 0, 0, 0);

            const dayName = getDayNameKor(checkDate);
            const isDayOff = storeInfo.dayOff.includes(dayName);
            const isInShutdown = isDateInRange(
              checkDate,
              storeInfo.startDate,
              storeInfo.endDate
            );

            return !isDayOff && !isInShutdown && checkDate >= today;
          }}
          inline
        />

        <div className="space-y-6">
          {availablePerson !== null && (
            <div className="text-sm text-gray-600">
              선택한 시간 예약 가능 인원:{" "}
              <span className="font-semibold">{availablePerson}명</span>
            </div>
          )}
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
