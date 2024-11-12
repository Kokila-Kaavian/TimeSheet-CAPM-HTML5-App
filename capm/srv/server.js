const cds = require("@sap/cds");
const cors = require("cors");
const cron = require("node-cron");

const { weekDates } = require("./handler/calculate-week-dates");
const { backup } = require("../srv/backup/backup");

cds.on("bootstrap", async (app) => {
  console.log('is enter');
  const ORIGINS = { 'https://752bdd1etrial.launchpad.cfapps.us10.hana.ondemand.com': 1 }
  app.use ((req, res, next) => {
    if (req.headers.origin in ORIGINS) {
      console.log(req.headers.origin);
      res.set('access-control-allow-origin', req.headers.origin)
      if (req.method === 'OPTIONS') // preflight request
        return res.set('access-control-allow-methods', 'GET,HEAD,PUT,PATCH,POST,DELETE').end()
    }
    next()
  })

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
