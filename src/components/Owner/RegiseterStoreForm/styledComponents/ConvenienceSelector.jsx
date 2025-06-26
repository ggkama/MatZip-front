const ConvenienceSelector = ({ options, selected, toggle }) => (
  <div className="space-y-1">
    <label>편의시설 *</label>
    <div className="flex gap-2 flex-wrap">
      {options.map((item) => (
        <button
          type="button"
          key={item}
          onClick={() => toggle(item)}
          className={`px-4 py-2 rounded-full border ${
            selected.includes(item)
              ? "bg-orange-400 text-white border-orange-400"
              : "bg-white text-gray-800 border-gray-300"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);
export default ConvenienceSelector;
