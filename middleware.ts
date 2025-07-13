import { auth } from "~/server/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Allow access to auth pages
  if (nextUrl.pathname.startsWith("/auth/")) {
    return;
  }

  // Protect dashboard routes
  if (nextUrl.pathname.startsWith("/dashboard") && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/"]
};
