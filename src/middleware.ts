import { auth } from "@/auth.config";

export default auth;

export const config = {
  matcher: ["/dashboard/:path*"],
};
