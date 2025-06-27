const FormInput = ({ id, label, onChange, ...rest }) => (
  <div className="space-y-1">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  </div>
);
export default FormInput;
