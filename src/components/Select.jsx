import { useState } from "react";

const Select = ({ defaultSelection, options, ...rest }) => {
  return (
    <select {...rest}>
      {defaultSelection && (
        <option value={defaultSelection.value}>{defaultSelection.label}</option>
      )}

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
