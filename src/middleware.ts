import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./utilities/i18n/config";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for Next.js internal routes and static files
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/admin") ||
        pathname.match(/\.[^\/]+$/)
    ) {
        return NextResponse.next();
    }

    // If the pathname already starts with a valid locale, let it pass through
    if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
        return NextResponse.next();
    }

    // For root path, redirect to default locale
    if (pathname === "/") {
        return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
    }

    // For other paths without locale, redirect to default locale
    // This will allow Next.js to handle 404s properly
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};