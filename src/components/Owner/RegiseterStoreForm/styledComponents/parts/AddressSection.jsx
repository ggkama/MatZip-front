import FormInput from "../util/FormInput";

const AddressSection = ({
  storeAddress1,
  setStoreAddress1,
  storeAddress2,
  setStoreAddress2,
}) => (
  <>
    <FormInput label="주소" value={storeAddress1} onChange={setStoreAddress1} />
    <FormInput
      label="상세 주소"
      value={storeAddress2}
      onChange={setStoreAddress2}
    />
  </>
);

export default AddressSection;
