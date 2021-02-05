const { calendar } = require("../calendar");

const listEvents = async (id, start) => {
  const res = await calendar.events.list({
    calendarId: id,
    timeMin: start,
    singleEvents: true,
    orderBy: "startTime",
  });
  return res.data.items;
}

module.exports = {
  listEvents,
};