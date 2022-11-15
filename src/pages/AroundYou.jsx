import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import { Error, Loader, SongCard } from '../components';

const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [loading, setloading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);
  useEffect(() => {
    // at_UA8N4jSZdJ0YYSt0yOit5QMESwa3N
    axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_UA8N4jSZdJ0YYSt0yOit5QMESwa3N')
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setloading(false));
  }, [country]);

  if (isFetching && loading) return <Loader title="Loading sogs around you" />;
  if (error && country) return <Error />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You
        <span className="font-black"> {country}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
