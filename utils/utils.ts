import { fetchNewTokens } from '@/app/actions';
import { AccessTokenUserType, UserType } from '@/types';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const urlGenerator = (url: string) => {
    return `${process.env.BASE_API_URL}${url}`;
}

export const decodeJwtToken = (token: string): AccessTokenUserType | null => {
    try {
        const decoded = jwt.decode(token);
        return decoded as AccessTokenUserType;
    } catch (error) {
        console.error('Invalid JWT token:', error);
        return null;
    }
}

export const checkTokenExpiry = (exp: number): boolean => {
    const currentTime = Math.floor(Date.now() / 1000);
    return exp <= currentTime;
}

export const getUser = async (): Promise<UserType | null> => {
    try {
        const token = (await cookies()).get('access')?.value;
        if (!token) {
            return null;
        }
        const decoded = jwt.decode(token);
        return decoded as UserType;
    } catch (error) {
        console.error('Invalid JWT token:', error);
        return null;
    }
}

export const getAccessToken = async (): Promise<string | null> => {
    try {
        const token = (await cookies()).get('access')?.value;
        return token ?? null;
    } catch (error) {
        console.error('Invalid JWT token:', error);
        return null;
    }
}

export const getRefreshToken = async (): Promise<string | null> => {
    try {
        const token = (await cookies()).get('refresh')?.value;
        return token ?? null;
    } catch (error) {
        console.error('Invalid JWT token:', error);
        return null;
    }
}

export const isAuthenticated = async (): Promise<boolean> => {
    const token = await getAccessToken();
    if (!token) {
        return false;
    }

    const decoded = jwt.decode(token) as AccessTokenUserType | null;
    if (!decoded) {
        return false;
    }

    return !checkTokenExpiry(decoded.exp);
}

export const revalidateTokens = async (): Promise<boolean> => {
    const refresh = await getRefreshToken();
    if (!refresh) {
        return false;
    }

    const decoded = jwt.decode(refresh) as AccessTokenUserType | null;
    if (!decoded) {
        return false;
    }

    if (checkTokenExpiry(decoded.exp)) {
        return false;
    }

    return await fetchNewTokens(refresh as string);
}