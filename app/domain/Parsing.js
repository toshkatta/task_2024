export const arrayToById = (array) => (
  array.reduce(
    (byId, element) => ({
      ...byId,
      [element.id]: element,
    }),
    {}
  )
);

export const reverseObject = (obj) => Object.keys(obj).reduce((ret, key) => {
  ret[obj[key]] = key;
  return ret;
}, {});
