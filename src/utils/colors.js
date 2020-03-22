export const colors = [
  '#6B778C',
  '#2684FF',
  '#00C7E5',
  '#57D9A3',
  '#FFC400',
  '#FF7452',
  '#8777D9',
  '#f8b195',
  '#fcf7bb',
  '#cbe2b0',
  '#a6b1e1',
  '#dcd6f7',
  '#a7e9af',
  '#cbf1f5'
];

export const getValidColor = (color) => {
  return colors
    .map(item => String(item).toUpperCase())
    .includes(String(color).toUpperCase())
    ? color
    : colors[0];
}

export default colors;
