import { Metadata } from "next";
import { AppLayout } from "@/components/navigation/appLayout";

export const metadata: Metadata = {
    title: "Métricas",
    description: "Dashboard",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AppLayout>{children}</AppLayout>;
}