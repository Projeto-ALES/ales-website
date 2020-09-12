const parseDropdownOptions = (value, text, data) => {
  return data.map((item, index) => {
    return {
      id: index,
      value: item[value],
      text: item[text],
      selected: false,
      disabled: false,
    };
  });
};

export default parseDropdownOptions;
