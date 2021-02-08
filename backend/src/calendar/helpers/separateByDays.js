const separateByDays = async (events) => {
  let items = {};

  await events.forEach(e => {
    let date;
    if (e.start.dateTime) {
      date = new Date(e.start.dateTime);
      date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    } else if (e.start.date) {
      date = e.start.date;
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