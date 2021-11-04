const pad = n => n.toString().padStart(2, '0');

const getFormattedTime = () => {
  const now = new Date();

  return `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(
    now.getUTCSeconds()
  )} UTC`;
};

export default getFormattedTime;
