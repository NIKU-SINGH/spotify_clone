import React from 'react'
import { useRecoilState } from 'recoil';
import { playingTrackState, playState } from '../atoms/playerAtom';

function PlaylistCard({ image, name, id, owner }) {
    return (
        <div key={id}>
            <div className='h-62 w-48 hover:bg-gray-800 rounded-lg p-5'>
                <img className='h-40 w-40 rounded object-cover mb-2' src={image} />
                <h1 className='text-white font-medium text-center'>{name}</h1>
                <h1 className='text-sm font-medium text-gray-500 text-center'>{owner}</h1>
            </div>
        </div>
    )
}

export default PlaylistCard