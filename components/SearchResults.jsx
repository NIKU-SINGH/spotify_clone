import React, { useEffect } from 'react'
import Search from './Search';
import PlaylistCard from './PlaylistCard'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Poster from './Poster';
import { useRecoilState } from 'recoil';
import initialArtistsIdState from '../atoms/playerAtom'

function SearchResults({ spotifyApi, chooseTrack }) {
  const [search, setSearch] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  const [artists, setArtists] = useState([]);
  const [initialArtists, setInitialArtists] = useState();

  const [playlists, setPlaylists] = useState([]);
  const [initialPlaylists, setInitialPlaylists] = useState([]);

  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Searching for songs 
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    try {
      async function fetchData() {
        await spotifyApi.searchTracks(search).then((res) => {
          setSearchResults(
            res?.body?.tracks?.items?.map((track) => {
              return {
                id: track.id,
                title: track.name,
                artist: track.artists[0].name,
                albumUrl: track.album.images[0]?.url,
                uri: track.uri,
              };
            })
          );
        })
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [search, accessToken]);

  // New Releases
  useEffect(() => {
    try {
      if (!accessToken) return;

      async function fetchData() {
        await spotifyApi.getNewReleases().then((res) => {
          setNewReleases(
            res.body.albums.items?.map((track) => {
              return {
                id: track.id,
                title: track.name,
                artist: track.artists[0].name,
                albumUrl: track.images[0]?.url,
                uri: track.uri,
              };
            })
          )
        })
      }
      fetchData();
    } catch (err) {
      console.log(err)
    }
  }, [accessToken]);

  // Get Initial Playlists
  useEffect(() => {
    if (!accessToken) return;
    try {
      async function fetchData() {
        await spotifyApi.getFeaturedPlaylists({ limit: 10 }).then((res) => {
          setInitialPlaylists(
            res.body.playlists.items.map((playlist) => {
              return {
                id: playlist.id,
                name: playlist.name,
                image: playlist.images[0].url,
                uri: playlist.uri,
                owner: playlist.owner
              }
            })
          )
        })
        fetchData();
      }
    } catch (err) {
      console.log(err)
    }
  }, [accessToken])

  // Searched Playlists
  useEffect( () => {
    if (!accessToken) return;
    try {
      async function fetchData() {
        await spotifyApi.searchPlaylists(search).then((res) => {
          setPlaylists(
            res.body.playlists.items.map((playlist) => {
              return {
                id: playlist.id,
                name: playlist.name,
                uri: playlist.uri,
                image: playlist.images[0]?.url,
                owner: playlist.owner.display_name,
              }
            })
          )
        })
      }
      fetchData();
    } catch (err) {
      console.log(err)
    }
  }, [search, accessToken])

  // Search Artist
  useEffect(() => {
    if (!accessToken) return;
    if (!search) return;
    try {
      async function fetchData() {
        await spotifyApi.searchArtists(search).then((res) => {
          // setArtists(res);
          setArtists(
            res.body.artists.items.map((artist) => {
              return {
                id: artist.id,
                name: artist.name,
                uri: artist.uri,
                image: artist.images[0]?.url,
                type: artist.type,
                uri: artist.uri,
              }
            })
          )
        })
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }

  }, [search, accessToken]);

  // Get inital artists
  useEffect(() => {
    if (!accessToken) return;
    try {
      async function fetchData() {
        await spotifyApi.getArtists(["4YRxDV8wJFPHPTeXepOstw", "2oSONSC9zQ4UonDKnLqksx", "4fEkbug6kZzzJ8eYX6Kbbp", "0tC995Rfn9k2l7nqgCZsV7", "246dkjvS1zLTtiykXe5h60"]).then((res) => {
          // setInitialArtists(res);
          setInitialArtists(
            res.body.artists?.map((artist) => {
              return {
                id: artist.id,
                name: artist.name,
                uri: artist.uri,
                image: artist.images[0]?.url,
                type: artist.type,
                uri: artist.uri,
              }
            })
          )
        })
      }
      fetchData();
    } catch (err) {
      console.log(err)
    }
  }, [accessToken])

  return (
    <section className='bg-black ml-56 py-4 space-y-8 md:max-w-5xl flex-grow md:mr-2.5'>
      <Search search={search} setSearch={setSearch} />
      <div className='flex flex-row m-2 flex-wrap '>
        {/* Mapping through the results */}
        {searchResults?.length === 0 ? newReleases.slice(0, 5).map((track) => (
          <Poster
            id={track.id}
            track={track}
            chooseTrack={chooseTrack}
            key={track.id}
          />
        )) : searchResults.slice(0, 5).map((track) => (
          <Poster
            id={track.id}
            track={track}
            chooseTrack={chooseTrack}
            key={track.id}
          />
        ))}
      </div>

      {/* Artist */}

      <h1 className='text-xl font-bold text-white m-5'>Artist</h1>
      <div className='flex flex-row m-2 flex-wrap' >
        {artists.length === 0 ?
          initialArtists?.map((artist) => (
            <div className='h-50 w-50 hover:bg-gray-800 rounded-lg p-5'
              id={artist.id}
              key={artist.id}>
              <img className='h-40 w-40 rounded-full object-cover' src={artist.image} />
              <h1 className='text-white font-medium text-center'>{artist.name}</h1>
              <h1 className='text-sm font-medium text-gray-500 text-center'>{artist.type}</h1>
            </div>
          )) :
          artists.slice(0, 5).map((artist) => (
            <div className='h-50 w-50 hover:bg-gray-800 rounded-lg p-5 '
              id={artist.id}
              key={artist.id} >
              <img className='h-40 w-40 rounded-full object-cover' src={artist.image} />
              <h1 className='text-white font-medium text-center'>{artist.name}</h1>
              <h1 className='text-sm font-medium text-gray-500 text-center'>{artist.type}</h1>
            </div>
          ))
        }
      </div>

      {/* Playlists */}

      <h1 className='text-xl font-bold text-white m-5'>Playlists</h1>
      <div className='flex flex-row m-5 flex-wrap'>
        {playlists.length === 0 ?
          initialPlaylists.slice(0, 5).map((playlist, index) => (
            <PlaylistCard image={playlist.image} name={playlist.name} id={playlist.id} onwer={playlist.owner} key={index} />
          ))
          :
          playlists.slice(0, 5).map((playlist, index) => (
            <PlaylistCard image={playlist.image} name={playlist.name} id={playlist.id} onwer={playlist.owner} key={index} />
          ))
        }
      </div>

    </section>
  )
}

export default SearchResults