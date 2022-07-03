import React from 'react'
import Sidebar from '../components/Sidebar'
import SearchResults from '../components/SearchResults'
import SpotifyWebApi from 'spotify-web-api-node';
import { useRecoilState } from 'recoil';
import {playingTrackState} from '../atoms/playerAtom';
import Navbar from '../components/Navbar'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

function search() {
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

    const chooseTrack = (track) => {
        setPlayingTrack(track);
    };
    return (
        <div className='text-white'>
            <Navbar />
            <Sidebar spotifyApi={spotifyApi}/>
            <SearchResults spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
        </div>
    )
}

export default search