import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
    description: "Register",
};

export default function RegisterLayout({
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