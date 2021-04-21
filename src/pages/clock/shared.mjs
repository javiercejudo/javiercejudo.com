const pad = n => n.toString().padStart(2, '0');

const getFormattedTime = () => {
  const now = new Date();

  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
    now.getSeconds()
  )}`;
};

export default getFormattedTime;
