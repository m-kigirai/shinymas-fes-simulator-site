const deepCopy = obj => {
  return JSON.parse(JSON.stringify(obj));
};

// 小数点まるめ
export const round = (number, precision) => {
  const shift = function(number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    const numArray = ("" + number).split("e");
    return +(
      numArray[0] +
      "e" +
      (numArray[1] ? +numArray[1] + precision : precision)
    );
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
};

export default (_, inject) => {
  inject("deepCopy", deepCopy);
  inject("round", round);
};
