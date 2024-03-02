const pool = require("../../config/database");


module.exports = {
  createOrder: (data, callBack)=> {
    pool.query(

    `insert into products (Commodity, Date, Unit, Minimum, Maximum, Average)
    values(?,?,?,?,?,?)`,
    [
      data.Commodity,
      data.Date,
      data.Unit,
      data.Minimum, 
      data.Maximum,
      data.Average
    ],
    (error, results, fields) => {
      if (error) {
          callBack(error);
      }
      return callBack(null, results);
    });
  }
};