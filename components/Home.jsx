import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { useSession } from 'next-auth/react'
import { BsFile, BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import PlaylistCard from './PlaylistCard';

function Home({ spotifyApi }) {

    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [recommendation, setRecommendation] = useState([]);
    const [play, setPlay] = useState('true');

    const handlePlay = () => {
        setPlay(!play);
    };

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    // user Playlists
    useEffect(() => {
        spotifyApi.getUserPlaylists().then((res) => {
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
    }, [session, spotifyApi])

    // Recent Playlists
    useEffect(() => {
        if (accessToken) {
            spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
                // setRecentlyPlayed(res);
                setRecentlyPlayed(
                    res.body.items.map((tracks) => {
                        return {
                            id: tracks.track.id,
                            name: tracks.track.name,
                            uri: tracks.track.uri,
                            image: tracks.track.album?.images[0]?.url,
                            owner:tracks.track.artists[0].name,
                        }
                    })
                )
            })
        }

    }, [session, spotifyApi])

    // Reccomendations
    useEffect(() => {
        if (accessToken) {
            spotifyApi.getRecommendations({
                min_energy: 0.4,
                seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
                min_popularity: 50
            }).then((res) => {
                // setRecommendation(res);
                setRecommendation(
                    res.body.tracks?.map((song) => {
                        return {
                            id: song.id,
                            name: song.name,
                            uri: song.uri,
                            album: song.album,
                            image: song.album.images[0].url
                        }
                    })
                )
            })
        }
    }, [accessToken])

    // console.log("This is the user palylist", userPlaylists);
    console.log("Recently Played", recentlyPlayed);
    // console.log("Recommendations", recommendation);
    // console.log("accesstoken",accessToken)
    // console.log("THis is the user palylist",session);
    return (
        <>
            <div className=' bg-gradient-to-b from-yellow-500'>
                <Navbar />
                <div className="ml-56 py-4 md:max-w-5xl">
                    <div className="text-white text-2xl font-semibold mb-5">
                        <h1>Good Afternoon</h1>
                    </div>
                    <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {userPlaylists.slice(0, 6).map((playlist) => (
                            <div
                                className=' h-24 p-3 bg-gray-800 hover:bg-gray-700 flex flex-row m-4 rounded items-center overflow-hidden relative'
                                key={playlist.id}
                            >
                                <img
                                    src={playlist.images[0].url}
                                    className='h-20 w-20 mr-2'
                                />
                                <h2 className='text-xs font-bold  text-white md:text-sm'>{playlist.name}</h2>
                                {/* 
                            <div
                                className='absolute right-3 h-10 w-10 rounded-full bg-[#1db954] shadow-md flex items-center justify-center hover:transition ease-in'
                                onClick={handlePlay}
                            >
                                {play ? (
                                    <BsFillPauseFill className='text-2xl text-black' />
                                ) : (
                                    <BsFillPlayFill className='text-2xl text-black' />
                                )}
                            </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='ml-56 py-4 md:max-w-5xl'>
                {/* Rrecently Played */}
                <div className="text-white text-2xl font-semibold">
                    <h1>Rrecently Played</h1>
                </div>
                <div className='flex flex-row m-5 flex-wrap'>
                    {recentlyPlayed?.slice(0, 5).map((song) => (
                        // <div
                        //     key={song.track.id}
                        //     className='h-62 w-48 hover:bg-gray-800 rounded-lg p-3 m-2'>
                        //     <img className='h-40 w-40 rounded object-cover m-2' src={song.track.album.images[0].url} />
                        //     <h1 className='text-white font-medium text-center'>{song.track.name}</h1>
                        //     <h1 className='text-sm font-medium text-gray-500 text-center'>{playlist.owner}</h1>
                        // </div>
                        <PlaylistCard id={song.id} name={song.name} image={song.image} owner={song.owner} />
                    ))}
                </div>


                {/* Recommendation */}
                <div className="text-white text-2xl font-semibold">
                    <h1>Recommendation</h1>
                </div>
                <div className='flex flex-row m-5 flex-wrap'>
                    {recommendation?.slice(0, 5).map((song) => (
                        // <div
                        //     key={song.id}
                        //     className='h-62 w-48 hover:bg-gray-800 rounded-lg p-3 m-2'>
                        //     <img className='h-40 w-40 rounded object-cover m-2' src={song.image} />
                        //     <h1 className='text-white font-medium text-center'>{song.name}</h1>
                        //     <h1 className='text-sm font-medium text-gray-500 text-center'>{playlist.owner}</h1>
                        // </div>
                        <PlaylistCard id={song.id} name={song.name} image={song.image} owner={song.album.name} />
                    ))}
                </div>

            </div>

        </>
    )
}

export default Home