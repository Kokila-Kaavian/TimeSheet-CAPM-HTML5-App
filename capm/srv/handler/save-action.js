const cds = require("@sap/cds");
const { UPSERT, INSERT } = require('@sap/cds/lib/ql/cds-ql');

/**
 * To store (insert/update) the timeSheet details
 * @param {Object} reqData props: timeSheetDetails  
 * @param {String} reqData.timeSheetDetails Json stringify - array of objects
*/
const saveAction = async(reqData, id)=>{
  try{
    const { SSITimeSheetData } = cds.entities;

    /**
    * In the save action we get the array input as jsonString
    * Here, parse the jsonString into json
    */
    const timeSheetDetails = JSON.parse(reqData.timeSheetDetails)

    /** Note: In upsert the key ID was not generated */

    // Set referenceId (EmailId) to each entry
    timeSheetDetails.forEach((timeSheetDetail)=> timeSheetDetail.ssiUserDetails_EmailId = id);

    await UPSERT.into(SSITimeSheetData, timeSheetDetails);

    return {'status': 200, 'message':'Data Stored Successfully.'}    
  }catch(err){
    throw err;
  }
}

module.exports = {saveAction}