import FormSelect from "../util/FormSelect";
import foodTypeOptions from "../js/foodTypeOptions";

const FoodtypeSection = ({ categoryFoodtype, setCategoryFoodtype }) => (
  <FormSelect
    label="음식 종류"
    value={categoryFoodtype}
    onChange={setCategoryFoodtype}
    options={foodTypeOptions}
  />
);

export default FoodtypeSection;
