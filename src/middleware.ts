import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./utilities/i18n/config";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/admin") ||
        pathname.match(/\.[^\/]+$/)
    ) {
        return NextResponse.next();
    }

    if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};