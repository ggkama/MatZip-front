const ConvenienceSelector = ({ options, selected, toggle }) => (
  <div className="space-y-1">
    <label className="block font-bold mb-2">
      편의시설 <em className="text-red-500">*</em>
    </label>
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => {
        const isSelected = selected.includes(opt.key);
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => toggle(opt.key)}
            className={`px-4 py-2 rounded-md border 
              ${
                isSelected
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300"
              }
              hover:shadow-md transition`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  </div>
);

export default ConvenienceSelector;
