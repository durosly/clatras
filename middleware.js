import { NextResponse } from "next/server";

export async function middleware(request) {
	const token = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY);

	console.log(token);
	if (!token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// const account = clientServer
	// if (request.nextUrl.pathname.startsWith('/about')) {
	//   return NextResponse.rewrite(new URL('/about-2', request.url))
	// }

	// if (request.nextUrl.pathname.startsWith('/dashboard')) {
	//   return NextResponse.rewrite(new URL('/dashboard/user', request.url))
	// }
	console.log("middleware");
}

export const config = { matcher: ["/user/:path*", "/admin/:path*"] };
