import React from 'react'
import { BsFile, BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { playingTrackState, playState } from '../atoms/playerAtom';

function Poster({ key, track, chooseTrack }) {

  const [play, setPlay] = useRecoilState(playState);
  // console.log("This is the track", track);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const handlePlay = () => {
    chooseTrack(track);
    if (track.uri === playingTrack.uri) {
      setPlay(!play);
    }
  };

  return (
    <div className='hover:bg-gray-800 rounded h-62 w-48'>
      <div
        className='h-40 w-40 text-white/80 rounded  mx-auto mt-5 relative'
        onClick={handlePlay}
      >
        <img
          src={track.albumUrl}
          alt=""
          className='h-full w-full object-cover rounded '
        />
        <div>
          <h1 className="text-md font-bold">{track.title}</h1>
          <h3 className='text-sm font-medium text-gray-500'>{track.artist}</h3>
        </div>
        <div
          className='bottom-3 right-3 absolute visible h-10 w-10 rounded-full bg-[#1db954] shadow-md flex items-center justify-center hover:transition ease-in'
        >
          {track.uri === playingTrack.uri && play ? (
            <BsFillPauseFill className='text-2xl text-black' />
          ) : (
            <BsFillPlayFill className='text-2xl text-black' />
          )}
        </div>
      </div>
    </div>

  )
}

export default Poster