import { useRef } from "react";


export function useAuthenticate() {
    const formRef = useRef<any>(null);
    return {
        formRef
    };
}

