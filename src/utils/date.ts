export const formatDate = (date?: string | null) => {
  if (date) {
    const formattedDate = new Date(date);
    return formattedDate.toDateString();
  } else {
    return null;
  }
};
