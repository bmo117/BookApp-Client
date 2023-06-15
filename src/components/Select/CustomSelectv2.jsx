import Select from "react-select";

function CustomSelectv2({
  onChange,
  options,
  value,
  styles,
  isMulti,
  defaultValue,
}) {
  const arrPrb = ["e", "3", "4"];
  return (
    <div>
      <Select
        isClearable
        isSearchable
        defaultValue={defaultValue}
        isMulti={isMulti}
        onChange={(value) => onChange(value)}
        options={options}
        styles={styles}
      />
    </div>
  );
}

export default CustomSelectv2;
