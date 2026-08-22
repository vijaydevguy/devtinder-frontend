import React, { useEffect } from 'react'
import useFeed from '../hooks/useFeed'
import { useLocation } from 'react-router-dom';

const Feed = () => {
  const {getFeed,loading,feed} = useFeed();
  const location = useLocation();


  useEffect(()=>{
    getFeed();
  }, [])

  return (
    <div>Feed</div>
  )
}

export default Feed