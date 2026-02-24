const oracledb = require('oracledb');
require('dotenv').config();

// Oracle connection configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING
};

// Connection pool for better performance
let pool;

async function initialize() {
  try {
    pool = await oracledb.createPool(dbConfig);
    console.log('✅ Oracle Database connection pool created successfully');
  } catch (err) {
    console.error('❌ Error creating Oracle connection pool:', err);
    process.exit(1);
  }
}

async function close() {
  try {
    await pool.close(10);
    console.log('Oracle connection pool closed');
  } catch (err) {
    console.error('Error closing Oracle connection pool:', err);
  }
}

function getPool() {
  return pool;
}

module.exports = {
  initialize,
  close,
  getPool
};
