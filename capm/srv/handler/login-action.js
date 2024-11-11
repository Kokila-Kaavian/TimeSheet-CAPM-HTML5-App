const cds = require("@sap/cds");
const { SELECT } = require("@sap/cds/lib/ql/cds-ql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Login action to authenticate a user and return a JWT token
 * @param {Object} loginDetails - Contains userName and password
 * @returns {Object} props: token - JWT token if authentication is successful
 * @throws {Error} - Throws an error when user not found or invalid password or any error.
 */
const loginAction = async (loginDetails) => {

  try {

    // Destructure userName and password from loginDetails object
    const { userName, password } = loginDetails;

    // Retrieve the JWT secret key from environment variable
    const secretKey = process.env.JWT_SECRET_KEY;

    // Get the entity definition for users
    const { SSIUserDetails } = cds.entities;

    // Query the database to find the user by username (in this case, EmailId)
    const user = await cds.run(
      SELECT.one.from(SSIUserDetails).where({ EmailId: userName.toLowerCase() })
    );

    // If the user is not found, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    if(!user.IsActive) throw new Error('Your account was de-activated. You can\'t login!');

    // Compare the hashed password from the database with the provided password
    const isMatch = await bcrypt.compare(password, user.Password);

    // If the password does not match, throw an error
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    // If the password matches, generate a JWT token
    const token = jwt.sign({ id: user.EmailId }, secretKey);

    // Return the generated JWT token
    return {token};
  } catch (err) {

    // If any error occurs, throw it to be handled by the caller
    throw err;
  }
};

// Export the loginAction function to be used in other parts of the application
module.exports = { loginAction }; 
