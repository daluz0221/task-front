"use client";

import { useRequiredAuth } from "@/hooks";




export function Protected({children}: {children : React.ReactNode}) {
    useRequiredAuth();
    return <>{children}</>
}