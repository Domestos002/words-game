export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const sec2time = (timeInSeconds) => {
  const sec_num = parseInt(timeInSeconds, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = `0${hours}`; }
  if (minutes < 10) { minutes = `0${minutes}`; }
  if (seconds < 10) { seconds = `0${seconds}`; }
  return `${hours}:${minutes}:${seconds}`;
};

export const setInterval = (f, time) => {
  setInterval.ids = setInterval.ids || {};
  setInterval.idCount = setInterval.idCount || 0;
  const that = this;
  const id = setInterval.idCount++;
  const l = arguments.length - 2;

  (function theFn() {
    const args = [].slice.call(arguments, 0, l);
    f.apply(this, args);
    setInterval.ids[id] = setTimeout.apply(this, [theFn, time].concat(args));
  }).apply(that, [].slice.call(arguments, 2, arguments.length));
  return id;
};
