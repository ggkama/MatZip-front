const FormSelect = ({ id, label, options, onChange, ...rest }) => (
  <div className="flex flex-col mb-4">
    <label htmlFor={id} className="font-bold mb-2">
      {label} <em className="text-red-500">*</em>
    </label>
    <select
      id={id}
      className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    >
      <option value="">선택</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;
