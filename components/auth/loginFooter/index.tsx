import Link from "next/link"

export function LoginFooter() {
    return (
        <p className="mt-4 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-primary underline">
                Regístrate
            </Link>
        </p>
    )
}
