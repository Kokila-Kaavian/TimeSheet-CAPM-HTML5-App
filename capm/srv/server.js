const cds = require("@sap/cds");
const cors = require("cors");

const { weekDates } = require("./handler/calculate-week-dates");

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
});
