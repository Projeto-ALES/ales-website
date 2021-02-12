const separateByDays = async (events) => {
  let items = {};

  await events.forEach(e => {
    let date;
    if (e.start.dateTime) {
      date = new Date(e.start.dateTime).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    } else if (e.start.date) {
      date = new Date(e.start.date);
      date = ("0" + date.getUTCDate()).slice(-2) + "/" + ("0" + (date.getUTCMonth() + 1)).slice(-2) + "/" + date.getUTCFullYear();
    }
    if (items[date] !== undefined) {
      items[date].push(e);
    } else {
      items[date] = [e];
    }
  });
  return items;
}

module.exports = {
  separateByDays,
};