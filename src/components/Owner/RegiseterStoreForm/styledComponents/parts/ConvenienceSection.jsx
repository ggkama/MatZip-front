import ConvenienceSelector from "../util/ConvenienceSelector";
import convenienceOptions from "../js/convenienceOptions";

const ConvenienceSection = ({ categoryConvenience, handleToggle }) => (
  <ConvenienceSelector
    options={convenienceOptions}
    selected={categoryConvenience}
    toggle={handleToggle}
  />
);

export default ConvenienceSection;
