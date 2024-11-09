import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "./models/Admin.js"; // Adjust the import path as necessary
import dotenv from "dotenv";

dotenv.config({ path: './key.env' }); // Load environment variables

const addAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    const email = "admin@gmail.com"; // Replace with your desired email
    const password = "admin@123"; // Replace with your desired password

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin
    const admin = new Admin({
      email,
      password: hashedPassword
    });

    await admin.save();
    console.log("Admin added successfully!");

    mongoose.connection.close(); // Close the connection
  } catch (error) {
    console.error("Error adding admin:", error);
    mongoose.connection.close();
  }
};

addAdmin();
