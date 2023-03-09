var config = require('./dbconfig');
const sql = require('mssql');

async function getAll() {
  try {
    let pool = await sql.connect(config);
    let locations = await pool.request().query("SELECT * from location");
    return locations.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async function getLocation(locationId) {
  try {
    let pool = await sql.connect(config);
    let location = await pool.request()
      .input('input_parameter', sql.Int, locationId)
      .query("SELECT * from location where id = @input_parameter");
    return location.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

// async function addLocation(location) {
//   try {
//     let pool = await sql.connect(config);
//     let insertLocation = await pool.request()
//       .input('id', sql.Int, location.id)
//       .input('lat', sql.VarChar, location.lat)
//       .input('lng', sql.VarChar, location.lng)
//       .execute('InsertLocation');
//     return insertLocation.recordsets;
//   }
//   catch (err) {
//     console.log(err);
//   }
// }

async function addLocation(location) {
  try {
    let pool = await sql.connect(config);
    let excute = await pool.request()
      .input('id', sql.Int, location.id)
      .input('lat', sql.VarChar, location.lat)
      .input('lng', sql.VarChar, location.lng)
      .query("INSERT INTO location VALUES (@id, @lat, @lng)");
    return excute.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAll: getAll,
  getLocation: getLocation,
  addLocation: addLocation
}