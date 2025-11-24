"use client";

import React, { useState, useEffect } from 'react';
import { PostItem } from '../SubComponents';

const PlazaTab = ({ posts, onLikePost, onAddComment, onOpenDetail }) => {
  const [activeFeed, setActiveFeed] = useState('rec');
  const [now, setNow] = useState(() => Date.now());
  const TWO_MINS = 2 * 60 * 1000;
  const recPosts = posts
    .filter((p) => now - p.timestamp >= TWO_MINS)
    .sort((a, b) => b.timestamp - a.timestamp);
  const realtimePosts = posts
    .filter((p) => now - p.timestamp < TWO_MINS)
    .sort((a, b) => b.timestamp - a.timestamp);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(timer);
  }, []);

  const displayPosts = activeFeed === 'rec' ? recPosts : realtimePosts;

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-[#E9E4FF] via-[#F3F0FF] to-[#EDE8FF]">
      <div className="sticky top-0 z-10 bg-gradient-to-b from-[#E9E4FF] to-[#E9E4FF] px-4 pt-4 pb-3">
        <div className="flex justify-center">
          <div className="bg-white rounded-full p-1 flex gap-1 w-full max-w-xs shadow-inner">
            {['rec', 'realtime'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveFeed(type)}
                className={`flex-1 text-sm font-bold py-2 rounded-full transition-all ${
                  activeFeed === type
                    ? 'bg-[#F5F3FF] text-[#151921] shadow'
                    : 'text-gray-400'
                }`}
              >
                {type === 'rec' ? 'Rec' : 'Real-time'}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 pb-24 flex-1 bg-gradient-to-b from-[#E9E4FF] via-[#F3F0FF] to-[#EDE8FF]">
        <div className="space-y-6 pt-2">
          {displayPosts.length === 0 ? (
            <div className="text-center text-gray-400 py-16 text-sm">
              No posts yet.
            </div>
          ) : (
            displayPosts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onLike={onLikePost}
                onAddComment={onAddComment}
                onOpenDetail={() => onOpenDetail(post)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PlazaTab;
