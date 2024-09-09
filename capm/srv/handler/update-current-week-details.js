const {weekDates} = require('./calculate-week-dates');

// Update the current week details
const updateCurrentWeekDetails = (data) => {
  try {
    // To get the current week dates
    const currentWeek = weekDates();

    const originalData = [...data];
    data.length = 0;

    /*
     * Checks all dates in current week have a entry in db
     * If an entry exist, then add the entry to the "data"
     * If an entry not exist, then add the object with the date to the "data"
     */
    currentWeek.weekDates.forEach((date) => {
      const res = originalData.find((detail) => detail?.EntryDate === date);

      if (!res) data.push({ EntryDate: date });
      else data.push(res);
    });

    return;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { updateCurrentWeekDetails };
