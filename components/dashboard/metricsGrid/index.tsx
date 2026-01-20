"use client"

import * as React from "react"
import { MetricCard } from "../metricCard"
import { 
    CheckCircle2, 
    Clock, 
    ListTodo, 
    TrendingUp,
    User,
    Calendar
} from "lucide-react"

export function MetricsGrid() {
    // Métricas hardcodeadas
    const metrics = [
        {
            title: "Tareas Totales",
            value: "24",
            description: "Tareas creadas",
            icon: ListTodo,
            trend: { value: 12, isPositive: true },
        },
        {
            title: "Completadas",
            value: "18",
            description: "Tareas finalizadas",
            icon: CheckCircle2,
            trend: { value: 8, isPositive: true },
        },
        {
            title: "Pendientes",
            value: "6",
            description: "Tareas por hacer",
            icon: Clock,
            trend: { value: 4, isPositive: false },
        },
        {
            title: "Tasa de Completado",
            value: "75%",
            description: "Porcentaje de éxito",
            icon: TrendingUp,
            trend: { value: 5, isPositive: true },
        },
        {
            title: "Días Activos",
            value: "15",
            description: "Días consecutivos",
            icon: Calendar,
            trend: { value: 3, isPositive: true },
        },
        {
            title: "Productividad",
            value: "92%",
            description: "Eficiencia general",
            icon: User,
            trend: { value: 7, isPositive: true },
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric, index) => (
                <MetricCard
                    key={index}
                    title={metric.title}
                    value={metric.value}
                    description={metric.description}
                    icon={metric.icon}
                    trend={metric.trend}
                />
            ))}
        </div>
    )
}
