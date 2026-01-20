import { Metadata } from "next";
import { AppLayout } from "@/components/navigation/appLayout";

export const metadata: Metadata = {
    title: "Todolist",
    description: "Todolist",
};

export default function TodolistLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AppLayout>{children}</AppLayout>;
}