import bcrypt from "bcrypt";
import db from "./config/Db.js";
import Admin from "./model/AdminModel.js";

const createAdmin = async () => {
    try {
        // connect database
        await db.authenticate();
        console.log("Database connected");

        // sync model
        await db.sync();

        // hash password
        const hashedPassword = await bcrypt.hash("password", 10);

        // create admin
        const admin = await Admin.create({
            name: "Jayant Patil",
            email: "patiljayant2023@gmail.com",
            password: hashedPassword,
        });

        console.log("Admin created successfully");
        console.log(admin.toJSON());

        process.exit();
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();