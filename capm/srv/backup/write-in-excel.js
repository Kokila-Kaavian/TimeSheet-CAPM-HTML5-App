const xlsx = require("xlsx");
const { storeToGoogleDrive } = require("./store-to-google-drive");

/**
 * Write timeSheet details in excel file
 * @param {Array<object>} timeSheetDetails
 * @returns
 */
const writeDataInExcel = async (timeSheetDetail) => {
  try {
    // Create a new workbook instance
    const workbook = xlsx.utils.book_new();

    // Create a sheet with json_data
    const ws = xlsx.utils.json_to_sheet(timeSheetDetail);

    // Append the sheet into the workbook
    xlsx.utils.book_append_sheet(workbook, ws, "time-sheet-details");

    // Convert the workbook into buffer
    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    console.log("Successfully written in excel.");

    // Method to store the excel file in a Drive (kvnvnr.rvhero@kaaviansys.com)
    await storeToGoogleDrive(buffer);

    return;
  } catch (err) {
    console.log('Write in Excel', err);
  }
};

module.exports = { writeDataInExcel };
