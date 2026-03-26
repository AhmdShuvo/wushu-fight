import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // Protection for all admin pages
        if (path.startsWith("/admin")) {
            // If not logged in at all (NextAuth handles this via withAuth redirecting to signIn page)
            // Check for specific roles
            const role = token?.role as string;
            if (role !== "admin" && role !== "super_admin") {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/login",
        }
    }
);

export const config = {
    matcher: ["/admin/:path*"],
};
