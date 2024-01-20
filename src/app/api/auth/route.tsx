import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const token = req.headers.get("token");

	if (!token) {
		return NextResponse.json({ success: false });
	}

	const decodedToken = jwt.decode(token);

	return NextResponse.json({ success: true, data: decodedToken });
}

export async function POST(req: NextRequest) {
	const token = req.headers.get("token");

	if (!token) {
		return NextResponse.json({ success: false });
	}

	return NextResponse.json(
		{ success: true },
		{
			headers: {
				"Set-Cookie": cookies()
					.set("token", token, {
						httpOnly: true,
						sameSite: "strict",
						path: "/",
						priority: "high",
					})
					.toString(),
			},
		},
	);
}
