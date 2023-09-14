import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
// import Youtube from '../api/youtube';
import { useYoutubeApi } from '../context/YoutubeApiContext';
// import FakeYoutube from '../api/fakeYoutubeClient';

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const { 
    isLoading, 
    error, 
    data: videos 
  } = useQuery(['videos', keyword], () => youtube.search(keyword), {staleTime: 1000 * 60 * 1});
 
  return (
    <>
      {isLoading && <p>loading</p>}
      {error && <p>에러발생..</p>}
      {videos && (
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-10'>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video}/>
          ))}
        </ul>
      )}
    </>
  );
}

