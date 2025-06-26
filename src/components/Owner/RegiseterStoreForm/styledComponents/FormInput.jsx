const FormInput = ({ id, label, ...rest }) => (
  <div className="space-y-1">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
      {...rest}
    />
  </div>
);
export default FormInput;
