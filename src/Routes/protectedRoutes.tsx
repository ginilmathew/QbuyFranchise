import { useEffect, useState, useContext, useLayoutEffect, useCallback } from 'react'
import { useRouter } from 'next/router';

import { LinearProgress, Stack } from '@mui/material';
import { fetchData } from '@/CustomAxios';
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react"


type ProtectedRouteProps = {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [loading, setLoading] = useState(true)
    const [userLoader, setUserLoader] = useState<boolean>(false)
    const router = useRouter()
    const { data: session, status } = useSession();



    useEffect(() => {
        if (status === "unauthenticated") {
            console.log("No JWT");
            console.log(status);
            void router.push("/login");
        } else if (status === "authenticated") {
            void router.push("/");
        }
    }, []);

    useEffect(() => {
        if (session) {
            let details = JSON.parse(JSON.stringify(session.user))
            localStorage.setItem("token", details?.accessToken)
        }
    }, [session])

    if (status === "loading") {
        return (
            <div>Loading...</div>
        )
    }

    return <>
        {status === 'authenticated' &&
            <>
                {children}</>}

    </>
}
