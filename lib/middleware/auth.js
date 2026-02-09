import { verifyAccessToken } from "../utils/jwt";
import { cookies } from "next/headers";

export async function requireAuth(request){
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if(!accessToken){
            return { 
                isAuthenticated: false,
                error: "No access token provided",
                status: 401
            };
        }

        const payload = verifyAccessToken(accessToken);

        if (!payload) {
            return {
                isAuthenticated: false,
                error: "Invalid or expired access token",
                status: 401
            };
        }

        return {
            isAuthenticated: true,
            admin: {
                id: payload.adminId,
                email: payload.email
             }
        };
    
    } catch (error) {
        console.error("Auth middleware error:", error);
        return {
            isAuthenticated: false,
            error: "Internal server error",
            status: 500
        };
    }
}