const cds = require("@sap/cds");
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');
const moment = require('moment');

const {weekDates} = require('./calculate-week-dates');

/**
 * To get the previous week's dates and its data
 * @param {Object} reqData
 * @param {String} curMon currently displaying Monday 
 * @returns {Object} Props: weekDates and previousWeekData
 */
const previousAction = async(reqData, id)=>{
  try{ 
    const { SSITimeSheetData } = cds.entities;

    // Calculate the date of previous week's Sunday using current Monday date
    const prevSun = moment.utc(reqData.curMon).subtract(1, 'days');

    // To get the previous week dates
    const previousWeek = weekDates(prevSun);

    // Retrieve the time sheet entries for previous week using weekStart and weekEnd date
    const previousWeekData = await cds.run(SELECT.from(SSITimeSheetData).where(`EntryDate >= '${previousWeek.weekDates[0]}'`).and(`EntryDate <= '${previousWeek.weekDates[6]}'`).and('ssiUserDetails_EmailId = ', id))
    
    const updatedPreviousWeekData = [];
    
    /*
     * Checks all dates in previous week have a entry in db
     * If an entry exist, then add the entry to the "updatedPreviousWeekData"
     * If an entry not exist, then add the object with the date to the "updatedPreviousWeekData"
     */
    previousWeek.weekDates.forEach((date) => {
      const res = previousWeekData.find((detail) => detail?.EntryDate === date);

      if (!res) updatedPreviousWeekData.push({ 'EntryDate': date });
      else updatedPreviousWeekData.push(res);
    });

    return {'weekDates': previousWeek.weekDates, 'previousWeekData': updatedPreviousWeekData};
  }catch(err){
    throw err;
  }
}

module.exports = {previousAction}