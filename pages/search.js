import Sidebar from '../components/Sidebar'
import SearchResults from '../components/SearchResults'
import SpotifyWebApi from 'spotify-web-api-node';
import { useRecoilState } from 'recoil';
import { playingTrackState } from '../atoms/playerAtom';
import Navbar from '../components/Navbar'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Player from '../components/Player'
import Loader from '../components/Loader'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

function search() {
    const router = useRouter();
    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/auth/signin');
        },
    });

    // if (status === 'loading') {
    //     return <Loader />;
    // }
    // const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

    const chooseTrack = (track) => {
        setPlayingTrack(track);
    };

    useEffect(() => {
        try {
            if (!accessToken) return;
            spotifyApi.setAccessToken(accessToken);
        }
        catch (error) {
            console.log(error);
        }
    }, [accessToken]);

    return (
        <div className='text-white'>
            <Navbar />
            <Sidebar spotifyApi={spotifyApi} />
            <SearchResults spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
            <div className="fixed bottom-0 left-0 right-0 z-50 ">
                <Player accessToken={accessToken} trackUri={playingTrack.uri} />
            </div>
        </div>
    )
}

export default search