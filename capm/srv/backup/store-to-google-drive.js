const path = require("path");
const { Readable } = require("stream");
const { google } = require("googleapis");

/**
 * To store the excel file (time-sheet-details) in google drive
 * @param {Buffer} buffer
 */
const storeToGoogleDrive = async (buffer) => {
  try {
    let fileId;

    /**
     * Convert buffer to Readable stream
     * @param {Buffer} buffer
     * @returns {Readable} readable stream
     */
    const bufferToStream = (buffer) => {
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      return stream;
    };

    // Service account credentials file path -Authentication
    const keyFilePath = path.join(`${__dirname}/time-sheet-credentials.json`);
    // Full access to Google Drive (create, delete, modify, and read files). -Authorization
    const scopes = ["https://www.googleapis.com/auth/drive"];

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: scopes,
    });

    const folderId = process.env.DRIVE_FOLDER_ID;

    // Retrieve the file based on its name and the parent folder's ID (folderId)
    const existingFile = await google
      .drive({ version: "v3", auth })
      .files.list({
        q: `name='time-sheet-details' and '${folderId}' in parents`,
        fields: "files(id, name)",
      });

    /**
     * Checks if the file already exists in Google Drive
     * If it exist, update the file
     * Else create a file with given name in the parentFolder
     */
    if (existingFile.data.files.length) fileId = existingFile.data.files[0].id;

    if (fileId) {
      // Update a file by existing FileId
      await google.drive({ version: "v3", auth: auth }).files.update({
        fileId: fileId,
        media: {
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          body: bufferToStream(buffer),
        },
        requestBody: {
          name: "time-sheet-details",
        },
      });
    } else {
      // Create a file if there is no file exist
      await google.drive({ version: "v3", auth: auth }).files.create({
        media: {
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          body: bufferToStream(buffer),
        },
        requestBody: {
          name: "time-sheet-details",
          parents: [folderId],
        },
      });
    };

    console.log("Successfully uploaded in drive.");

    return;
  } catch (err) {
    console.log('Upload the excel in Drive.', err);
  }
};

module.exports = { storeToGoogleDrive };
