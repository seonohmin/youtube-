import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import FakeYoutube from '../api/fakeYoutube';

export default function Videos() {
  const { keyword } = useParams();
  const { 
    isLoading, 
    error, 
    data: videos 
  } = useQuery(['videos', keyword], () => {
    const youtube = new FakeYoutube();
    return youtube.search(keyword);
  });
  return (
    <>
      <div>Videos { keyword ? `${keyword}` : `Hot Trend`}</div>
      {isLoading && <p>loading</p>}
      {error && <p>에러발생..</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video}/>
          ))}
        </ul>
      )}
    </>
  );
}

