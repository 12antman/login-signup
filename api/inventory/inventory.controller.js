
const Database = require('../config/database');
const NotificationService = require('../notifications/notification.service');

const getInventory = async () => {
  const [rows, fields] = await Database.execute('SELECT SN, Commodity, Date, Unit, Maximum, Minimum, Average FROM product');
  return rows;
};

const getLowInventoryProducts = async (threshold) => {
  const inventory = await getInventory();
  return inventory.filter(product => product.Minimum < threshold);
};

module.exports = {
  getInventory,
  getLowInventoryProducts,
};