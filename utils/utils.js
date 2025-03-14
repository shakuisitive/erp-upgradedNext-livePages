export const checkNull = (value) => {
  return value === undefined || value === null || value === "";
};

export const multiFiltersData = (
  filters = [],
  data = [],
  targetField = "",
  condition = ""
) => {
  if (checkNull(filters) || checkNull(data) || checkNull(targetField)) return [];
  let result = [];

  for (let key of filters) {
    if (!checkNull(condition) && condition.toLowerCase() === "not") {
      result = data.filter((item) => filters.indexOf(item[targetField]) === -1);
    } else {
      result = data.filter((item) => filters.indexOf(item[targetField]) !== -1);
    }
  }
  return result;
};
