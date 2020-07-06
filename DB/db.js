const { Client } = require("pg");

const connectionString = "postgres://postgres:12345@localhost:5432/Parking Lot";
const client = new Client({
  connectionString: connectionString,
});

//Database connection initializer
const init = () => {
  client.connect();
};

//Fetch all plate records from the database
const getAllPlates = (cb) => client.query("SELECT * FROM plates", cb);

//Insert the data of the plate into the database
const insertPlate = (plateText, isPermitted, type, plateFilePath, cb) => {
  client.query(
    `INSERT INTO public.plates(
	    plate_id, plate_text, is_permitted, type, date, plate_file_path)
	    VALUES (DEFAULT, '${plateText}', ${isPermitted}, '${type}', DEFAULT, '${plateFilePath}');`,
    (err) => {
      if (err) console.error(err);
      cb();
    }
  );
};

module.exports = {
  init,
  getAllPlates,
  insertPlate,
};
