"use server";

import { ApiResponseType, BookFormType, SignInFormType, SignUpFormType } from "@/types";
import { handleApiError, handleApiResponse, urlGenerator } from "@/utils/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: SignUpFormType) => {
    console.log(formData);
};

export const getAccessToken = async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get("access")?.value;
}

export const getRefreshToken = async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get("access")?.value;
}

export const signInAction = async (formData: SignInFormType): Promise<ApiResponseType> => {
    return await fetch(urlGenerator('/auth/users/jwt/create/'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then(async (response) => {
            const access = response.access;
            const refresh = response.refresh;

            const cookieStore = await cookies();
            cookieStore.set("access", access, { maxAge: 60 * 60 * 24 }); //
            cookieStore.set("refresh", refresh, { maxAge: 60 * 60 * 24 * 4 });
            return { status: 200, data: { success: "Successfully signed in" } };
        })
        .catch(async (error) => {
            return await handleApiError(error);
        }) as ApiResponseType;
};

export const fetchNewTokens = async (token: string) => {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "refresh": token
        }),
    };

    try {
        const response = await fetch(urlGenerator("auth/users/jwt/refresh/"), options);
        const result = await response.json();

        const cookieStore = await cookies();
        cookieStore.set("access", result.access, { maxAge: 60 * 60 * 24 });
        cookieStore.set("refresh", result.refresh, { maxAge: 60 * 60 * 24 * 4 });
        return true;
    } catch (error) {
        return false;
    }
};

export const signOutAction = async () => {
    return redirect("/sign-in");
};

export const addBookAction = async (formData: BookFormType): Promise<ApiResponseType> => {
    const access = await getAccessToken();
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`,
        },
        body: JSON.stringify(formData),
    };
    try {
        const response = await fetch(urlGenerator('/book/create/'), options);
        return await handleApiResponse(response) as ApiResponseType;
    } catch (error) {
        return await handleApiError(error) as ApiResponseType;
    }
};

export const editBookAction = async (formData: BookFormType, isbn_no: string): Promise<ApiResponseType> => {
    const access = await getAccessToken();
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`,
        },
        body: JSON.stringify(formData),
    };
    try {
        const response = await fetch(urlGenerator(`/book/edit/${isbn_no}/`), options);
        return await handleApiResponse(response) as ApiResponseType;
    } catch (error) {
        return await handleApiError(error) as ApiResponseType;
    }
};

export const subscribeAction = async (planId: string): Promise<ApiResponseType> => {
    console.log(planId);

    const access = await getAccessToken();
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`,
        },
    };
    try {
        const response = await fetch(urlGenerator(`/transaction/subscribe/${planId}/`), options);
        return await handleApiResponse(response) as ApiResponseType;
    } catch (error) {
        return await handleApiError(error) as ApiResponseType;
    }
}

export const borrowBookAction = async (isbn_no: string): Promise<ApiResponseType> => {
    const access = await getAccessToken();
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`,
        },
    };
    try {
        const response = await fetch(urlGenerator(`/book/borrow/request/${isbn_no}/`), options);
        return await handleApiResponse(response) as ApiResponseType;
    } catch (error) {
        return await handleApiError(error) as ApiResponseType;
    }
}

export const approveBorrowingAction = async (borrowId: string): Promise<ApiResponseType> => {
    const access = await getAccessToken();
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`,
        },
    };

    try {
        const response = await fetch(urlGenerator(`/book/borrow/approve/${borrowId}/`), options);
        return await handleApiResponse(response) as ApiResponseType;
    } catch (error) {
        return await handleApiError(error) as ApiResponseType;
    }
};

export const rejectBorrowingAction = async (borrowId: string): Promise<ApiResponseType> => {
    const access = await getAccessToken();
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`,
        },
    };

    try {
        const response = await fetch(urlGenerator(`/book/borrow/reject/${borrowId}/`), options);
        return await handleApiResponse(response) as ApiResponseType;
    } catch (error) {
        return await handleApiError(error) as ApiResponseType;
    }
};


export const approveReturningAction = async (returnId: string): Promise<ApiResponseType> => {
    const access = await getAccessToken();
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`,
        },
    };

    try {
        const response = await fetch(urlGenerator(`/book/return/approve/${returnId}/`), options);
        return await handleApiResponse(response) as ApiResponseType;
    } catch (error) {
        return await handleApiError(error) as ApiResponseType;
    }
};