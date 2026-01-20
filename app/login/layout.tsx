import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Login",
};

export default function LoginLayout({
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