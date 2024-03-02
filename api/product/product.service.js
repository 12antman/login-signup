const pool = require("../../config/database");
module.exports = {
createProduct: (data, callBack)=> {
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
},

  getProducts: (callBack) => {
    pool.query(
      `select Commodity, Date, Unit, Minimum, Maximum, Average FROM products`,
       [],
      (error, results, fields) => {
          if (error) {
              return callBack(error);
          }
          return callBack(null, results);
        }
    );
  },


updateProduct: (data, callBack) => {
  pool.query(
      `update products set Commodity=?, Date=?, Unit=?, Minimum=?, Maximum=?, Average=? where SN=?  `,
      [
      data.Commodity, 
      data.Date,
      data.Unit,
      data.Maximum,
      data.Minimum,
      data.Average,
      data.SN
      ],
      (error, results, fields) => {
          if (error) {
              return callBack(error);
          }
          return callBack(null, results[0]);
      }
   );
  },


  deleteProduct: (data, callBack) => {
  pool.query(
      `delete from registration where id=?`,
      [data.id],
      (error, results, fields) => {
          if (error) {
              return callBack(error);
          }
          return callBack(null, results[0]);
      }
  );
}
};