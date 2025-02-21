"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Ocurrió un error inesperado</h1>
            <p>{error.message || "Algo salió mal."}</p>
            <button onClick={() => reset()}>Intentar de nuevo</button>
        </div>
    );
}