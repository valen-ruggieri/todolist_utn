"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { registerSchema, type RegisterFormValues } from "@/lib/schemas/auth.schema"
import { RegisterHeader } from "../registerHeader"
import { RegisterForm } from "../registerForm"
import { RegisterFooter } from "../registerFooter"

export function RegisterContainer() {
    const router = useRouter()

    const onSubmit = (values: RegisterFormValues) => {
        console.log("register:", values)
        router.push("/todolist")
    }

    return (
        <div className="container mx-auto max-w-xl p-6 space-y-6">
            <RegisterHeader />
            <RegisterForm onSubmit={onSubmit} />
            <RegisterFooter />
        </div>
    )
}
