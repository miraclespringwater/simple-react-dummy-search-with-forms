import { useMemo, useRef, useState, useId } from "react";

const unpackFormData = (formData) => {
  const unpacked = {};

  Array.from(formData.entries()).forEach((entry) => {
    unpacked[entry[0]] = entry[1];
  });

  return unpacked;
};

const useFilter = ({ defaultValues, resetValueWhen }) => {
  const [filterState, setFilterState] = useState(defaultValues);
  const formRef = useRef(null);

  const handleValueResets = (formData) => {
    const returnData = { ...formData };
    Object.keys(formData).forEach((key) => {
      if (resetValueWhen[key] && resetValueWhen[key](formData)) {
        returnData[key] = defaultValues[key];
      }
    });
    return returnData;
  };

  const register = (name) => {
    const onChange = () => {
      const formData = unpackFormData(new FormData(formRef.current));
      const resetData = handleValueResets(formData);
      setFilterState(resetData);
    };

    const returnObj = {
      name,
      value: filterState[name],
      onChange,
    };

    return returnObj;
  };

  const resetField = (field) => {
    setFilterState((filterState) => {
      return { ...filterState, [field]: defaultValues[field] };
    });
  };

  return { formRef, values: filterState, register: register, resetField };
};

export default useFilter;
