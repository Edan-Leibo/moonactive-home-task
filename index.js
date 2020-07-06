const express = require("express");
const fileUpload = require("express-fileupload");
const uniqid = require("uniqid");

const db = require("./DB/db");
const getText = require("./API/ocrAPI");
const checkType = require("./utils/checkFunctions");
const logger = require("./utils/logger");

//Set logger mode to verbose in order to see log messages
//Comment out the next line if you don't want the logger to work
logger.mode = "verbose";

//Establish DB connection
db.init();
logger("DB connection established");

//Create a new Express app
const app = express();

//Set up middlewares
app.use(fileUpload());
app.use(express.static("Client"));

//Set up endpoints
//Get all plates in DB
app.get("/plates", (req, res, next) => {
  logger("Incoming GET request for all plates");
  db.getAllPlates((err, result) => {
    if (err) {
      console.error(err);
      return res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

//Identify a new plate
app.post("/upload", async (req, res) => {
  logger("Incoming POST request with a plate");

  if (!req.files || Object.keys(req.files).length === 0) {
    logger("Received request with no plate image");
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field is used to retrieve the uploaded file
  let plateImage = req.files.plateImage;
  const plateFilePath = `${__dirname}\\images\\${uniqid.time("img-")}.jpg`;

  // Use the mv() method to place the file on the server
  await plateImage.mv(plateFilePath);
  logger("Saved the plate image on the server");

  //Figure out the text on the plate
  logger("Making an API call to read the text from the image");
  const plateText = await getText(plateFilePath);
  if (plateText === null) {
    return res.status(400).send(`<h2> Unable to process the image </h2>`);
  }
  logger(`Text read after clean up: ${plateText}`);

  //Check the type of the vehicle
  const type = checkType(plateText);
  logger(`The type of the vehicle: ${type}`);

  const permitted = type === "regular";
  logger(`Allow the vehicle to enter: ${permitted}`);

  //Write info to DB
  db.insertPlate(plateText, permitted, type, plateFilePath, () => {
    logger("Vehicle was saved to Database");

    res.send(`<h1>Welcome!</h1>
    <p><b>Plate text:</b> ${plateText}</p>
    <p><b>Type:</b> ${type}</p>
    <p><b>Permitted:</b> ${permitted}</p>  
    `);
  });
});

const port = process.env.PORT || 8000;

//Start the app
app.listen(port, () => console.log(`App is listening on port ${port}.`));
