import { Sequelize } from 'sequelize';

const pool = {
  user: 'root',
  host: 'localhost',
  database: 'TEST',
  password: 'Database@123',
  port: 5432,
};

const sequelize = new Sequelize(pool.database, pool.user, pool.password, {
  host: pool.host,
  dialect: 'mysql',
  logging: false
})

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export { sequelize as DB };