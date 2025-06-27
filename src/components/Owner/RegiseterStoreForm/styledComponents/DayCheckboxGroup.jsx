const DayCheckboxGroup = ({ options, selected, toggle }) => (
  <div className="space-y-1">
    <label>휴무일 (중복 선택 가능)</label>
    <div className="flex gap-2 flex-wrap">
      {options.map((day) => {
        const isSelected = selected.includes(day);
        return (
          <button
            key={day}
            type="button"
            onClick={() => toggle(day)}
            className={`px-4 py-2 rounded-md text-sm border ${
              isSelected
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300"
            } hover:shadow-sm`}
          >
            {day}
          </button>
        );
      })}
    </div>
  </div>
);

export default DayCheckboxGroup;
