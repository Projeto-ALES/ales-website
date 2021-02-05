const { calendar } = require("../calendar");

const editCalendar = async (id, title) => {
  const res = await calendar.calendars.update({
    calendarId: id,
    requestBody: {
      summary: title,
    },
  });
  return res;
}

module.exports = {
  editCalendar,
};