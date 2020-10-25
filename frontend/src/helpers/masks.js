export const phoneMask = (value) => {
  return value
    .replace(/[A-Za-z]/g, "")
    .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    .replace(/(-\d{4})\d+?$/, "$1");
};

export const formatPhone = (phone) => {
  return phone.replace(/[-()]/g, "").replace(/\s/g, "");
};

export const formatDateToReceive = (dateString) => {
  return new Date(dateString).toLocaleDateString("pt-BR");
};
