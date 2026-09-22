"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { createUser } from "../_actions/actions";
import FormMessage from "./FormMessage";
import { redirect } from "next/navigation";

export interface IRegisterFormState {
    success: boolean
    message: string
}

const initialState = {
    success: false,
    message: "",
}

const RegisterForm = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [state, formAction, pending] = useActionState(createUser, initialState);

    useEffect(() => {
        if (!state.success) return;

        const timer = setTimeout(() => {
            redirect("/login");
        }, 700);

        return () => clearTimeout(timer);
    }, [state.success]);

    return (
        <div className="mx-4 my-4 max-w-md">
            <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
                <div className="mb-6 space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create an account
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Enter your information to create your account.
                    </p>
                </div>

                <form className="space-y-5" action={formAction}>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={form.username}
                            onChange={(e) =>
                                setForm({ ...form, username: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            required
                        />
                    </div>

                    {state.message && (
                        <FormMessage
                            success={state.success}
                            message={state.message}
                        />
                    )}

                    <Button type="submit" className="w-full" disabled={pending}>
                        {pending ? "Register...": "Register"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account!{" "}
                    <Link
                        href="/login"
                        className="font-medium text-primary hover:no-underline underline"
                    >
                        Login
                    </Link>
                </p>
            </div>

        </div>
    );
};


export default RegisterForm;