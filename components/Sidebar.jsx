import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon
} from "@heroicons/react/solid";
import { BiLibrary } from 'react-icons/bi'
import { IoIosAddCircle } from 'react-icons/io'
import { BsFillBookmarkStarFill } from 'react-icons/bs'
import Link from 'next/link';
import { useSession } from 'next-auth/react'

function Sidebar({ spotifyApi }) {

  const [userPlaylists, setUserPlaylists] = useState([]);
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  useEffect(() => {
    if (!accessToken) return;
    try {
      async function fetchData() {
        await spotifyApi.setAccessToken(accessToken);
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [accessToken]);

  useEffect(() => {
    try {
      async function fetchData() {
        await spotifyApi.getUserPlaylists().then((res) => {
          setUserPlaylists(
            res.body.items.map((track) => {
              return {
                id: track.id,
                name: track.name,
                images: track.images,
                // tracks: track.tracks,
              }
            }
            )
          );
        })
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [session, spotifyApi])

  return (
    <section className='bg-black fixed top-0 z-40 flex flex-col p-4 items-center overflow-y-scroll scrollbar-hide w-[220px] h-screen text-gray-500 text-xs lg:text-sm max-w-xs pb-36 md:inline'>
      <div className='space-y-4'>
        <div className='hover:cursor-pointer'>
          <Link href="/">
            <Image src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
              height={64}
              width={150}
            />
          </Link>

        </div>
        <button
          className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className=" h-6 w-6" />
          <Link href="/">
            <p>Home</p>
          </Link>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className=" h-6 w-6" />
          <Link href="/search">
            <p>Search</p>
          </Link>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <BiLibrary className=' h-6 w-6' />
          <Link href="/library">
            <p>Your Library</p>
          </Link>
        </button>
        <hr className='border-t-[0.2px] border-gray-800' />

        <button className='flex items-center space-x-2 hover:text-white'>
          <IoIosAddCircle className=' h-6 w-6' />
          <p>Your episodes</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className=' h-6 w-6 text-blue-500' />
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <BsFillBookmarkStarFill className=' h-6 w-6 text-blue-500' />
          <p>Your Episodes</p>
        </button>
        <hr className='border-t-[0.2px] border-gray-800' />


        <h2 className='text-white font-bold text-lg'>Playlists</h2>
        {userPlaylists.map((playlist) => (
          <p key={playlist.id}
            // onClick={() => setPlaylistsId(playlist.id)}
            className='cursor-pointer hover:text-white'>{playlist.name}</p>
        ))}

      </div>
    </section>
  )
}

export default Sidebar