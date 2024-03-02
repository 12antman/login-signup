const Database = require('../config/database');

const addTransaction = async (transaction) => {
  const [rows, fields] = await Database.execute(
    'INSERT INTO transactions (product, quantity, transaction_type, transaction_date) VALUES (?, ?, ?, ?)',
    [transaction.product, transaction.quantity, transaction.transaction_type, new Date()]
  );
  return rows.insertId;
};

const getTransactions = async () => {
  const [rows, fields] = await Database.execute('SELECT * FROM transactions ORDER BY transaction_date DESC');
  return rows;
};

module.exports = {
  addTransaction,
  getTransactions,
};