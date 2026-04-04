import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // All routes are public — auth just enriches the request with session info.
  // Add route protection here if needed (e.g. /dashboard).
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
};
