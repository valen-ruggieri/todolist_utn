import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex min-h-screen w-full flex-col items-center justify-center ">
            {children}
        </section>
    );
}