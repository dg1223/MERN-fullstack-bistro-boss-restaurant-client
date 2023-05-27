// Similar to Python's arange() function
function arange(start, stop, step = 1) {
  const length = Math.max(Math.ceil((stop - start) / step), 0);
  const result = Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = start + i * step;
  }

  return result;
}

export default arange;
