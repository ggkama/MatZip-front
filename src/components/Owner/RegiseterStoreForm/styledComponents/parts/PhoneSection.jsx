import FormInput from "../util/FormInput";
import { formatPhoneNumber } from "../js/phone";

const PhoneSection = ({ storePhone, setStorePhone }) => (
  <FormInput
    label="전화번호"
    value={storePhone}
    onChange={(e) => setStorePhone(formatPhoneNumber(e))}
    placeholder="예: 010-1234-5678"
  />
);

export default PhoneSection;
