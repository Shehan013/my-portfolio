import connectDB from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import { comparePassword } from "@/lib/utils/password";
import { generateAccessToken, generateRefreshToken } from "@/lib/utils/jwt";    
import { serialize } from "cookie";

export async function POST(request) {
    try {
        await connectDB();

        const { email, password } = await request.json();
        
        // 1. Find admin
        const admin = await Admin.findOne({ email}).select("+password");

        // 2. Check if account is locked
        if (admin?.accountLockedUntil && admin.accountLockedUntil > new Date()) {
            const minuteLeft = Math.ceil((admin.accountLockedUntil - new Date()) / 60000);
            return Response.json({ message: `Account is locked. Try again in ${minuteLeft} minute(s).` }, { status: 423 });
        }
        
        // 3. Verify credentials
        if(!admin || !(await comparePassword(password, admin.password))) {

            if(admin) {
                admin.failedLoginAttempts += 1;

                if(admin.failedLoginAttempts >= 5) {
                    admin.accountLockedUntil = new Date(Date.now() + 30 * 60 * 1000); 
                }

                await admin.save();
            }

            return Response.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // 4. Reset failed login attempts on successful login
        admin.failedLoginAttempts = 0;
        admin.accountLockedUntil = null;
        admin.lastLoginAt = new Date();
        admin.lastLoginIP = request.headers.get("x-forwarded-for") || "unknown";
        await admin.save();

        // 5. Generate tokens
        const payload = { adminId: admin._id, email: admin.email };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // 6. Set HTTP-only cookie 
        const response = Response.json({ message: "Login successful", admin: { email: admin.email } }, { status: 200 });

        // Preventing XSS attacks from stealing tokens
        response.headers.append("Set-Cookie", serialize("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
            path: "/"
        }));

        response.headers.append("Set-Cookie", serialize("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 15 * 60, // 15 minutes in seconds
            path: "/"
        }));
        
        return response;
        
    } catch (error) {
        console.error("Login error:", error);
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}