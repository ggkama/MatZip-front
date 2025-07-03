import FormInput from "../util/FormInput";

const TimeSection = ({ openTime, setOpenTime, closeTime, setCloseTime }) => (
  <>
    <FormInput
      label="영업 시작 시간"
      type="time"
      value={openTime}
      onChange={setOpenTime}
    />
    <FormInput
      label="영업 종료 시간"
      type="time"
      value={closeTime}
      onChange={setCloseTime}
    />
  </>
);

export default TimeSection;
