import { useMemo, useRef, useState } from "react";

const useFilter = (initialState) => {
  const [filterState, setFilterState] = useState(initialState);

  const register = (name) => {
    const onChange = (event) => {
      const { value } = event.target;
      const newValue = { [name]: value };
      setFilterState((filterState) => {
        return { ...filterState, ...newValue };
      });
    };

    const returnObj = {
      name,
      value: filterState[name],
      onChange,
    };

    return returnObj;
  };

  return { values: filterState, register };
};

export default useFilter;
