"use server";

import { apiFetch } from "@/lib/api";
import { IRegisterFormState } from "../_components/RegisterForm";

interface IRegisterApiResponse {
    success: boolean
    message: string
    statusCode: number
    data: unknown
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