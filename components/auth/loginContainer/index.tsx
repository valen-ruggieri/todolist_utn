"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { loginSchema, type LoginFormValues } from "@/lib/schemas/auth.schema"
import { LoginHeader } from "../loginHeader"
import { LoginForm } from "../loginForm"
import { LoginFooter } from "../loginFooter"

export function LoginContainer() {
    const router = useRouter()

    const onSubmit = (values: LoginFormValues) => {
        console.log("login:", values)
        router.push("/todolist")
    }

    return (
        <div className="container mx-auto max-w-xl p-6 space-y-6">
            <LoginHeader />
            <LoginForm onSubmit={onSubmit} />
            <LoginFooter />
        </div>
    )
}
