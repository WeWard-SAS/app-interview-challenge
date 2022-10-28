export const getLocaleMonths = (locale: string) => {
  return [...Array(12)].map((_, monthIndex) => {
    const objDate = new Date();
    objDate.setDate(1);
    objDate.setMonth(monthIndex);
    const month = objDate.toLocaleString(locale, {month: 'long'});
    return month.charAt(0).toUpperCase() + month.slice(1);
  });
};

export const getLocaleDays = (locale: string = 'fr-FR') => {
  const baseDate = new Date(Date.UTC(2017, 0, 2)); // Set date on monday
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(
      baseDate
        .toLocaleDateString(locale, {weekday: 'short'})
        .split(' ')[0]
        .toUpperCase(),
    );
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
};
