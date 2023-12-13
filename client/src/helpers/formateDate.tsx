export const formateDate = (date: Date) => {
  const date_ = new Date(date);
  return `${date_.getFullYear()}-${date_.getMonth() + 1}-${date_.getDate()}`;
};
