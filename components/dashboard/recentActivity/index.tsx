"use client"

import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CheckCircle2, Clock, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
    id: string
    type: "completed" | "created" | "pending"
    text: string
    time: string
}

export function RecentActivity() {
    // Actividades hardcodeadas
    const activities: Activity[] = [
        {
            id: "1",
            type: "completed",
            text: "Completaste la tarea 'Revisar documentación'",
            time: "Hace 2 horas",
        },
        {
            id: "2",
            type: "created",
            text: "Creaste la tarea 'Preparar presentación'",
            time: "Hace 5 horas",
        },
        {
            id: "3",
            type: "pending",
            text: "Tarea 'Llamar al cliente' está pendiente",
            time: "Hace 1 día",
        },
        {
            id: "4",
            type: "completed",
            text: "Completaste la tarea 'Enviar reporte'",
            time: "Hace 2 días",
        },
        {
            id: "5",
            type: "created",
            text: "Creaste la tarea 'Reunión de equipo'",
            time: "Hace 3 días",
        },
    ]

    const getIcon = (type: Activity["type"]) => {
        switch (type) {
            case "completed":
                return <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            case "created":
                return <Plus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            case "pending":
                return <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                    Últimas acciones en tus tareas
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                        >
                            <div className="mt-0.5">
                                {getIcon(activity.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm">{activity.text}</p>
                                <p className="text-xs text-muted-foreground">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
