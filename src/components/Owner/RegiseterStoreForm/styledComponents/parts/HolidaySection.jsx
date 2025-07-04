import DayCheckboxGroup from "../util/DayCheckboxGroup";
import HolidayPicker from "../util/HolidayPicker";

const HolidaySection = ({
  dayOff,
  handleDayToggle,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const dayOptions = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <>
      <DayCheckboxGroup
        options={dayOptions}
        selected={dayOff}
        toggle={handleDayToggle}
      />
      <div className="flex flex-col">
        <label className="font-bold mb-2">임시휴무일 (선택)</label>
        <HolidayPicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </div>
    </>
  );
};

export default HolidaySection;
