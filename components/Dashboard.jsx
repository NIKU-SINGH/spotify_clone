import React, { useEffect } from 'react'
import Body from './SearchResults'
import Sidebar from './Sidebar'
import Home from './Home'
import Player from './Player'
import SpotifyWebApi from 'spotify-web-api-node';
import { useRecoilState } from 'recoil';
import { playingTrackState } from '../atoms/playerAtom';
import { useSession } from 'next-auth/react'


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

function Dashboard() {

  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  useEffect(() => {
    if (!accessToken) return;
    try {
      spotifyApi.setAccessToken(accessToken);
    } catch (err) {
      console.log(err);
    }
  }, [accessToken]);

  return (
    <main className='h-[100vh] bg-gray-900 '>
      <Sidebar spotifyApi={spotifyApi} />
      {/* <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} /> */}
      <Home spotifyApi={spotifyApi} />
      {/* Player */}
      <div className="fixed bottom-0 left-0 right-0 z-50 ">
        <Player accessToken={accessToken} trackUri={playingTrack.uri} />
      </div>
    </main>
  )
}

export default Dashboard