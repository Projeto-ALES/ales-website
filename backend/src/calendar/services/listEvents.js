const { calendar } = require("../calendar");

const listEvents = async (id, start, end) => {
  const res = await calendar.events.list({
    calendarId: id,
    timeMin: start,
    timeMax: end,
    singleEvents: true,
    orderBy: "startTime",
  });
  return res.data.items;
}

module.exports = {
  listEvents,
};