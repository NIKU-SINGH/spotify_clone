import React from 'react'
import { BsFile, BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { playingTrackState, playState } from '../atoms/playerAtom';

function Poster({ id, track, chooseTrack }) {

  const [play, setPlay] = useRecoilState(playState);

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const handlePlay = () => {
    chooseTrack(track);
    if (track.uri === playingTrack.uri) {
      setPlay(!play);
    }
  };
  // console.log("Current track",playingTrack);

  return (
    <div className='h-62 w-48 hover:bg-gray-800 rounded-lg p-5'>
      <div
        // className='h-auto w-auto'
        onClick={handlePlay}
        key={id}
      >
        <div className='relative mb-2'>
          <img
            src={track.albumUrl}
            alt=""
            className='h-40 w-40 object-cover rounded '
          />
          <div
            className='bottom-2 right-3 absolute visible h-10 w-10 rounded-full bg-[#1db954] shadow-md flex items-center justify-center hover:transition ease-in'
          >
            {track.uri === playingTrack.uri && play ? (
              <BsFillPauseFill className='text-2xl text-black' />
            ) : (
              <BsFillPlayFill className='text-2xl text-black' />
            )}
          </div>
        </div>

        <div>
          <h1 className="text-md font-bold">{track.title}</h1>
          <h3 className='text-sm font-medium text-gray-500'>{track.artist}</h3>
        </div>

      </div>
    </div>

  )
}

export default Poster