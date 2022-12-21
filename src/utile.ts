export const isFutureDate = ({
  month,
  year,
  day,
}: {
  month: number;
  year: number;
  day: number;
}) => {
  return new Date() < new Date(year, month - 1, day);
};
