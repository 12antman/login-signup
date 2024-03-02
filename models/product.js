class Product {
    constructor(sn, commodity, date, unit, minimum, maximum, average) {
      this.sn = sn;
      this.commodity = commodity;
      this.date = date;
      this.unit = unit;
      this.minimum = minimum;
      this.maximum = maximum;
      this.average = average;
    }
  }
  
  module.exports = Product;