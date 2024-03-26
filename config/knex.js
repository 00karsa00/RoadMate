const knex = require('knex');

// // Knex configuration for MySQL
// const db = knex({
//   client: 'mysql',
//   connection: {
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'interview_task',
//   },
// });


// live Knex configuration for MySQL
const db = knex({
  client: 'mysql',
  connection: {
    host: 'sql6.freesqldatabase.com',
    user: 'sql6694356',
    password: 'ZgU4K8DXbz',
    database: 'sql6694356',
  },
});

// Function to reconnect
const reconnect = () => {
  console.log('Attempting to reconnect...');
  db.raw('SELECT 1')
    .then(() => {
      console.log('Reconnection successful');
    })
    .catch((error) => {
      console.error('Reconnection failed:', error);
    });
};

// Event listener for connection errors
db.on('error', (error) => {
  console.error('Database connection error:', error);
  reconnect(); // Attempt to reconnect
});

// Event listener for disconnection
db.on('disconnect', (connection) => {
  console.log('Database connection disconnected');
  reconnect(); // Attempt to reconnect
});

module.exports = db;
