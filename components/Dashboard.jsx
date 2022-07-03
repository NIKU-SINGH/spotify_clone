import React from 'react'
import Body from './SearchResults'
import Sidebar from './Sidebar'
import Right from './Right'
import Home from './Home'
import SpotifyWebApi from 'spotify-web-api-node';
import { useRecoilState } from 'recoil';
import {playingTrackState} from '../atoms/playerAtom';


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});


function Dashboard() {

  const [playingTrack,setPlayingTrack] = useRecoilState(playingTrackState);
  
  const chooseTrack = (track) =>{
    setPlayingTrack(track);
  };

  return (
    <main className='h-[100vh] bg-gray-900 '>
        <Sidebar spotifyApi={spotifyApi}/>
        {/* <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} /> */}
        <Home spotifyApi={spotifyApi} />
        {/* <Right /> */}
    </main>
  )
}

export default Dashboard