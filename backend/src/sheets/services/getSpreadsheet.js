const { sheets } = require("../sheets");

const getSpreadsheet = async (id) => {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: id,
    ranges: [],
    includeGridData: false
  });
}

module.exports = {
  getSpreadsheet,
};
