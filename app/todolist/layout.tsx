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
        <section>
            {children}
        </section>
    );
}