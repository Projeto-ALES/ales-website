const { google } = require("googleapis");
const { auth } = require("./googleAuth");

const calendar = google.calendar({ version: 'v3', auth });

module.exports = {
  calendar,
};