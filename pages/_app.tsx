import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import React from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    <SessionProvider session={session} >
      <RecoilRoot>
      <React.Fragment>
        <Component {...pageProps} />
      </React.Fragment>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
