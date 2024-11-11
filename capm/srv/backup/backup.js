const cds = require("@sap/cds");
const { SELECT } = require("@sap/cds/lib/ql/cds-ql");

const { writeDataInExcel } = require("./write-in-excel");

/**
 * To get the all time-sheet entries
 * @returns {Array<Object>}
 */
const backup = async () => {
  try {
    const { SSITimeSheetData } = cds.entities;

    // Query to get all time sheet entries
    const response = await cds.run(SELECT.from(SSITimeSheetData));

    console.log(response?.length, "response data length from production SSITImeSheetData table");

    // Write the response(Time sheet entries) in excel file
    await writeDataInExcel(response);

    return true;
  } catch (err) {
    console.log('Fetch from DB', err);
  }
};

module.exports = { backup };
