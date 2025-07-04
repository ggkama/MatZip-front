import FormInput from "../util/FormInput";

const StoreNameSection = ({ storeName, setStoreName }) => (
  <FormInput label="매장명" value={storeName} onChange={setStoreName} />
);

export default StoreNameSection;
