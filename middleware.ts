import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, revalidateTokens } from "./utils/utils";
import { cookies } from "next/headers";

const AUTH_ROUTE = '/auth';
const PROTECTED_ROUTE = '/dashboard';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const redirectAuthenticateUser = () => {
        if (pathname.startsWith(AUTH_ROUTE)) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    const redirectUnauthenticateUser = () => {
        if (pathname.startsWith(PROTECTED_ROUTE)) {
            return NextResponse.redirect(new URL('/auth/sign-in', request.url));
        }
        return NextResponse.next();
    }

    const auth: boolean = await isAuthenticated();

    if (!auth) {
        const tokens = await revalidateTokens();

        if (!tokens) {
            const cookieStore = await cookies();
            cookieStore.delete('access');
            cookieStore.delete('refresh');

            return redirectUnauthenticateUser();
        }

        return redirectAuthenticateUser();
    }

    return redirectAuthenticateUser();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
