import { fetchNewTokens } from '@/app/actions';
import { AccessTokenUserType, UserType } from '@/types';

export const checkTokenExpiry = (exp: number): boolean => {
    const currentTime = Math.floor(Date.now() / 1000);
    return exp <= currentTime;
}

export const urlGenerator = (url: string) => {
    return `${process.env.BASE_API_URL}${url}`;
}

export const decodeJwtToken = (token: string): AccessTokenUserType | null => {
    try {
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('Invalid JWT token');
        }

        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(char => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}

export const getUser = (token: string | undefined): UserType | null => {
    try {
        if (!token) {
            return null;
        }
        const decoded = decodeJwtToken(token);
        return decoded as UserType;
    } catch (error) {
        return null;
    }
}

export const isAuthenticated = (token: string | undefined): boolean => {
    if (!token) {
        return false;
    }

    const decoded = decodeJwtToken(token) as AccessTokenUserType | null;
    if (!decoded) {
        return false;
    }

    return !checkTokenExpiry(decoded.exp);
}

export const revalidateTokens = async (refresh: string | undefined): Promise<boolean> => {
    if (!refresh) {
        return false;
    }

    const decoded = decodeJwtToken(refresh) as AccessTokenUserType | null;
    if (!decoded) {
        return false;
    }

    if (checkTokenExpiry(decoded.exp)) {
        return false;
    }

    return await fetchNewTokens(refresh as string);
}

export const handleApiResponse = async (response: Response) => {
    const result = await response.json();
    return {
        status: response.status,
        data: result,
    };
};

export const handleApiError = async (error: any) => {
    if (error instanceof Response) {
        const errorData = await error.json();
        return {
            status: error.status,
            data: { error: errorData.message },
        };
    }
    return {
        status: 500,
        data: { error: "An unexpected error occurred" },
    };
};