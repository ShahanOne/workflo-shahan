const formatDate = (dateString) => {
  const [year, month, day] = dateString?.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};
export default formatDate;
