"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  MoreVertical,
  MessageSquare,
  Share2,
  Check,
  X,
  Send,
  Flag,
  ChevronRight,
  ShoppingBag,
  Crown,
  Activity,
  Settings,
  Shield,
  Grid,
  Info,
  AlertTriangle,
  Plus,
  Coins,
  HeartHandshake,
  UserX,
  Bell,
  Eye
} from 'lucide-react';
import {
  GAMES_LIST,
  RECS_LIST,
  CHAT_HISTORY,
  VIP_PLANS,
  TERMS_LIST,
  PARTNER_BRANDS,
  MORE_BRANDS_LIST,
  MALL_ITEMS
} from '../data/mockData';

// --- Helper functions & hooks ---

export const formatTime = (timestamp) => {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} mins ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hours ago`;
  return '1 day ago';
};

export const useDismiss = (isOpen, onClose) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('[data-popover="true"]')) onClose();
    };
    const handleScroll = () => onClose();
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen, onClose]);
};

// --- Reusable visual components ---

export const Stars = ({ count }) => (
  <div className="flex space-x-0.5">
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-xs ${
          i < count ? 'text-yellow-400' : 'text-gray-200'
        }`}
      >
        ★
      </span>
    ))}
  </div>
);

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every(Boolean)
    ? 'Draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <div className="text-[#5F48E6] font-bold mb-3">{status}</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((square, i) => (
          <button
            key={i}
            className={`w-12 h-12 rounded-lg text-xl font-bold flex items-center justify-center transition-colors ${
              square === 'X'
                ? 'bg-[#D7D0FF] text-[#5F48E6]'
                : square === 'O'
                ? 'bg-[#C7F4C2] text-[#0BAB7C]'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => handleClick(i)}
          >
            {square}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          setBoard(Array(9).fill(null));
          setXIsNext(true);
        }}
        className="text-xs bg-[#151921] text-white px-4 py-2 rounded-full"
      >
        Restart Match
      </button>
    </div>
  );
};

export const SharePopover = ({ isOpen, onClose }) => {
  useDismiss(isOpen, onClose);
  if (!isOpen) return null;

  const platforms = [
    {
      name: 'WhatsApp',
      icon: 'fa-whatsapp',
      color: 'text-green-500',
      url: 'whatsapp://send?text=Check out this cool app!'
    },
    {
      name: 'Threads',
      icon: 'fa-threads',
      color: 'text-black',
      url: 'https://threads.net'
    },
    {
      name: 'LINE',
      icon: 'fa-line',
      color: 'text-green-600',
      url: 'line://msg/text/Check out this cool app!'
    },
    {
      name: 'Instagram',
      icon: 'fa-instagram',
      color: 'text-pink-600',
      url: 'instagram://'
    }
  ];

  return (
    <div
      data-popover="true"
      className="absolute z-20 bg-white shadow-xl rounded-xl p-3 border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-200 flex gap-4 flex-wrap bottom-10 right-0 w-max max-w-[calc(100vw-2rem)]"
    >
      <div className="absolute -bottom-1.5 right-2 w-3 h-3 bg-white rotate-45 border-b border-r border-gray-100" />
      {platforms.map((p) => (
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 hover:scale-110 transition-transform flex-shrink-0 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-lg">
            <i className={`fa-brands ${p.icon} ${p.color}`}></i>
          </div>
        </a>
      ))}
    </div>
  );
};

export const CommentPopover = ({ isOpen, onClose, onSubmit }) => {
  const [text, setText] = useState('');
  useDismiss(isOpen, onClose);
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
      onClose();
    }
  };

  return (
    <div
      data-popover="true"
      className="absolute z-20 bg-white shadow-xl rounded-xl p-2 border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-200 bottom-10 left-[-1rem] w-72 sm:w-80"
    >
      <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-white rotate-45 border-b border-r border-gray-100" />
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 items-center"
      >
        <input
          type="text"
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm outline-none border border-transparent focus:border-[#5F48E6] placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-[#5F48E6] text-white rounded-full disabled:opacity-50 w-12 h-10 flex items-center justify-center flex-shrink-0 transition-transform active:scale-95"
          disabled={!text.trim()}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export const PostItem = ({
  post,
  onLike,
  onAddComment,
  onOpenDetail,
  isDetailView = false
}) => {
  const [isShareOpen, setShareOpen] = useState(false);
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const MAX_LENGTH = 100;
  const isLong = !isDetailView && post.content.length > MAX_LENGTH;
  const displayContent = isDetailView
    ? post.content
    : isLong
    ? `${post.content.substring(0, MAX_LENGTH)}...`
    : post.content;

  const toggleComment = () => {
    setCommentOpen(!isCommentOpen);
    setShareOpen(false);
  };

  const openShare = () => {
    setShareOpen(true);
    setCommentOpen(false);
  };
  const handleReport = () => {
    setShowReport(false);
    alert('Post reported. Thank you.');
  };

  return (
    <div
      className={`bg-white p-4 rounded-2xl shadow-sm relative ${
        isDetailView ? 'shadow-none' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div
          className="flex gap-3"
          onClick={!isDetailView ? onOpenDetail : undefined}
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
            {post.avatar}
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#151921]">
              {post.user}
            </h4>
            <span className="text-xs text-gray-400">
              {formatTime(post.timestamp)}
            </span>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowReport(!showReport);
            }}
            className="p-1"
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
          {showReport && (
            <div
              data-popover="true"
              className="absolute right-0 top-6 bg-white shadow-lg border border-gray-100 rounded-lg py-1 z-10 w-24 animate-in fade-in duration-200"
            >
              <button
                onClick={handleReport}
                className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-gray-50 flex items-center gap-2"
              >
                <Flag className="w-3 h-3" /> Report
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className="mb-3"
        onClick={!isDetailView ? onOpenDetail : undefined}
      >
        <p className="text-sm text-gray-700 leading-relaxed">
          {displayContent}
          {isLong && (
            <span className="text-[#5F48E6] font-bold ml-1 cursor-pointer">
              See more
            </span>
          )}
        </p>
      </div>
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full h-auto max-h-80 object-cover rounded-xl mb-3"
          onClick={!isDetailView ? onOpenDetail : undefined}
        />
      )}
      <div className="flex justify-between items-center pt-2 border-t border-gray-50 relative">
        <div className="flex gap-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(post.id);
            }}
            className={`flex items-center gap-1 text-xs transition-all active:scale-125 ${
              post.isLiked ? 'text-[#5F48E6]' : 'text-gray-400'
            }`}
          >
            <i
              className={`fa-solid fa-heart-pulse text-lg ${
                post.isLiked ? 'text-[#5F48E6]' : 'text-gray-400'
              }`}
            ></i>
            <span className="ml-1">{post.likes}</span>
          </button>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleComment();
              }}
              className="flex items-center gap-1 text-gray-400 text-xs"
            >
              <MessageSquare className="w-4 h-4" /> {post.comments.length}
            </button>
            <CommentPopover
              isOpen={isCommentOpen}
              onClose={() => setCommentOpen(false)}
              onSubmit={(text) => onAddComment(post.id, text)}
            />
          </div>
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openShare();
            }}
            className="text-gray-400 flex items-center gap-1 text-xs"
          >
            <Share2 className="w-4 h-4" /> {post.shares}
          </button>
          <SharePopover
            isOpen={isShareOpen}
            onClose={() => setShareOpen(false)}
          />
        </div>
      </div>
      {!isDetailView && post.comments.length > 0 && (
        <div
          className="mt-3 bg-gray-50 rounded-xl p-3 space-y-1.5"
          onClick={onOpenDetail}
        >
          {post.comments.slice(0, 3).map((c) => (
            <div
              key={c.id}
              className="text-xs text-gray-600"
            >
              <span className="font-bold text-[#151921] mr-1">
                {c.user}:
              </span>
              {c.text.length > 40
                ? c.text.substring(0, 40) + '...'
                : c.text}
            </div>
          ))}
          {post.comments.length > 3 && (
            <div className="text-[10px] text-[#5F48E6] font-medium mt-1">
              View all {post.comments.length} comments
            </div>
          )}
        </div>
      )}
      {isDetailView && post.comments.length > 0 && (
        <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
          <h3 className="font-bold text-sm text-[#151921]">
            Comments
          </h3>
          {post.comments.map((c) => (
            <div
              key={c.id}
              className="flex gap-3"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                {c.user[0]}
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl rounded-tl-none">
                <span className="font-bold text-xs text-[#151921] block mb-1">
                  {c.user}
                </span>
                <span className="text-xs text-gray-700">
                  {c.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Overlays & modals ---

export const NewPostOverlay = ({ onClose, onPost }) => {
  const [content, setContent] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleBack = () => {
    if (content.trim()) setShowConfirm(true);
    else onClose();
  };

  const handlePost = () => {
    if (content.trim()) {
      onPost(content);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F3F0FF] flex flex-col max-w-md mx-auto sm:rounded-[3rem] h-[95vh] top-auto bottom-auto border-4 border-white">
      <div className="bg-white px-4 py-3 flex justify-between items-center shadow-sm rounded-t-[2.5rem]">
        <button
          onClick={handleBack}
          className="p-1"
        >
          <ArrowLeft className="w-6 h-6 text-[#151921]" />
        </button>
        <h2 className="font-bold text-lg text-[#151921]">
          Create Post
        </h2>
        <button
          onClick={handlePost}
          disabled={!content.trim()}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
            content.trim()
              ? 'bg-[#5F48E6] text-white'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          Post
        </button>
      </div>
      <div className="flex-1 p-4">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-64 p-4 bg-white rounded-2xl resize-none outline-none text-[#151921] placeholder-gray-400"
        />
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-[3rem]">
          <div className="bg-white w-4/5 max-w-sm rounded-2xl p-6">
            <h3 className="font-bold text-lg text-[#151921] mb-2">
              Discard post?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              If you go back now, your post will be discarded.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-full border border-gray-300 text-gray-600 font-bold"
              >
                Keep Editing
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-full bg-[#FF4D4F] text-white font-bold"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const TodaysQuestionModal = ({ question, onClose }) => (
  <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-6 animate-in fade-in duration-300">
    <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl transform scale-100 transition-all relative overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-1.5 bg-[#0BAB7C]" />
      <div className="mb-2 flex items-center gap-2">
        <span className="text-2xl">📅</span>
        <h3 className="text-[#0BAB7C] font-bold text-sm uppercase tracking-wider">
          Today&apos;s Question
        </h3>
      </div>
      <p className="text-lg font-bold text-[#151921] mb-8 mt-2 leading-tight">
        {question}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onClose}
          className="flex items-center justify-center py-3 rounded-xl bg-[#F3F0FF] border-2 border-transparent hover:border-[#0BAB7C] group transition-all"
        >
          <Check className="w-6 h-6 text-gray-400 group-hover:text-[#0BAB7C]" />
        </button>
        <button
          onClick={onClose}
          className="flex items-center justify-center py-3 rounded-xl bg-[#F3F0FF] border-2 border-transparent hover:border-[#FF4D4F] group transition-all"
        >
          <X className="w-6 h-6 text-gray-400 group-hover:text-[#FF4D4F]" />
        </button>
      </div>
      <p className="text-[10px] text-gray-400 text-center mt-6">
        Answering helps us personalize your experience.
      </p>
    </div>
  </div>
);

// --- Chat overlays ---

export const AIChatView = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am Echo AI. How can I help you today with your relationships or finding a match?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          text: 'That is an interesting perspective! Tell me more.'
        }
      ]);
    }, 1000);
  };

  return (
    <div className="absolute inset-0 z-40">
      <div className="h-full bg-[#F3F0FF] flex flex-col animate-in slide-in-from-right duration-300 relative overflow-hidden">
        <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm">
          <button onClick={onClose}>
            <ArrowLeft className="w-6 h-6 text-[#151921]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-lg">
              🤖
            </div>
            <h2 className="font-bold text-lg text-[#151921]">
              Echo AI
            </h2>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-auto-hide pb-32">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.sender === 'user'
                    ? 'bg-[#5F48E6] text-white rounded-tr-none'
                    : 'bg-white text-gray-700 rounded-tl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
            placeholder="Ask AI anything..."
          />
          <button
            onClick={handleSend}
            className="bg-[#5F48E6] text-white p-2 rounded-full"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const UserProfileDetail = ({ user, onClose }) => {
  const handleReport = () => {
    alert(`Reported user ${user.name} for violation.`);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-right duration-300">
      <div className="relative h-64 bg-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 bg-white/50 p-2 rounded-full z-10"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <div className="w-full h-full flex items-center justify-center text-6xl">
          {user.avatar}
        </div>
      </div>
      <div className="flex-1 p-6 -mt-6 bg-white rounded-t-[2rem] relative">
        <h1 className="text-3xl font-bold text-[#151921]">
          {user.name}
        </h1>
        <p className="text-gray-500 mt-1">
          {user.msg || 'No bio available.'}
        </p>
        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-bold text-sm mb-1">Interests</h3>
            <p className="text-xs text-gray-500">
              Travel, Hiking, Games
            </p>
          </div>
        </div>
        <button
          onClick={handleReport}
          className="mt-8 w-full py-3 rounded-xl border border-red-500 text-red-500 font-bold flex items-center justify-center gap-2"
        >
          <AlertTriangle className="w-5 h-5" /> Report User
        </button>
      </div>
    </div>
  );
};

export const UserChatView = ({
  chat,
  onClose,
  onUpdateChat,
  onMatchStatusChange,
  onDeductPoints,
  onBlockUser,
  availablePoints
}) => {
  const buildInitialMessages = () => {
    if (chat.messages && chat.messages.length > 0) {
      return chat.messages;
    }
    if (chat.lastMessage) {
      return [{ id: 1, sender: 'them', text: chat.lastMessage }];
    }
    return [];
  };
  const [messages, setMessages] = useState(buildInitialMessages);
  const [input, setInput] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [pointsValue, setPointsValue] = useState('');
  const [showMatchConfirm, setShowMatchConfirm] = useState(false);
  const [showUnmatchConfirm, setShowUnmatchConfirm] = useState(false);
  const [pendingDecision, setPendingDecision] = useState(null);
  useDismiss(showMenu, () => setShowMenu(false));

  const formatNow = () =>
    new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

  const persistMessages = (nextMessages, overrideText) => {
    setMessages(nextMessages);
    const lastText =
      overrideText ||
      (nextMessages.length
        ? nextMessages[nextMessages.length - 1].text
        : '');
    onUpdateChat?.(chat.id, {
      lastMessage: lastText,
      time: formatNow(),
      messages: nextMessages
    });
  };

  const handleSend = () => {
    if (!input.trim() || chat.isBlocked) return;
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: input
    };
    const nextMessages = [...messages, newMessage];
    persistMessages(nextMessages, newMessage.text);
    setInput('');
  };

  const handleSendPoints = (amount) => {
    onDeductPoints?.(amount);
    const text = `You sent ${amount} points to ${chat.name}.`;
    const nextMessages = [
      ...messages,
      { id: Date.now(), sender: 'me', text, type: 'system' }
    ];
    persistMessages(nextMessages, text);
  };

  const createDecisionMessages = (type) => {
    const outgoingText =
      type === 'match'
        ? 'You sent a match request. Please wait for the other person to respond.'
        : 'You asked to end the match. Waiting for their response.';
    const incomingText =
      type === 'match'
        ? 'The other person sent you a match request. Please decide carefully whether to accept.'
        : 'The other person wants to end the match. Do you agree?';
    const decisionId = Date.now() + 1;
    const nextMessages = [
      ...messages,
      { id: Date.now(), sender: 'me', text: outgoingText, type: 'system' },
      {
        id: decisionId,
        sender: 'them',
        text: incomingText,
        decisionType: type
      }
    ];
    persistMessages(nextMessages, outgoingText);
    setPendingDecision({ type, messageId: decisionId });
  };

  const handleDecision = (accepted) => {
    if (!pendingDecision) return;
    const { type, messageId } = pendingDecision;
    let responseText = '';
    if (type === 'match') {
      if (accepted) {
        responseText = `${chat.name} accepted your match request! You are now matched.`;
        onMatchStatusChange?.(chat.id, true);
      } else {
        responseText = `${chat.name} declined your match request.`;
      }
    } else {
      if (accepted) {
        responseText = `${chat.name} accepted your request. You are no longer matched.`;
        onMatchStatusChange?.(chat.id, false);
      } else {
        responseText = `${chat.name} declined your request to end the match.`;
      }
    }
    const nextMessages = messages.map((m) =>
      m.id === messageId ? { ...m, decisionType: undefined } : m
    );
    const finalMessages = [
      ...nextMessages,
      { id: Date.now(), sender: 'system', text: responseText, type: 'system' }
    ];
    persistMessages(finalMessages, responseText);
    setPendingDecision(null);
  };

  const handleBlock = () => {
    setShowMenu(false);
    setShowActions(false);
    const text = `You blocked ${chat.name}. They were added to your block list.`;
    const nextMessages = [
      ...messages,
      { id: Date.now(), sender: 'system', text, type: 'system' }
    ];
    persistMessages(nextMessages, text);
    onMatchStatusChange?.(chat.id, false);
    onBlockUser?.({
      id: chat.id,
      name: chat.name,
      avatar: chat.avatar
    });
  };

  if (showProfile) {
    return (
      <UserProfileDetail
        user={chat}
        onClose={() => setShowProfile(false)}
      />
    );
  }

  const scrollPadding = showActions ? 'pb-64' : 'pb-32';

  return (
    <div className="absolute inset-0 z-40">
      <div className="h-full bg-[#F3F0FF] flex flex-col animate-in slide-in-from-right duration-300 relative overflow-hidden">
        <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onClose}>
            <ArrowLeft className="w-6 h-6 text-[#151921]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center text-lg">
              {chat.avatar}
            </div>
            <h2 className="font-bold text-lg text-[#151921]">
              {chat.name}
            </h2>
          </div>
        </div>
        <div className="relative">
          <button onClick={() => setShowMenu((open) => !open)}>
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
          {showMenu && (
            <div
              data-popover="true"
              className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 w-44 py-1 z-50"
            >
              <button
                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  setShowProfile(true);
                  setShowMenu(false);
                }}
              >
                View profile
              </button>
              <button
                className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-gray-50"
                onClick={() => {
                  setShowMenu(false);
                  alert(`Reported user ${chat.name} for violation.`);
                }}
              >
                Report user
              </button>
              <button
                className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-gray-50"
                onClick={handleBlock}
              >
                Block user
              </button>
            </div>
          )}
        </div>
      </div>

        <div className={`flex-1 overflow-y-auto p-4 space-y-4 scrollbar-auto-hide ${scrollPadding}`}>
        {chat.isBlocked && (
          <div className="bg-red-50 text-red-500 text-xs px-4 py-2 rounded-2xl">
            You have blocked this user. Unblock via Settings &gt; Block list to chat again.
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.sender === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                m.sender === 'me'
                  ? 'bg-[#5F48E6] text-white rounded-tr-none'
                  : 'bg-white text-gray-700 rounded-tl-none shadow-sm'
              }`}
            >
              {m.text}
              {m.decisionType &&
                pendingDecision?.messageId === m.id && (
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      className="flex-1 py-1.5 rounded-full border border-red-400 text-red-500 text-xs font-bold"
                      onClick={() => handleDecision(false)}
                    >
                      {m.decisionType === 'match'
                        ? 'Decline'
                        : 'Stay matched'}
                    </button>
                    <button
                      type="button"
                      className="flex-1 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold"
                      onClick={() => handleDecision(true)}
                    >
                      {m.decisionType === 'match'
                        ? 'Accept'
                        : 'End match'}
                    </button>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>

        {showActions && !chat.isBlocked && (
          <div className="absolute inset-0 z-30" onClick={() => setShowActions(false)}>
            <div
              className="absolute bottom-24 left-0 right-0 px-4"
              data-popover="true"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-3xl shadow-2xl p-5 animate-in slide-in-from-bottom duration-200">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex flex-col items-center gap-2 text-xs font-semibold text-gray-600"
                    onClick={() => {
                      setShowActions(false);
                      setShowPointsModal(true);
                    }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#F3F0FF] flex items-center justify-center text-[#5F48E6] shadow-inner">
                      <Coins className="w-7 h-7" />
                    </div>
                    <span>Send points</span>
                  </button>
                  <button
                    type="button"
                    className="flex flex-col items-center gap-2 text-xs font-semibold text-gray-600"
                    onClick={() => {
                      setShowActions(false);
                      if (chat.isMatched) setShowUnmatchConfirm(true);
                      else setShowMatchConfirm(true);
                    }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#F3F0FF] flex items-center justify-center shadow-inner">
                      {chat.isMatched ? (
                        <UserX className="w-7 h-7 text-red-500" />
                      ) : (
                        <HeartHandshake className="w-7 h-7 text-[#5F48E6]" />
                      )}
                    </div>
                    <span>
                      {chat.isMatched ? 'End match' : 'Match invite'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
        <button
          type="button"
          disabled={chat.isBlocked}
          onClick={() => setShowActions((prev) => !prev)}
          className={`w-9 h-9 rounded-full ${
            chat.isBlocked
              ? 'bg-gray-200 text-gray-400'
              : 'bg-gray-100 text-gray-500'
          } flex items-center justify-center`}
        >
          <Plus className="w-4 h-4" />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={chat.isBlocked}
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none disabled:opacity-60"
          placeholder={
            chat.isBlocked ? 'Unblock to send messages' : 'Type a message...'
          }
        />
        <button
          onClick={handleSend}
          disabled={chat.isBlocked}
          className={`p-2 rounded-full ${
            chat.isBlocked
              ? 'bg-gray-200 text-gray-400'
              : 'bg-[#5F48E6] text-white'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {showPointsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-4/5 max-w-sm rounded-2xl p-6">
            <h3 className="font-bold text-lg text-[#151921] mb-2">
              Send points
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              How many points would you like to send to {chat.name}?
              {typeof availablePoints === 'number' && (
                <span className="block mt-1">
                  Available: {availablePoints}
                </span>
              )}
            </p>
            <input
              type="number"
              min="1"
              value={pointsValue}
              onChange={(e) => setPointsValue(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm mb-4 outline-none focus:border-[#5F48E6]"
              placeholder="Enter points"
            />
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 py-2.5 rounded-full border border-gray-300 text-gray-600 text-sm font-bold"
                onClick={() => {
                  setShowPointsModal(false);
                  setPointsValue('');
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 py-2.5 rounded-full bg-[#5F48E6] text-white text-sm font-bold disabled:opacity-50"
                disabled={!pointsValue}
                onClick={() => {
                  const amount = parseInt(pointsValue, 10);
                  if (Number.isNaN(amount) || amount <= 0) {
                    alert('Please enter a valid amount.');
                    return;
                  }
                  handleSendPoints(amount);
                  setShowPointsModal(false);
                  setPointsValue('');
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {showMatchConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-4/5 max-w-sm rounded-2xl p-6">
            <h3 className="font-bold text-lg text-[#151921] mb-2">
              Send match request?
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Are you sure you want to send a match request to {chat.name}?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 py-2.5 rounded-full border border-gray-300 text-gray-600 text-sm font-bold"
                onClick={() => setShowMatchConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 py-2.5 rounded-full bg-emerald-500 text-white text-sm font-bold"
                onClick={() => {
                  setShowMatchConfirm(false);
                  createDecisionMessages('match');
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {showUnmatchConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-4/5 max-w-sm rounded-2xl p-6">
            <h3 className="font-bold text-lg text-[#151921] mb-2">
              Request to end match?
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Do you want to send a request to end the match with {chat.name}?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 py-2.5 rounded-full border border-gray-300 text-gray-600 text-sm font-bold"
                onClick={() => setShowUnmatchConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 py-2.5 rounded-full bg-red-500 text-white text-sm font-bold"
                onClick={() => {
                  setShowUnmatchConfirm(false);
                  createDecisionMessages('unmatch');
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

// --- Me tab sub-pages (used only inside MeTab, but exported for clarity) ---

export const PersonalPlaza = ({
  posts,
  onBack,
  onLikePost,
  onAddComment
}) => {
  const myPosts = posts
    .filter((p) => p.user === 'Anni')
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="absolute inset-0 bg-[#F3F0FF] z-30 flex flex-col rounded-[2.8rem] overflow-hidden animate-in slide-in-from-right duration-200">
      <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm pt-6">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-[#151921]" />
        </button>
        <h2 className="font-bold text-lg text-[#151921]">
          Personal Plaza
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {myPosts.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No posts yet.
          </div>
        ) : (
          myPosts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onLike={onLikePost}
              onAddComment={onAddComment}
              onOpenDetail={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
};

export const EMall = ({ onBack }) => {
  const [showMore, setShowMore] = useState(false);

  if (showMore) {
    return (
      <div className="absolute inset-0 bg-[#F3F0FF] z-40 flex flex-col rounded-[2.8rem] overflow-hidden animate-in slide-in-from-right duration-200">
        <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm pt-6">
          <button onClick={() => setShowMore(false)}>
            <ArrowLeft className="w-6 h-6 text-[#151921]" />
          </button>
          <h2 className="font-bold text-lg text-[#151921]">
            More Brands
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 gap-4">
            {MORE_BRANDS_LIST.map((brand) => (
              <div
                key={brand.id}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center p-2 border border-gray-100 overflow-hidden">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-bold text-gray-600 text-center">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-[#F3F0FF] z-30 flex flex-col rounded-[2.8rem] overflow-hidden animate-in slide-in-from-right duration-200">
      <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm pt-6">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-[#151921]" />
        </button>
        <h2 className="font-bold text-lg text-[#151921]">E Mall</h2>
      </div>
      <div className="w-full h-48 relative flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"
          className="w-full h-full object-cover opacity-90"
          alt="Coffee Banner"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-bold drop-shadow-md">
            Special Gifts !
          </h2>
          <p className="font-medium mt-1 text-lg drop-shadow-md">
            Show you care...
          </p>
          <p className="text-[10px] mt-2 opacity-90">
            Available until December 30th, 2024. Grab it fast!
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#FBFAF3] px-4 pt-6 pb-24 -mt-4 rounded-t-3xl relative z-10">
        <div className="flex justify-between mb-8 px-2">
          {PARTNER_BRANDS.map((brand, index) => (
            <div
              key={index}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md ${brand.bg} overflow-hidden border-2 border-white cursor-pointer hover:scale-105 transition-transform`}
            >
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <span className="text-[8px] text-center font-bold leading-tight px-1">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
          <div
            onClick={() => setShowMore(true)}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-md bg-[#D7D0FF] overflow-hidden border-2 border-white cursor-pointer hover:scale-105 transition-transform"
          >
            <Grid className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {MALL_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-[#9370DB] p-2 rounded-2xl shadow-md flex flex-col transform hover:scale-105 transition-transform duration-200"
            >
              <div className="w-full h-32 bg-white rounded-xl overflow-hidden mb-2 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between px-2 mt-auto pb-1">
                <div className="flex items-center gap-1 text-white">
                  <ShoppingBag className="w-3 h-3" />
                  <span className="text-[10px] font-bold">BUY NOW</span>
                </div>
                <span className="text-white font-bold text-sm">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const VIPCenter = ({
  onBack,
  currentPlan = 0,
  hasMbti = false,
  onSelectPlan
}) => {
  const [activePlan, setActivePlan] = useState(currentPlan);
  const [message, setMessage] = useState('');

  const handleSelect = () => {
    if (currentPlan === activePlan) return;
    const requiresMbti = activePlan > 0;
    if (requiresMbti && !hasMbti) {
      setMessage('Please complete your MBTI test before upgrading.');
      return;
    }
    onSelectPlan?.(activePlan);
    setMessage('Plan updated!');
  };

  return (
    <div className="absolute inset-0 bg-white z-30 flex flex-col rounded-[2.8rem] overflow-hidden animate-in slide-in-from-right duration-200">
      <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-100 pt-6">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-[#151921]" />
        </button>
        <h2 className="font-bold text-lg text-[#151921]">
          VIP Center
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6 pb-20 bg-gradient-to-b from-white to-[#F3F0FF]">
        <div className="text-center mb-6">
          <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-2 drop-shadow-sm" />
          <h1 className="text-2xl font-bold text-[#151921]">
            Upgrade Your Love Life
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Select a plan that suits your dating style.
          </p>
        </div>
        <div className="flex justify-center gap-2 mb-8">
          {VIP_PLANS.map((plan, index) => (
            <button
              key={index}
              onClick={() => setActivePlan(index)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activePlan === index
                  ? 'bg-[#151921] text-white shadow-md scale-105'
                  : 'bg-white text-gray-400 border border-gray-100'
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>
        <div
          className={`rounded-3xl p-6 ${VIP_PLANS[activePlan].color} transition-all duration-500 shadow-xl border border-white/50`}
        >
          <div className="flex justify-between items-start mb-2">
            <h2
              className={`text-3xl font-black ${VIP_PLANS[activePlan].textColor}`}
            >
              {VIP_PLANS[activePlan].name}
            </h2>
            {currentPlan === activePlan && (
              <span className="bg-white/80 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Current
              </span>
            )}
          </div>
          <div className="h-1 w-12 bg-current opacity-20 rounded-full mb-6" />
          <ul className="space-y-3 mb-8">
            {VIP_PLANS[activePlan].features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-gray-700"
              >
                <Check
                  className={`w-4 h-4 mt-0.5 ${VIP_PLANS[activePlan].textColor}`}
                />
                <span className="flex-1 leading-tight">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          <button
            disabled={currentPlan === activePlan}
            onClick={handleSelect}
            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-transform ${
              currentPlan === activePlan
                ? 'bg-gray-400 cursor-not-allowed'
                : `${VIP_PLANS[activePlan].btnColor} active:scale-95`
            }`}
          >
            {currentPlan === activePlan
              ? 'Current Plan'
              : `Select ${VIP_PLANS[activePlan].name}`}
          </button>
          {message && (
            <p className="text-xs text-center text-[#5F48E6] mt-3">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const SecurityPrivacy = ({ onBack }) => {
  const [selectedTerm, setSelectedTerm] = useState(null);

  return (
    <div className="absolute inset-0 bg-[#F3F0FF] z-30 flex flex-col rounded-[2.8rem] overflow-hidden animate-in slide-in-from-right duration-200">
      <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm pt-6">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-[#151921]" />
        </button>
        <h2 className="font-bold text-lg text-[#151921]">
          Security & Privacy
        </h2>
      </div>
      {selectedTerm ? (
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <button
            onClick={() => setSelectedTerm(null)}
            className="text-[#5F48E6] text-sm font-bold mb-4 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to list
          </button>
          <h2 className="text-2xl font-bold text-[#151921] mb-4">
            {selectedTerm.title}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {selectedTerm.content}
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {TERMS_LIST.map((term, i) => (
            <div
              key={i}
              onClick={() => setSelectedTerm(term)}
              className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-50"
            >
              <span className="font-medium text-[#151921]">
                {term.title}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const SettingsPage = ({ onBack, onOpenBlockList }) => (
  <div className="absolute inset-0 bg-[#F3F0FF] z-30 flex flex-col rounded-[2.8rem] overflow-hidden animate-in slide-in-from-right duration-200">
    <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm pt-6">
      <button onClick={onBack}>
        <ArrowLeft className="w-6 h-6 text-[#151921]" />
      </button>
      <h2 className="font-bold text-lg text-[#151921]">Settings</h2>
    </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Account
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-[#151921]">
              Edit Profile
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-[#151921]">
              Change Password
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300" />
        </div>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Preferences
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-[#151921]">
              Notifications
            </span>
          </div>
          <div className="w-10 h-6 bg-[#5F48E6] rounded-full relative">
            <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-[#151921]">
              Show Online Status
            </span>
          </div>
          <div className="w-10 h-6 bg-[#5F48E6] rounded-full relative">
            <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" />
          </div>
        </div>
        <div
          className="flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
          onClick={onOpenBlockList}
        >
          <div className="flex items-center gap-3">
            <UserX className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-[#151921]">Block list</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300" />
        </div>
      </div>
    </div>
  </div>
);

export const BlockList = ({
  blockedUsers = [],
  onBack,
  onUnblockUser
}) => (
  <div className="absolute inset-0 bg-[#F3F0FF] z-30 flex flex-col rounded-[2.8rem] overflow-hidden animate-in slide-in-from-right duration-200">
    <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm pt-6">
      <button onClick={onBack}>
        <ArrowLeft className="w-6 h-6 text-[#151921]" />
      </button>
      <h2 className="font-bold text-lg text-[#151921]">Block list</h2>
    </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {blockedUsers.length === 0 ? (
        <div className="text-xs text-gray-400 text-center mt-10">
          No blocked users yet.
        </div>
      ) : (
        blockedUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white p-3 rounded-2xl shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xl">
                {user.avatar || '🫥'}
              </div>
              <span className="font-bold text-sm text-[#151921]">
                {user.name}
              </span>
            </div>
            <button
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500"
              onClick={() => onUnblockUser?.(user.id)}
            >
              Unblock
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

export const MBTIModal = ({ questionSet, onClose, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [manual, setManual] = useState('');

  if (!questionSet) return null;

  const handleFinish = () => {
    if (manual.trim()) {
      onComplete(manual.trim().toUpperCase());
      return;
    }
    const result = questionSet.questions
      .map((q, index) => answers[index])
      .join('');
    if (result.length === questionSet.questions.length) {
      onComplete(result);
    }
  };

  const canSubmit =
    manual.trim().length > 0 ||
    questionSet.questions.every((_, index) => Boolean(answers[index]));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-[#151921]">
            MBTI Quick Check
          </h3>
          <button onClick={onClose} className="text-gray-400">
            ✕
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <p className="text-sm text-gray-500">
            {questionSet.title}. Answer honestly or enter your
            existing MBTI below.
          </p>
          {questionSet.questions.map((question, index) => (
            <div
              key={question.text}
              className="bg-gray-50 p-4 rounded-2xl space-y-2"
            >
              <p className="text-sm text-[#151921]">
                {question.text}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      [index]: question.yes
                    }))
                  }
                  className={`py-2 rounded-xl text-xs font-semibold ${
                    answers[index] === question.yes
                      ? 'bg-[#5F48E6] text-white'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      [index]: question.no
                    }))
                  }
                  className={`py-2 rounded-xl text-xs font-semibold ${
                    answers[index] === question.no
                      ? 'bg-[#5F48E6] text-white'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          ))}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500">
              Already know your MBTI? Enter it manually
            </label>
            <input
              value={manual}
              onChange={(e) => setManual(e.target.value)}
              placeholder="e.g. INFJ"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm uppercase outline-none focus:ring-2 focus:ring-[#5F48E6]"
            />
          </div>
        </div>
        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl border border-gray-200 text-[#151921] font-bold"
          >
            Later
          </button>
          <button
            disabled={!canSubmit}
            onClick={handleFinish}
            className="flex-1 py-3 rounded-2xl bg-[#5F48E6] text-white font-bold disabled:bg-gray-300"
          >
            Save MBTI
          </button>
        </div>
      </div>
    </div>
  );
};
