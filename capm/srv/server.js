const cds = require("@sap/cds");
const cors = require("cors");
const cron = require("node-cron");

const { weekDates } = require("./handler/calculate-week-dates");
const { backup } = require("../srv/backup/backup");

cds.on("bootstrap", async (app) => {
  app.use(cors({ origin: "*" }));

  app.get("/", (req, res) => {
    try {
      // Get the current week dates
      const dates = weekDates();

      res.json(dates);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // API to get all time-sheet data
  app.get("/download/back-up", async (req, res) => {
    try {
      // Call the method to get the all time-sheet entries
      const timeSheetDetails = await backup();

      res.status(200).json({ timeSheetDetails });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  const task = cron.schedule("0 9,21 * * *", async () => {
    console.log('Cron executed.');
    
    await backup();
  }, {timezone:'Asia/Kolkata'});

  task.start();
});
