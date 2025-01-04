"use server";

import { ApiResponseType, BookFormType, SignInFormType, SignUpFormType } from "@/types";
import { getAccessToken, handleApiError, handleApiResponse, urlGenerator } from "@/utils/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: SignUpFormType) => {
    console.log(formData);

};

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
            cookieStore.set("access", access, { path: "/", httpOnly: true, maxAge: 60 * 60 * 24 });
            cookieStore.set("refresh", refresh, { path: "/", httpOnly: true, maxAge: 60 * 60 * 24 * 4 });
            return { status: 200, data: { success: "Successfully signed in" } };
        })
        .catch(async (error) => {
            return await handleApiError(error);
        });
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
        const response = await fetch("http://127.0.0.1:8000/auth/users/jwt/refresh/", options);
        const result = await response.json();

        const cookieStore = await cookies();
        cookieStore.set("access", result.access, { path: "/", httpOnly: true, maxAge: 60 * 60 * 24 });
        cookieStore.set("refresh", result.refresh, { path: "/", httpOnly: true, maxAge: 60 * 60 * 24 * 4 });
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
        return await handleApiResponse(response);
    } catch (error) {
        return await handleApiError(error);
    }
};