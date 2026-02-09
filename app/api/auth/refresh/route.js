import { verifyAccessToke, generateAccessToken } from "@/lib/utils/jwt";
import { serialize } from "cookie";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if(!refreshToken) {
            return Response.json({ message: "No refresh token provided" }, { status: 401 });
        }

    // Verify refresh token
    const payload = verifyAccessToke(refreshToken);

    if(!payload) {
        return Response.json({ message: "Invalid or expired refresh token" }, { status: 401 });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken({ adminId: payload.adminId, email: payload.email });

    // Set new access token cookie
    const response = Response.json({ message: "Token refreshed" }, { status: 200 });

    response.headers.append("Set-Cookie", serialize("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 15 * 60, 
        path: "/"
    }));

    return response;

    } catch (error){
        console.error("Refresh error:", error);
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}