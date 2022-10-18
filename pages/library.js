import React from 'react'
import Sidebar from '../components/Sidebar'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

function library() {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });
  return (
    <div className='text-white'>
      <h1 className='text-3xl'>This page is Being Build </h1>
      {/* <Link href="/">
        <h1 className='text-3xl text-white'>Go back</h1>
      </Link> */}
      <Sidebar />
    </div>
  )
}

export default library