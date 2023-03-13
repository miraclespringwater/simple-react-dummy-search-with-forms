import { useMemo, useRef, useState } from "react";

const useFilter = () => {
  const [filterState, setFilterState] = useState({});

  const useRegister = (name, initialValue) => {
    useMemo(() => {
      const newValue = { [name]: initialValue };
      setFilterState((filterState) => {
        return { ...filterState, ...newValue };
      });
    }, [name, initialValue]);

    const ref = useRef();

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
      ref,
    };

    return returnObj;
  };

  console.log(filterState);

  return { filterValues: filterState, register: useRegister };
};

export default useFilter;
