import FormInput from "../util/FormInput";

const MenuSection = ({ menuName, setMenuName }) => (
  <FormInput
    label="대표 메뉴"
    value={menuName}
    onChange={setMenuName}
    placeholder="예: 김치찌개, 제육볶음, 된장찌개"
  />
);

export default MenuSection;
