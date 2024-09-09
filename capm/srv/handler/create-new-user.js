const cds = require("@sap/cds");
const bcrypt = require('bcrypt');

/**
 * Create a new user
 * @param {Object} userDetails - The input parameters 
 * @param {String} userDetails.emailId
 * @param {String} userDetails.title
 * @param {String} userDetails.personName
 * @param {String} params.password - The plain text password that needs to be hashed.
 * @returns {Object} - message.
 * @throws {Error} - Throws an error if the password hashing fails.
 */
const createNewUser = async (userDetails) => {
  try {
    const { SSIUserDetails } = cds.entities;

    //Generate a salt for hashing.The salt is a random value added to the password before hashing to enhance security.
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt.
    const hashedPassword = await bcrypt.hash(userDetails.password, salt);

    await INSERT.into(SSIUserDetails).entries([{'EmailId':userDetails.emailId, 'Password':hashedPassword, 'Title':userDetails.title, 'PersonName':userDetails.personName}]);

    //Return the hashed password.
    return {'message': 'New user added successfully'};

  } catch (err) {
    //Handle any errors that occur during the hashing process.
    throw err;
  }
}

module.exports = { createNewUser };
