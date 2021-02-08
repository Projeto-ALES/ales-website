const { processStatus } = require("./processStatus");

const addStatus = async (events) => {
  await events.forEach(e => {
    if (e.attendees) {
      if (e.attendees.find(attendee => attendee.responseStatus === "needsAction")) {
        e["processStatus"] = processStatus.PENDING;
      } else {
        e["processStatus"] = processStatus.CONFIRMED;
      }
    } else {
      e["processStatus"] = processStatus.EMPTY;
    }
  });
}

module.exports = {
  addStatus,
};