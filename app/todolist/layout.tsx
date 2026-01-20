import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Todolist",
    description: "Todolist",
};

export default function TodolistLayout({
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