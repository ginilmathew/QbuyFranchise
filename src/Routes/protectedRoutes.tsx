import { useEffect, useState, useContext, useLayoutEffect, useCallback } from 'react'
import { useRouter } from 'next/router';

import { LinearProgress, Stack } from '@mui/material';
import { fetchData } from '@/CustomAxios';
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react"
import UserContext from '@/Context/user';


type ProtectedRouteProps = {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [loading, setLoading] = useState(true)
    const [userLoader, setUserLoader] = useState<boolean>(false)
    const router = useRouter()

    const userContext = useContext(UserContext)

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            void router.push('/login')
        },
    })
    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         void router.push("/login");
    //     } else if (status === "authenticated") {
    //         void router.push("/");
    //     }
    // }, []);

    useEffect(() => {

        try {
            if (session) {
                let details = JSON.parse(JSON.stringify(session.user))
                // console.log({ details }, 'DETAIL PAGE>>>')
                userContext.setUser(details);
                localStorage.setItem("token", details?.accessToken)
                localStorage.setItem('name', details?.name)
            }
        } catch (err: any) {
            void router.push('/login')
        }

    }, [session])

    useEffect(()=>{
        if(session){
            router.push('/')
        }
    },[session])



    if (status === "loading") {
        return (
            <div>Loading...</div>
        )
    }

    return <>
        {children}

    </>
}
