import { DataTypes } from "sequelize";
import db from "../config/Db.js";
import Admin from "./AdminModel.js";


const Member = db.define("member", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Admin,
            key: "id"
        },
    },
    fullname:{
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
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    dob:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    gender:{
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false
    },
    address:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    aadhar_image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    emergency_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    emergency_phone: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true   
});
Admin.hasMany(Member, { foreignKey: "adminId", onDelete: "CASCADE" });
Member.belongsTo(Admin, { foreignKey: "adminId" });


export default Member;
