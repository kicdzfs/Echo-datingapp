"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { PostItem } from '../SubComponents';

const PlazaTab = forwardRef(
  ({ posts, onLikePost, onAddComment, onOpenDetail }, ref) => {
  const [activeFeed, setActiveFeed] = useState('rec');
  const [now, setNow] = useState(() => Date.now());
  const [containerWidth, setContainerWidth] = useState(0);
  const pagerRef = useRef(null);
  const recListRef = useRef(null);
  const realtimeListRef = useRef(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
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

  const makeExtended = (source) => {
    if (!source || source.length === 0) return [];
    if (source.length >= 10) {
      return source.map((post, index) => ({
        post,
        key: `${post.id}-${index}`
      }));
    }
    return Array.from({ length: 10 }, (_, index) => {
      const post = source[index % source.length];
      return { post, key: `${post.id}-${index}` };
    });
  };

  const recExtended = makeExtended(recPosts);
  const realtimeExtended = makeExtended(realtimePosts);

  useEffect(() => {
    if (pagerRef.current) {
      setContainerWidth(pagerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (!containerWidth) return;
    const index = activeFeed === 'rec' ? 0 : 1;
    controls.start({
      x: -index * containerWidth,
      transition: { type: 'tween', duration: 0.25 }
    });
  }, [activeFeed, containerWidth, controls]);

  useImperativeHandle(ref, () => ({
    scrollToTopAndRefresh() {
      const targetRef =
        activeFeed === 'rec' ? recListRef.current : realtimeListRef.current;
      if (targetRef) {
        targetRef.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setNow(Date.now());
    }
  }));

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top App Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="h-12 flex items-center justify-center">
          <div className="bg-gray-100 rounded-full p-1 flex gap-1 w-56">
            {['rec', 'realtime'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveFeed(type)}
                className={`flex-1 text-sm font-semibold py-1.5 rounded-full transition-all ${
                  activeFeed === type
                    ? 'bg-white text-[#151921] shadow-sm'
                    : 'text-gray-400'
                }`}
              >
                {type === 'rec' ? 'Rec' : 'Real-time'}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Content area as swipeable pager */}
      <div className="pb-28 flex-1 overflow-hidden bg-white">
        <motion.div
          ref={pagerRef}
          className="flex h-full"
          style={{ x }}
          drag="x"
          dragConstraints={{
            left: containerWidth ? -containerWidth : 0,
            right: 0
          }}
          dragElastic={0.2}
          onDragEnd={(event, info) => {
            if (!containerWidth) return;
            const offsetX = info.offset.x;
            const velocityX = info.velocity.x;
            const currentIndex = activeFeed === 'rec' ? 0 : 1;
            let nextIndex = currentIndex;
            const threshold = containerWidth * 0.2;

            if (offsetX < -threshold || velocityX < -500) {
              nextIndex = 1;
            } else if (offsetX > threshold || velocityX > 500) {
              nextIndex = 0;
            }

            if (nextIndex === 0 && activeFeed !== 'rec') {
              setActiveFeed('rec');
            } else if (nextIndex === 1 && activeFeed !== 'realtime') {
              setActiveFeed('realtime');
            } else {
              controls.start({
                x: -currentIndex * containerWidth,
                transition: { type: 'tween', duration: 0.2 }
              });
            }
          }}
          animate={controls}
        >
          {/* Page 0: Rec */}
          <div className="min-w-full flex-1">
            <div
              ref={recListRef}
              className="h-full overflow-y-auto pt-2"
            >
              {recExtended.length === 0 ? (
                <div className="text-center text-gray-400 py-16 text-sm">
                  No posts yet.
                </div>
              ) : (
                recExtended.map(({ post, key }) => (
                  <PostItem
                    key={key}
                    post={post}
                    onLike={onLikePost}
                    onAddComment={onAddComment}
                    onOpenDetail={() => onOpenDetail(post)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Page 1: Real-time */}
          <div className="min-w-full flex-1">
            <div
              ref={realtimeListRef}
              className="h-full overflow-y-auto pt-2"
            >
              {realtimeExtended.length === 0 ? (
                <div className="text-center text-gray-400 py-16 text-sm">
                  No posts yet.
                </div>
              ) : (
                realtimeExtended.map(({ post, key }) => (
                  <PostItem
                    key={key}
                    post={post}
                    onLike={onLikePost}
                    onAddComment={onAddComment}
                    onOpenDetail={() => onOpenDetail(post)}
                  />
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

PlazaTab.displayName = 'PlazaTab';

export default PlazaTab;
