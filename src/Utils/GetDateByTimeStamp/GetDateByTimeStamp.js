export const calculateTimeDifference = (createdAt) => {
  const createdDate = new Date(
    createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
  );
  const now = Date.now();
  const difference = now - createdDate.getTime();
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} minutes ago`;
  return `${seconds} seconds ago`;
};

export const GetDateByTimeStamp = ({ dateProvided }) => {
  const CompletedData = new Date(
    dateProvided?.seconds * 1000 + dateProvided?.nanoseconds / 1000000
  ).toLocaleString();
  const TimeDifferenceDate = calculateTimeDifference(dateProvided);
  return {
    CompletedData,
    TimeDifferenceDate,
  };
};
