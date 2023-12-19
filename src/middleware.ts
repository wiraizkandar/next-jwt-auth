import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(request: NextRequest) {
	const token = await getToken({
		req: request,
		secret: process.env.AUTH_SECRET,
	});

	if (token && !request.nextUrl.pathname.startsWith("/dashboard")) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
		return NextResponse.redirect(new URL("/", request.url));
	}
}

export const config = {
	matcher: ["/", "/dashboard"],
};
