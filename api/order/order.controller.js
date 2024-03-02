const {createOrder} = require('./order.service');

module.exports= {
  createOrder:(req, res)=> {
    const body= req.body;
    createOrder (body, (err,results)=> {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success:0,
        message:"Database connection error"
      });
    }
    return res.status(200).json({
      success:1,
      data: results
    })
  });
}
}