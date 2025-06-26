import DatePicker from "react-datepicker";

const HolidayPicker = ({ startDate, setStartDate, endDate, setEndDate }) => (
  <div className="flex gap-4 items-center">
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      dateFormat="yyyy.MM.dd"
      placeholderText="시작일"
      className="border px-4 py-2 rounded-md w-[228px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
    <span>~</span>
    <DatePicker
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      minDate={startDate}
      dateFormat="yyyy.MM.dd"
      placeholderText="종료일"
      className="border px-4 py-2 rounded-md w-[228px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
  </div>
);

export default HolidayPicker;
