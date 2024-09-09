const cds = require("@sap/cds");
const { SELECT } = require("@sap/cds/lib/ql/cds-ql");
const moment = require("moment");

const { weekDates } = require("./calculate-week-dates");

/**
 * To get the next week's dates and its data
 * @param {object} reqData 
 * @param {String} reqData.curSun Currently displaying sunday 
 * @returns {Object} Props: weekDates and nextWeekData
 */
const nextAction = async (reqData, id) => {
  try {
    const { SSITimeSheetData } = cds.entities;
        
    // Calculate the date of next week's Monday using current Sunday date
    const nextMon = moment.utc(reqData.curSun).add(1, "days");

    // To get the next week dates
    const nextWeek = weekDates(nextMon);

    // Retrieve the time sheet entries for next week using weekStart and weekEnd date
    const nextWeekData = await cds.run(
      SELECT.from(SSITimeSheetData).where(`EntryDate >= '${nextWeek.weekDates[0]}'`).and(`EntryDate <= '${nextWeek.weekDates[6]}'`).and('ssiUserDetails_EmailId = ', id)
    );

    const updatedNextWeekData = [];

    /*
     * Checks all dates in next week have a entry in db
     * If an entry exist, then add the entry to the "updatedNextWeekData"
     * If an entry not exist, then add the object with the date to the "updatedNextWeekData"
     */
    nextWeek.weekDates.forEach((date) => {
      const res = nextWeekData.find((detail) => detail?.EntryDate === date);

      if (!res) updatedNextWeekData.push({ 'EntryDate': date });
      else updatedNextWeekData.push(res);
    });

    return { 'weekDates': nextWeek.weekDates, 'nextWeekData': updatedNextWeekData };
  } catch (err) {
      throw err;
  }
};

module.exports = { nextAction };
