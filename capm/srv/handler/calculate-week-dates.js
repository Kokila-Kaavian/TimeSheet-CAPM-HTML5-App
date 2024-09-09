const moment = require('moment');

/**
 * Determine the weekStart and weekEnd and week's 7 days
 * @param {String} date 
 * @returns {Object} props: weekDates
 */
const weekDates = (date)=>{
  try{
    // Initialize the currentDate based on the input date; if no date is provided, use the current date
    const currentDate = date ? moment.utc(date) : moment.utc();
    console.log(moment.utc(), currentDate);
    
    // Clone currentDate and set it to the start and end of the week (isoWeek: Monday - Sunday)
    const weekStart = currentDate.clone().startOf('isoWeek');
    const weekEnd = currentDate.clone().endOf('isoWeek');
    
    // Initialize an array to hold the dates for the entire week
    const particularWeekDates = [];
    
    // Calculate the each date of the week using weekStart date
    for(let i=0; i<=6; i++){
      particularWeekDates.push(moment.utc(weekStart).add(i, 'days').format('YYYY-MM-DD'));
    }

    return {'weekDates':particularWeekDates};
  }catch(err){
    throw err;
  }
}

module.exports = {weekDates};