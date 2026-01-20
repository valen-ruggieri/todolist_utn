import { Metadata } from "next";
import { AppLayout } from "@/components/navigation/appLayout";

export const metadata: Metadata = {
    title: "Mi Perfil",
    description: "Mi Perfil",
};

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AppLayout>{children}</AppLayout>;
}
