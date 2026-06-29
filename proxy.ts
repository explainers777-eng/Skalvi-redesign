import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname;
      if (path === "/secure-admin") {
        return true;
      }
      if (path.startsWith("/secure-admin") || path.startsWith("/api/admin")) {
        return Boolean(token?.role);
      }
      return true;
    }
  }
});

export const config = {
  matcher: ["/secure-admin/:path*", "/api/admin/:path*"]
};
