"use client";

import { apiFetch } from "@/lib/api";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface ILogoutApiResponse {
    success: boolean
    message: string
    statusCode: number
    data: unknown
}


const LogoutButton = () => {
    const router = useRouter();

    const handleClick = async () => {

        try {
            const apiResponse = await apiFetch("/auth/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    
                },
            });

            const response: ILogoutApiResponse = await apiResponse.json();
            if (response.success) {
                router.push("/login");
            }
            console.log(response);

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button
            className=""
            onClick={handleClick}
        >
            Logout
        </Button>
    );
}

export default LogoutButton;