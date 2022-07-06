
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Dashboard from '../components/Dashboard'
import Loader from '../components/Loader'
import { signOut, useSession } from 'next-auth/react'

const Home = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required:true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });

  if (status === 'loading') {
    return <Loader />;
  }

  // console.log(session);

  return (
    <div className="">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Dashboard />
      </div>

    </div>
  )
}

export default Home
