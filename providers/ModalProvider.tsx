"use client";

import AuthModal from "@/app/components/AuthModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return (

        <AuthModal isOpen={false} onChange={function (open: boolean): void {
            throw new Error("Function not implemented.");
        } } />
    );
}

export default ModalProvider;