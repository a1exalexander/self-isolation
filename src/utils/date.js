var options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};

export const dateNow = () => {
  const now = new Date();
  return now.toLocaleString('ru', options);
};

export const formatDate = seconds => {
  const timestamp = seconds;
  if (!Number.isNaN(timestamp * 1000)) {
    return new Date(timestamp * 1000).toLocaleString('ru', options) || '';
  }
};

export const debugDate = () => {
  const now = new Date();
  return now.toLocaleString('ru', {
    ...options,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
};

export default { dateNow };
