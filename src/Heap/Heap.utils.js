export const defaultComparator = (a, b) => a - b;
export const swap = (i, j, arr = []) => {
  if (i !== j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
};
