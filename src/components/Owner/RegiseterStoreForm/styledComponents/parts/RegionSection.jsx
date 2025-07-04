import FormSelect from "../util/FormSelect";
import regionOptions from "../js/regionOption";

const RegionSection = ({ categoryAddress, setCategoryAddress }) => {
  const fullAddressList = regionOptions[0].districts; // 이미 { label, value } 형태임

  return (
    <FormSelect
      label="지역"
      value={categoryAddress}
      onChange={setCategoryAddress}
      options={fullAddressList}
    />
  );
};

export default RegionSection;
