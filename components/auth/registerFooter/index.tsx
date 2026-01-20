import Link from "next/link"

export function RegisterFooter() {
    return (
        <p className="mt-4 text-center text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-primary underline">
                Inicia sesión
            </Link>
        </p>
    )
}
