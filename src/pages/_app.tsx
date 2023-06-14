import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify';
import LinearProgress from '@mui/material/LinearProgress';
import { Stack } from '@mui/material';
import Header from '@/Components/Common/Header';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from '@/Context/user/UserContext';
import ProtectedRoute from '@/Routes/protectedRoutes';
import type { NextComponentType } from 'next'
import { SessionProvider, useSession } from "next-auth/react"
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { Poppins } from 'next/font/google';
import ModeProvider from '@/Context/type/ModeContext';




type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean } // add auth type
}


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '600', '700']
})


export default function App({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) {



  const router = useRouter();
  const showHeader = (router.pathname === '/login' || router.pathname === "/otp") ? false : true;

  const [isLoading, setLoading] = React.useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);
    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);




  return <main className={poppins.className}>
    {isLoading && showHeader && (
      <Stack sx={{ width: '100%', color: 'grey.500' }} >
        <LinearProgress color="success" />
      </Stack>
    )}
    <ModeProvider>
      <SessionProvider session={session}>
        <UserProvider>
          {Component.auth ?
            <Component {...pageProps} /> :
            <ProtectedRoute>

              <UserProvider>
                {showHeader &&
                  <Header />}
                <Component {...pageProps} />

              </UserProvider>

            </ProtectedRoute>
          }
          <ToastContainer />

        </UserProvider>
      </SessionProvider>
    </ModeProvider>

  </main>

}
