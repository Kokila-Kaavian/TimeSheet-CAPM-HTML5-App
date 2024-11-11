const cds = require("@sap/cds");
const { UPDATE } = require('@sap/cds/lib/ql/cds-ql');

/**
 * Update the active status of user
 * @param {String} EmailId 
 * @param {Boolean} IsActive 
 * @returns Boolean
 */
const updateActiveStatus = async(EmailId, IsActive)=>{
  try{
    const { SSIUserDetails } = cds.entities;
    
    await UPDATE.entity(SSIUserDetails)
        .set({ 'IsActive':  IsActive})
        .where({ EmailId });

    return IsActive ? 'User Activated Successfully' : 'User De-Activated Successfully';
  }catch(err){
    throw err;
  }
}

module.exports = {updateActiveStatus};