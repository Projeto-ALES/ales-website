const { calendar } = require("../calendar");

const createCalendar = async (title) => {
  const res = await calendar.calendars.insert({
    requestBody: {
      summary: title,
      timeZone: "America/Sao_Paulo",
    },
  });

  await calendar.acl.insert({
    calendarId: res.data.id,
    requestBody: {
      role: "owner",
      scope: {
        type: "user",
        value: process.env.CALENDAR_EMAIL,
      },
    },
  });
  return res;
}

module.exports = {
  createCalendar,
};