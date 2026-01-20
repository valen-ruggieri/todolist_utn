"use client"

import * as React from "react"
import Link from "next/link"
import { redirect, usePathname } from "next/navigation"
import { LayoutDashboard, ListTodo, User, LogOut, MoonIcon, SunIcon, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigationItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Tareas",
        href: "/todolist",
        icon: ListTodo,
    },
    {
        title: "Mi Perfil",
        href: "/profile",
        icon: User,
    },
]

// Datos del usuario hardcodeados
const userData = {
    name: "Pepe",
    email: "pepe@gmail.com",
    avatar: "P",
}

export function AppSidebar() {
    const pathname = usePathname()
    const [theme, setTheme] = React.useState<"dark" | "light" | null>(null)

    React.useEffect(() => {
        try {
            const saved = localStorage.getItem("theme")
            if (saved === "dark" || saved === "light") {
                setTheme(saved)
                document.documentElement.classList.toggle("dark", saved === "dark")
                return
            }

            const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
            const initial = prefersDark ? "dark" : "light"
            setTheme(initial)
            document.documentElement.classList.toggle("dark", initial === "dark")
        } catch (e) {
            // ignore
        }
    }, [])

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark"
        setTheme(next)
        try {
            localStorage.setItem("theme", next)
        } catch (e) {
            /* ignore */
        }
        document.documentElement.classList.toggle("dark", next === "dark")
    }

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background shadow-sm">
            <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex h-16 items-center border-b px-6 bg-muted/30">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground text-sm font-bold">T</span>
                        </div>
                        <h2 className="text-lg font-semibold">TodoList UTN</h2>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                    {navigationItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start gap-3 h-10",
                                        isActive && "bg-secondary font-medium"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.title}
                                </Button>
                            </Link>
                        )
                    })}
                </nav>

                {/* User Section */}
                <div className="border-t bg-muted/30 p-4 space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background border">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-foreground text-sm font-semibold">
                                {userData.avatar}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{userData.name}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                <span className="truncate">{userData.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-background border">
                        <span className="text-sm text-muted-foreground">Tema</span>
                        <Button
                            onClick={toggleTheme}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                        >
                            {theme === "dark" ? (
                                <MoonIcon className="h-4 w-4" />
                            ) : (
                                <SunIcon className="h-4 w-4" />
                            )}
                        </Button>
                    </div>

                    {/* Logout */}
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 h-10"
                        onClick={() => {
                            localStorage.removeItem("token")
                            redirect("/login") 
                        }}
                    >
                        <LogOut className="h-4 w-4" />
                        Cerrar Sesión
                    </Button>
                </div>
            </div>
        </aside>
    )
}
