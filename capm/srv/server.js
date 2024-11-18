const cds = require("@sap/cds");
const cors = require("cors");
const cron = require("node-cron");

const passport = require('passport');
const xssec = require('@sap/xssec');
const xsenv = require('@sap/xsenv');

const { weekDates } = require("./handler/calculate-week-dates");
const { backup } = require("../srv/backup/backup");

cds.on("bootstrap", async (app) => {

  const ORIGINS = { 'https://752bdd1etrial.launchpad.cfapps.us10.hana.ondemand.com': 1 }
  app.use ((req, res, next) => {
    if (req.headers.origin in ORIGINS) {
      console.log(req);
      res.set('access-control-allow-origin', req.headers.origin) 
      if (req.method === 'OPTIONS') // preflight request
        return res.set('access-control-allow-methods', 'GET,HEAD,PUT,PATCH,POST,DELETE').end()
    }
    next()
  })

  // app.use(passport.initialize());
  // const uaaService = xsenv.getServices({'uaa': {'name': 'Helloworld-xsuaa-service'}}).uaa;
  // if (!uaaService) {
  //   throw new Error('UAA service configuration not found. Check your service binding and configuration.');
  // }
  // // Log token to ensure it's being passed
  // app.use((req, res, next) => {
  //   console.log('JWT Token:', req.headers['authorization']);  // Log the token from the headers
  //   console.log(req.headers);
  //   next();
  // });

  // console.log(uaaService, 'uaaService');
  // passport.use('JWT', new xssec.XssecPassportStrategy(uaaService));
  // app.use(passport.authenticate('JWT', {'session': false}));


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
