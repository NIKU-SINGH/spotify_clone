import React from 'react'
import Sidebar from '../components/Sidebar'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'


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

    </div>
  )
}

export default library