import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
function Navbar() {
    const { data: session } = useSession();
    return (
        <div>
            <div className='bg-yellow-500 absolute w-full'>
                <header className='absolute top-5 right-8 text-white'>
                    <div
                        className='flex items-center bg-gray-700 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'
                        onClick={() => signOut()}
                    >

                        <img
                            src={session?.user.image}
                            // width={100}
                            // height={100}
                            className='rounded-full h-10 w-10'
                        />
                        <h2 className='font-bold'>{session?.user.name}</h2>
                        <ChevronDownIcon className='h-5 w-5' />
                    </div>
                </header>
            </div>
        </div>
    )
}

export default Navbar