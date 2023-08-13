import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

async function middleware(request) {
	const path = request.nextUrl.pathname;
	const token = request.nextauth.token;

	console.log(token);

	if (path.startsWith("/admin") && !token?.isAdmin) {
		return NextResponse.redirect(new URL("/user", request.url));
	} else if (path.startsWith("/api/admin") && !token?.isAdmin) {
		return new Response(
			JSON.stringify({ status: false, message: "Unauthorized access" }),
			{
				status: 401,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	middleware,
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
);

export const config = {
	matcher: ["/user/:path*", "/admin/:path*", "/api/:path"],
};
