var options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
};

export const dateNow = () => {
  const now = new Date();
  return now.toLocaleString("ru", options)
};

export default { dateNow };
