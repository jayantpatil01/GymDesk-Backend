import { DataTypes } from "sequelize";
import db from "../config/Db.js";

const Admin = db.define("admin", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    plan_status: {
        type: DataTypes.ENUM("trial", "active", "expired"),
        defaultValue: "trial"
    },

    start_date: {
        type: DataTypes.DATE,
        allowNull: true
    },

    end_date: {
        type: DataTypes.DATE,
        allowNull: true
    }

}, {
    timestamps: true   
});

export default Admin;