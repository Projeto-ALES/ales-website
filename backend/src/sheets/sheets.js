const { google } = require("googleapis");
const { auth } = require("../google");

const sheets = google.sheets({ version: "v4", auth });

module.exports = {
  sheets,
};
