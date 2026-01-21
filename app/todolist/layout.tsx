import { Metadata } from "next";
import { AppLayout } from "@/components/navigation/appLayout";

export const metadata: Metadata = {
    title: "Lista de tareas",
    description: "Lista de tareas - UTN",
};

export default function TodolistLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AppLayout>{children}</AppLayout>;
}