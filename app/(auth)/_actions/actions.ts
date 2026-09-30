"use server";

import { apiFetch } from "@/lib/api";
import { IRegisterFormState } from "../_components/RegisterForm";
import { ILoginFormState } from "../_components/LoginForm";
import { cookies } from "next/headers";

interface IRegisterApiResponse {
    success: boolean
    message: string
    statusCode: number
    data: unknown
}

interface ILoginApiResponse {
    success: boolean
    message: string
    statusCode: number
    data: unknown
}

const isAuthData = (data: unknown): data is {
    accessToken: string;
    refreshToken: string;
} => {
    return (
        typeof data === "object" &&
        data !== null &&
        "accessToken" in data &&
        "refreshToken" in data &&
        typeof data.accessToken === "string" &&
        typeof data.refreshToken === "string" 
    );
}

export const createUser = async (_prevState: IRegisterFormState, formData: FormData) => {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
        username,
        email,
        password,
    };

    try {
        
        const apiResponse = await apiFetch("/auth/register", {
            method: "POST",
            headers: {

            },
            body: JSON.stringify(payload),
        });

        const response: IRegisterApiResponse = await apiResponse.json();
        
        if (response.success) {
            console.log(response);

            return {
                success: response.success,
                message: response.message,
            };
        }

        if (!response.success) {
            console.log(response);

            return {
                success: response.success as boolean,
                message: response.message as string,
            };
        }

        return {
            success: false,
            message: "Registration Failed",
        };

    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}


export const loginUser = async (_prevState: ILoginFormState, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
        email,
        password,
    }

    try {
        
        const apiResponse = await apiFetch(`/auth/login`, {
            method: "POST",
            headers: {

            },
            body: JSON.stringify(payload),
        })

        const response: ILoginApiResponse = await apiResponse.json();
        // console.log(response);

        if (response.success && isAuthData(response.data)) {
            const cookieStore = await cookies();
            
            cookieStore.set({
                name: "accessToken",
                value: response.data.accessToken,
                secure: false,
                httpOnly: true,
                path: "/",
            });
            cookieStore.set({
                name: "refreshToken",
                value: response.data.refreshToken,
                secure: false,
                httpOnly: true,
                path: "/",
            });
        }
        
        return {
            success: response.success,
            message: response.message,
        }

    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "something went wrong: Try again later",
        }
    }
}

export const logoutUser = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
}