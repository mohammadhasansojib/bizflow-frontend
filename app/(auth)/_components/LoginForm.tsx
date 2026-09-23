"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { loginUser } from "../_actions/actions";
import FormMessage from "./FormMessage";
import { redirect } from "next/navigation";

export interface ILoginFormState {
    success: boolean
    message: string
}

const initialState = {
    success: false,
    message: "",
}

const LoginForm = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [state, formAction, pending] = useActionState(loginUser, initialState);

    useEffect(() => {
        if (!state.success) return;

        const timer = setTimeout(() => {
            redirect("/dashboard");
        }, 700);

        return () => clearTimeout(timer);
    }, [state.success]);

    return (
        <div className="mx-4 my-4 max-w-md">
            <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
                <div className="mb-6 space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Enter your credentials to sign in to your account.
                    </p>
                </div>

                <form className="space-y-5" action={formAction}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>

                            {/* <Link
                                href="/forgot-password"
                                className="text-sm font-medium text-primary underline hover:no-underline"
                            >
                                Forgot password?
                            </Link> */}
                        </div>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    {state.message && <FormMessage 
                        success={state.success}
                        message={state.message}
                    />}

                    <Button type="submit" className="w-full" disabled={pending}>
                        {pending ? "Login..." : "Login"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-primary underline hover:no-underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;