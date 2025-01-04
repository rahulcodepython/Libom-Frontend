"use server";

import { urlGenerator } from "@/utils/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    console.log(email, password);

};

export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await fetch(urlGenerator('/auth/users/jwt/create/'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then((response) => response.json())
        .then(async (response) => {
            const access = response.access;
            const refresh = response.refresh;

            const cookieStore = await cookies();
            cookieStore.set("access", access, { path: "/", httpOnly: true, maxAge: 60 * 60 * 24 });
            cookieStore.set("refresh", refresh, { path: "/", httpOnly: true, maxAge: 60 * 60 * 24 * 4 });
            return redirect("/dashboard");
        })
        .catch((error) => {
            return redirect("/auth/sign-in");
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
