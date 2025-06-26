const DayCheckboxGroup = ({ options, selected, toggle }) => (
  <div className="space-y-1">
    <label>휴무일 (중복 선택 가능)</label>
    <div className="flex gap-3 flex-wrap">
      {options.map((day) => (
        <label key={day} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selected.includes(day)}
            onChange={() => toggle(day)}
          />
          <span className="text-sm">{day}</span>
        </label>
      ))}
    </div>
  </div>
);

export default DayCheckboxGroup;
