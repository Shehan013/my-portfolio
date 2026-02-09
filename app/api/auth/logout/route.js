import { serialize } from "cookie";

export async function POST(request) {
    // Clear both tokens by setting expired cookies
    const response = Response.json({ message: "Logged out successfully" }, { status: 200 });

    response.headers.append("Set-Cookie", serialize("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 0, // Expire immediately
        path: "/"
    }));

    response.headers.append("Set-Cookie", serialize("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 0,
        path: "/"
    }));

    return response;
}