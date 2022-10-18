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
        try {
            if (!accessToken) return;
            spotifyApi.setAccessToken(accessToken);
        }
        catch (e) { console.log(e); }
    }, [accessToken]);

    // user Playlists
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
        }
        catch (e) { console.log(e); }
    }, [session, spotifyApi])

    // Recent Playlists
    useEffect( () => {
        try {
            if (accessToken) {
                async function fetchData() {
                    await spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
                        // setRecentlyPlayed(res);
                        setRecentlyPlayed(
                            res.body.items.map((tracks) => {
                                return {
                                    id: tracks.track.id,
                                    name: tracks.track.name,
                                    uri: tracks.track.uri,
                                    image: tracks.track.album?.images[0]?.url,
                                    owner: tracks.track.artists[0].name,
                                }
                            })
                        )
                    })
                }
                fetchData();
            }
        }
        catch (e) { console.log(e); }
    }, [session, spotifyApi])

    // Reccomendations
    useEffect( () => {
        try {
            if (accessToken) {
                async function fetchData() {
                    await spotifyApi.getRecommendations({
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
                fetchData();
            }
        } catch (e) { console.log(e); }
    }, [accessToken])
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
                                
                            <div
                                className='absolute right-3 h-10 w-10 rounded-full bg-[#1db954] shadow-md flex items-center justify-center hover:transition ease-in'
                                onClick={handlePlay}
                            >
                                {play ? (
                                    <BsFillPauseFill className='text-2xl text-black' />
                                ) : (
                                    <BsFillPlayFill className='text-2xl text-black' />
                                )}
                            </div>
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
                    {recentlyPlayed?.slice(0, 5).map((song, index) => (
                        <PlaylistCard id={song.id} name={song.name} image={song.image} owner={song.owner} key={index} />
                    ))}
                </div> 


                {/* Recommendation */}
                <div className="text-white text-2xl font-semibold">
                    <h1>Recommendation</h1>
                </div>
                <div className='flex flex-row m-5 flex-wrap'>
                    {recommendation?.slice(0, 5).map((song, index) => (
                        <PlaylistCard id={song.id} name={song.name} image={song.image} owner={song.album.name} key={index} />
                    ))}
                </div> 

            </div>

        </>
    )
}

export default Home