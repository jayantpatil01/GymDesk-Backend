import db from './Db.js';
import AdminModel from '../model/AdminModel.js';

export const testConnection = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');

        await db.sync({ alter: true });
        console.log('All models were synchronized successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};