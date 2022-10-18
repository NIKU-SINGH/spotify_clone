import React from 'react'

function Search({seacrh,setSearch}) {
  return (
    <div className='max-width-[800px] bg-white  rounded-full border-2 border-[#333333] overflow-hidden p-1.5 px-5 pr-8 flex items-center'>
      <div className='h-4 w-4 rounded-full border-2 flex-shrink-0 animate-pulse border-gray-500'/>
      <input
        type="text"
        value={seacrh}
        onChange={(e) => setSearch(e.target.value)}
        className='bg-white text-gray-500 border-none lg:w-full focus:ring-0 outline-none ml-4 placeholder-gray-500 text-md'
        placeholder='Artist, Songs or Podcasts...'
      >
      </input>
    </div>
  )
}

export default Search