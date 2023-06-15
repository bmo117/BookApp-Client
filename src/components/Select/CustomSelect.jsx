import Select from "react-select";

function CustomSelect({ onChange, options, value, styles, isMulti }) {
  return (
    <div>
      <Select
        isMulti={isMulti}
        value={value}
        onChange={(value) => onChange(value)}
        options={options}
        styles={styles}
      />
    </div>
  );
}

export default CustomSelect;
