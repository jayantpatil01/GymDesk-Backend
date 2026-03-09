import { Sequelize } from "sequelize";


const db = new Sequelize("gymdesk", "root", "Jayant8806", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
}); 

export default db;