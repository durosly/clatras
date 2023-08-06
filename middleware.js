import { NextResponse } from "next/server";

export async function middleware(request) {
	// if (request.nextUrl.pathname.startsWith('/about')) {
	//   return NextResponse.rewrite(new URL('/about-2', request.url))
	// }

	// if (request.nextUrl.pathname.startsWith('/dashboard')) {
	//   return NextResponse.rewrite(new URL('/dashboard/user', request.url))
	// }
	console.log("middleware");
}

export const config = { matcher: ["/user/:path*", "/admin/:path*"] };
