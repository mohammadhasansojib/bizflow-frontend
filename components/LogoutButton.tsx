"use client";


import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { logoutUser } from "@/app/(auth)/_actions/actions";


const LogoutButton = () => {
    const router = useRouter();

    const handleClick = async () => {

        try {
            
            await logoutUser();
            router.push("/login");

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