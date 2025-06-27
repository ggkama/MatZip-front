const FormSelect = ({ id, label, options, ...rest }) => (
  <div className="space-y-1">
    <label htmlFor={id}>{label}</label>
    <select
      id={id}
      className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
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
