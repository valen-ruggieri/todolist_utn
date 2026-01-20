"use client"

import * as React from "react"
import { DashboardHeader } from "../dashboardHeader"
import { MetricsGrid } from "../metricsGrid"
import { RecentActivity } from "../recentActivity"

export function DashboardContainer() {
    return (
        <div className="container mx-auto max-w-7xl p-6 space-y-6">
            <DashboardHeader />
            <MetricsGrid />
            <div className="grid gap-6 md:grid-cols-2">
                <RecentActivity />
            </div>
        </div>
    )
}
