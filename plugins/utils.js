const deepCopy = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default (_, inject) => {
  inject("deepCopy", deepCopy);
};
