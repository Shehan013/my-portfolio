import mongoose from "mongoose";
import bcrypt from "bcrypt";
import readline from "readline";
import dotenv from "dotenv";
import path from "path";
import { resolve } from "dns";

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const Admin = mongoose.models.Admin || mongoose.model("Admin", new mongoose.Schema({
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            failedLoginAttempts: { type: Number, default: 0 },
            accountLockedUntil: Date,
            lastLoginAt: Date,
            lastLoginIP: String}, { timestamps: true }));

        // Get input
        const email = await question("Enter admin email: ");
        const password = await question("Enter admin password: ");

        if (password.length < 12) {
            console.log("Password must be at least 12 characters long.");
            process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await Admin.create({ 
            email: email.toLowerCase().trim(),
            password: hashedPassword
        });

        console.log("Admin user created successfully.");
        console.log(`Email: ${email}`);

    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        rl.close();
        await mongoose.connection.close();
        process.exit(0);
    }
}

createAdmin();