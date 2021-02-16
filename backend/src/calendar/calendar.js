const { google } = require("googleapis");
const { auth } = require("../google");

const calendar = google.calendar({ version: 'v3', auth });

module.exports = {
  calendar,
};
