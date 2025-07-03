import FormInput from "../util/FormInput";

const CapacitySection = ({ count, setCount }) => (
  <FormInput
    label="시간당 수용 인원 (명)"
    type="number"
    value={count}
    onChange={(e) => setCount(Number(e))}
    placeholder="예: 100"
  />
);

export default CapacitySection;
