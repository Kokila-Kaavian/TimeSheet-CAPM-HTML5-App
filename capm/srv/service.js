const cds = require("@sap/cds"); 
const jwt = require('jsonwebtoken')


// Import custom handlers for various actions
const { weekDates } = require("./handler/calculate-week-dates");
const { previousAction } = require("./handler/previous-action");
const { nextAction } = require("./handler/next-action");
const { saveAction } = require("./handler/save-action");
const { updateCurrentWeekDetails } = require('./handler/update-current-week-details');
const { loginAction } = require("./handler/login-action");
const { createNewUser } = require("./handler/create-new-user");
const { updateActiveStatus } = require('./handler/update-active-status');

// Define the timeSheetSSI service class extending from cds.ApplicationService
class timeSheetSSI extends cds.ApplicationService {

  // Initialize the service
  async init() {

    // Import the entity from 'service.cds'
    const { SSITimeSheetData , SSIUserDetails } = this.entities;

    // Define a before request handler to log user information
    this.before("*", async (req) => {
      // Log user details for debugging purposes
      console.log(req.user); 
    });

    // Define a before READ request handler for the SSITimeSheetData entity
    this.before("READ", SSITimeSheetData, (req) => {
      try {
        console.log('is enter');
        console.log(req.user); 
        // const {token} = req.headers;
        // const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const id = 'kokila.ss@kaaviansys.com';

        // Calculate the dates for the current week
        const currentWeek = weekDates();
         
        // Filter the query to get entries for the current week
        // req.query.where(`EntryDate >= '${currentWeek.weekDates[0]}'`).and(`EntryDate <= '${currentWeek.weekDates[6]}'`).and('ssiUserDetails_EmailId = ', id);
      } catch (err) {
        // Handle any errors that occur during this process
        req.error({ status: 500, message: err.message });
      }
    });

    // Define a before READ request handler for the SSIUserDetails entity
    this.before("READ", SSIUserDetails, (req) => {
      try {
        // Get token from headers
        // const token = req.headers.token;

        // //Retrieve id from the token after verifying with secret key 
        // const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Filter the query to get details of the logged in user
        // req.query.where({ EmailId: id });
      } catch (err) {
        // Handle any errors that occur during this process
        req.error({ status: 500, message: err.message });
      }
    });

    // Define an after READ request handler to update current week details
    this.after("READ", SSITimeSheetData, (data) => {
      try {
        // Update details for the current week after data retrieval
        updateCurrentWeekDetails(data);
      } catch (err) {
        // Log any errors that occur during this process
        console.log(err);
      }
    });

    // Define a handler for the "previous" action
    this.on("previous", async (req) => {
      try {
        const {token} = req.headers;
        const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Process the previous action and return the response
        const response = await previousAction(req.data, id);

        return response;
      } catch (err) {
        // Handle any errors that occur during this process
        req.error({ status: 500, message: err.message });
      }
    });

    // Define a handler for the "next" action
    this.on("next", async (req) => {
      try {
        const {token} = req.headers;
        const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Process the next action and return the response
        const response = await nextAction(req.data, id);

        return response;
      } catch (err) {
        // Handle any errors that occur during this process
        req.error({ status: 500, message: err.message });
      }
    });

    // Define a handler for the "save" action
    this.on("save", async (req) => {
      try {

        const {token} = req.headers;
        const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Process the save action and return the response
        const response = await saveAction(req.data, id);

        return response;
      } catch (err) {
        // Handle any errors that occur during this process
        req.error({ status: 500, message: err.message });
      }
    });

    // Define a handler for the "login" action
    this.on("login", async (req) => {
      try {        
        // Process the login action and return the response
        const response = await loginAction(req.data);

        return response;
      } catch (err) {
        // Handle any errors that occur during this process
        req.error({ status: 500, message: err.message });
      }
    });

    // Define a handler for the "newUser" action
    this.on("newUser", async (req) => {
      try {
        // Create a new user
        const response = await createNewUser(req.data);
        
        return response;
      } catch (err) {
        // Handle any errors that occur during this process
        req.error({ status: 500, message: err.message });
      }
    });

    // Update user active status
    this.on("UPDATE", SSIUserDetails, async(req) => {
      try {
        
        // Call the method to update the active status
        const message = await updateActiveStatus(req.data.EmailId, req.data.IsActive);

        return ({message})
      } catch (err) {
        // Handle any errors that occur during this process
        req.error({ status: 500, message: err.message });
      }
    });
    
    // Call the parent class init method
    super.init();
  }
}

// Export the timeSheetSSI class as a module
module.exports = timeSheetSSI;
