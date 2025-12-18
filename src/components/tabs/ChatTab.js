"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { RECS_LIST, CHAT_HISTORY } from '../../data/mockData';
import { AIChatView, UserChatView } from '../SubComponents';

const createInitialChats = () =>
  CHAT_HISTORY.filter((chat) => chat.id !== 'clicksol-ai').map((chat) => ({
    id: chat.id,
    name: chat.name,
    avatar: chat.avatar,
    lastMessage: chat.msg,
    time: chat.time,
    unread: chat.unread,
    isMatched: false,
    isBlocked: false,
    messages: chat.msg
      ? [{ id: 1, sender: 'them', text: chat.msg }]
      : []
  }));

const ChatTab = ({ blockedUsers = [], onBlockUser, onOverlayChange }) => {
  const [view, setView] = useState('list'); // 'list', 'ai_chat', 'user_chat'
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [contactedChats, setContactedChats] = useState(createInitialChats);
  const [activeRecIndex, setActiveRecIndex] = useState(0);
  const [swipeStartX, setSwipeStartX] = useState(null);
  const [userPoints, setUserPoints] = useState(1000);

  useEffect(() => {
    onOverlayChange?.(view !== 'list');
  }, [view, onOverlayChange]);

  useEffect(
    () => () => {
      onOverlayChange?.(false);
    },
    [onOverlayChange]
  );

  const blockedIds = useMemo(
    () => new Set(blockedUsers.map((user) => user.id)),
    [blockedUsers]
  );

  const decoratedChats = useMemo(
    () =>
      contactedChats.map((chat) => ({
        ...chat,
        isBlocked: blockedIds.has(chat.id)
      })),
    [contactedChats, blockedIds]
  );

  const selectedChat = decoratedChats.find(
    (c) => c.id === selectedChatId
  );

  const matchedChat = decoratedChats.find(
    (c) => c.isMatched && !c.isBlocked
  );
  const otherChats = matchedChat
    ? decoratedChats.filter((c) => c.id !== matchedChat.id)
    : decoratedChats;

  const handleOpenChat = (chatId) => {
    setSelectedChatId(chatId);
    setView('user_chat');
    setContactedChats((prev) =>
      prev.map((c) =>
        c.id === chatId ? { ...c, unread: 0 } : c
      )
    );
  };

  const handleUpdateChat = (id, updates) => {
    setContactedChats((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      )
    );
  };

  const handleMatchStatusChange = (id, isMatched) => {
    setContactedChats((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isMatched } : c
      )
    );
  };

  const handleBlockContact = (chat) => {
    setContactedChats((prev) =>
      prev.map((c) =>
        c.id === chat.id
          ? { ...c, isBlocked: true, isMatched: false }
          : c
      )
    );
    handleMatchStatusChange(chat.id, false);
    onBlockUser?.({
      id: chat.id,
      name: chat.name,
      avatar: chat.avatar
    });
  };

  const handleDeductPoints = (amount) => {
    setUserPoints((prev) => Math.max(0, prev - amount));
  };

  const goPrevRec = () => {
    setActiveRecIndex((index) =>
      index === 0 ? RECS_LIST.length - 1 : index - 1
    );
  };

  const goNextRec = () => {
    setActiveRecIndex((index) =>
      index === RECS_LIST.length - 1 ? 0 : index + 1
    );
  };

  const handleTouchStart = (e) => {
    setSwipeStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (swipeStartX == null) return;
    const deltaX = e.changedTouches[0].clientX - swipeStartX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goNextRec();
      } else {
        goPrevRec();
      }
    }
    setSwipeStartX(null);
  };

  const handleChatNow = (user) => {
    setContactedChats((prev) => {
      const exists = prev.find((c) => c.id === user.id);
      if (exists) return prev;
      const time = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      const newChat = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        lastMessage: '',
        time,
        unread: 0,
        isMatched: false,
        isBlocked: false,
        messages: []
      };
      return [newChat, ...prev];
    });
    setSelectedChatId(user.id);
    setView('user_chat');
  };

  if (view === 'ai_chat') {
    return <AIChatView onClose={() => setView('list')} />;
  }

  if (view === 'user_chat' && selectedChat) {
    return (
      <UserChatView
        key={selectedChat.id}
        chat={selectedChat}
        onClose={() => setView('list')}
        onUpdateChat={handleUpdateChat}
        onMatchStatusChange={handleMatchStatusChange}
        onDeductPoints={handleDeductPoints}
        onBlockUser={handleBlockContact}
        availablePoints={userPoints}
      />
    );
  }

  const currentRec = RECS_LIST[activeRecIndex];

  return (
    <div className="flex flex-col h-full bg-white pb-20">
      {/* Top App Bar with search */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4">
        <div className="relative flex-shrink-0 py-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search Message"
            className="w-full bg-[#F3F0FF] py-2.5 pl-10 pr-4 rounded-full text-sm shadow-sm outline-none"
          />
        </div>
      </div>

      <div
        onClick={() => setView('ai_chat')}
        className="mb-4 mt-4 mx-4 flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-blue-50">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl relative">
            🤖
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-[#151921]">Clicksol AI</h4>
            <p className="text-xs text-gray-400">
              Always here to chat
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>
      </div>

      {matchedChat && (
        <div className="mb-6 mx-4 flex-shrink-0">
          <div
            className="flex items-center gap-4 p-4 rounded-2xl shadow-md bg-gradient-to-r from-[#4ADE80] to-[#22C55E] cursor-pointer"
            onClick={() => handleOpenChat(matchedChat.id)}
          >
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center text-2xl">
              {matchedChat.avatar}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white text-base">
                {matchedChat.name}
              </h4>
              <p className="text-xs text-white/90">
                Ready to grow your exclusive plant
              </p>
            </div>
            <span className="text-[10px] font-bold text-white/80">
              {matchedChat.time}
            </span>
          </div>
        </div>
      )}

      <div className="mb-6 mx-4 flex-shrink-0">
        <div
          className="bg-white rounded-3xl shadow-md border border-white/70 p-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-[#151921] text-sm">
              5 Recs Today
            </h3>
            <span className="text-[10px] text-gray-400">
              {activeRecIndex + 1} / {RECS_LIST.length}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={goPrevRec}
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500"
            >
              ‹
            </button>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-400 bg-emerald-50 flex items-center justify-center text-3xl">
                {currentRec.avatar}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-[#151921] mb-0.5">
                  {currentRec.name}
                </h4>
                <div className="text-[11px] text-emerald-600 font-bold mb-1">
                  {currentRec.match}% Match
                </div>
                <div className="text-[10px] text-gray-500 mb-1">
                  {currentRec.mbti} · {currentRec.zodiac}
                </div>
                <div className="flex flex-wrap gap-1 text-[9px] text-gray-500">
                  {currentRec.interests.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full bg-gray-50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={goNextRec}
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500"
            >
              ›
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleChatNow(currentRec)}
              className="px-4 py-2 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm active:scale-95 transition-transform"
            >
              Chat Now
            </button>
            <div className="flex gap-1">
              {RECS_LIST.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === activeRecIndex
                      ? 'bg-emerald-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 mb-6 mx-4">
        <h3 className="font-bold text-[#151921] mb-3 flex-shrink-0">
          Messages
        </h3>
        <div className="bg-white dark:bg-[#0b1220] rounded-2xl p-2 flex-1 overflow-y-auto space-y-2 shadow-sm scrollbar-auto-hide dark:border dark:border-white/10">
          {otherChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleOpenChat(chat.id)}
              className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer border border-transparent dark:border-white/10"
            >
              <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-2xl flex-shrink-0 relative">
                {chat.avatar}
                {chat.unread > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {chat.unread}
                  </div>
                )}
              </div>
              <div className="flex-1 border-b border-gray-50 pb-2 min-w-0">
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold text-[#151921] text-sm truncate">
                    {chat.name}
                  </h4>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                    {chat.time}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate">
                  {chat.lastMessage || 'Tap to start the conversation'}
                </p>
                {chat.isBlocked && (
                  <span className="text-[10px] font-bold text-red-400">
                    Blocked
                  </span>
                )}
              </div>
            </div>
          ))}
          {otherChats.length === 0 && (
            <div className="text-center text-xs text-gray-400 py-6">
              No conversations yet. Try starting one from your daily
              recommendations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatTab;
