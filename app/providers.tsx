"use client"

import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // Mayor a 0 para evitar volver a obtener los datos inmediatamente en el cliente.
                staleTime: 60 * 1000,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (isServer) {
        // Servidor: siempre generar un Query Client
        return makeQueryClient()
    } else {
        // Cliente: Solo genera el QueryClient si no tenemos uno
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient()
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}