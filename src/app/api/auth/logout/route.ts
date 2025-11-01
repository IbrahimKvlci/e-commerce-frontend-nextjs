import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("a")
    const response =  NextResponse.json({ success: true });
    response.cookies.set({
        name: "token",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0, // 1 day
      });

    return response
}