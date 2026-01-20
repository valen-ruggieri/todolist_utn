import * as React from "react"
import { AppSidebar } from "../appSidebar"

interface AppLayoutProps {
    children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen">
            <AppSidebar />
            <main className="flex-1 ml-64">
                {children}
            </main>
        </div>
    )
}
