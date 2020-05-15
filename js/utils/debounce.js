let timerId;
const debounceFunction = (func, delay) => {
  clearTimeout(timerId);
  timerId = setTimeout(func, delay);
};

export default debounceFunction;
