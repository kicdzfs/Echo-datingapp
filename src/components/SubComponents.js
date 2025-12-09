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
  ChevronDown,
  ShoppingBag,
  Crown,
  Activity,
  Settings,
  Grid,
  Info,
  AlertTriangle,
  Plus,
  Coins,
  HeartHandshake,
  UserX,
  Bell,
  Eye,
  Calendar,
  MapPin,
  User,
  Moon,
  LifeBuoy,
  Database
} from 'lucide-react';
import {
  GAMES_LIST,
  RECS_LIST,
  CHAT_HISTORY,
  VIP_PLANS,
  PARTNER_BRANDS,
  MORE_BRANDS_LIST,
  MALL_ITEMS
} from '../data/mockData';
import { Image as ImageIcon, Hash, Smile } from 'lucide-react';

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
  const plainContent = (post.content || '').replace(/<[^>]+>/g, '');
  const isLong = !isDetailView && plainContent.length > MAX_LENGTH;
  const displaySnippet = isLong
    ? `${plainContent.substring(0, MAX_LENGTH)}...`
    : plainContent;

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
      className={`w-full bg-white px-4 py-3 relative border-b border-black/5 ${
        isDetailView ? '' : ''
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
        {isDetailView ? (
          <div
            className="text-sm text-gray-700 leading-relaxed break-words"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <p className="text-sm text-gray-700 leading-relaxed">
            {displaySnippet}
            {isLong && (
              <span className="text-[#5F48E6] font-bold ml-1 cursor-pointer">
                See more
              </span>
            )}
          </p>
        )}
      </div>
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full h-auto max-h-80 object-cover rounded-xl mb-3"
          onClick={!isDetailView ? onOpenDetail : undefined}
        />
      )}
      <div className="flex justify-between items-center pt-2 border-t border-gray-100 relative">
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

export const NewPostOverlay = ({
  onClose,
  onPost,
  onSaveDraft,
  onDiscardDraft,
  draftId = null,
  initialContent = ''
}) => {
  const [content, setContent] = useState(initialContent || '');
  const [showConfirm, setShowConfirm] = useState(false);
  const editorRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showTagList, setShowTagList] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setContent(initialContent || '');
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent || '';
    }
  }, [initialContent]);

  useEffect(() => {
    editorRef.current?.focus();
  }, [initialContent]);

  const handleBack = () => {
    if (content.trim()) setShowConfirm(true);
    else onClose();
  };

  const handlePost = () => {
    const plain = content.replace(/<[^>]+>/g, '').trim();
    if (plain) {
      onPost(content);
      if (draftId && onDiscardDraft) {
        onDiscardDraft(draftId);
      }
      onClose();
    }
  };

  const charCount = content.replace(/<[^>]+>/g, '').length;

  const handleDone = () => {
    editorRef.current?.blur();
  };

  const insertAtCursor = (text) => {
    const el = editorRef.current;
    if (!el) {
      setContent((prev) => prev + text);
      return;
    }
    el.focus();
    const selection = window.getSelection();
    if (!selection) return;
    let range =
      selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    if (!range) {
      range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      selection.addRange(range);
    }
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    setContent(el.innerHTML);
  };

  const insertEmojiImage = (name) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    const selection = window.getSelection();
    if (!selection) return;
    let range =
      selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    if (!range) {
      range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      selection.addRange(range);
    }
    const img = document.createElement('img');
    img.src = `/emojis/${name}.png`;
    img.alt = name;
    img.className = 'inline-block w-5 h-5 align-text-bottom';
    range.insertNode(img);
    range.setStartAfter(img);
    range.setEndAfter(img);
    selection.removeAllRanges();
    selection.addRange(range);
    setContent(el.innerHTML);
  };

  const handleSelectEmoji = (name) => {
    insertEmojiImage(name);
  };

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    alert('Image selected. In a real app this would attach to the post.');
    e.target.value = '';
  };

  const emojiMap = [
    { name: 'smile', char: '😀' },
    { name: 'happy', char: '😊' },
    { name: 'angry', char: '😡' },
    { name: 'cry', char: '😢' },
    { name: 'embarrassed', char: '😳' },
    { name: 'surprised', char: '😮' },
    { name: 'wronged', char: '😣' },

    { name: 'shout', char: '😫' },
    { name: 'flushed', char: '😳' },
    { name: 'yummy', char: '😋' },
    { name: 'complacent', char: '😏' },
    { name: 'drool', char: '🤤' },
    { name: 'scream', char: '😱' },
    { name: 'weep', char: '😭' },

    { name: 'speechless', char: '😶' },
    { name: 'funnyface', char: '😜' },
    { name: 'laughwithtears', char: '😂' },
    { name: 'wicked', char: '😈' },
    { name: 'facewithrollingeyes', char: '🙄' },
    { name: 'sulk', char: '😒' },
    { name: 'thinking', char: '🤔' },

    { name: 'lovely', char: '🥰' },
    { name: 'greedy', char: '🤑' },
    { name: 'smileface', char: '🙂' },
    { name: 'wow', char: '🤯' },
    { name: 'joyful', char: '😁' },
    { name: 'hehe', char: '😆' },
    { name: 'slap', char: '🤕' },

    { name: 'tears', char: '😭' },
    { name: 'stun', char: '😵' },
    { name: 'cute', char: '🥺' },
    { name: 'blink', char: '😉' },
    { name: 'disdain', char: '😤' },
    { name: 'astonish', char: '😲' },
    { name: 'rage', char: '🤬' },

    { name: 'cool', char: '😎' },
    { name: 'excited', char: '🤩' },
    { name: 'proud', char: '😌' },
    { name: 'shock', char: '😧' },
    { name: 'evil', char: '👿' },
    { name: 'angel', char: '😇' },
    { name: 'awkward', char: '😬' },

    { name: 'laugh', char: '😄' },
    { name: 'pride', char: '😺' },
    { name: 'nap', char: '😴' },
    { name: 'loveface', char: '😍' }
  ];

  const popularTags = [
    'WeekendVibes',
    'TravelStory',
    'CoffeeTime',
    'BookRecommendations',
    'MBTITalk',
    'DatingQuestions',
    'MovieNight',
    'MusicShare'
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      {/* Top bar */}
      <div className="shrink-0 bg-white px-4 py-3 flex justify-between items-center shadow-sm">
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
      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4 pb-32 flex flex-col gap-4">
        <div className="relative">
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            className="w-full h-[30vh] min-h-[140px] p-4 bg-white outline-none text-[#151921] placeholder-gray-400 border border-gray-200 rounded-2xl text-base whitespace-pre-wrap overflow-y-auto"
          />
          {!content && (
            <span className="pointer-events-none absolute left-4 top-3 text-[#A9A3D4] text-sm select-none">
              What&apos;s on your mind?
            </span>
          )}
        </div>
      </div>
      {/* bottom toolbar fixed near keyboard / safe-area aware */}
      <div className="fixed left-0 right-0 bottom-[env(safe-area-inset-bottom,0px)] z-30 bg-white/95 backdrop-blur border-t border-gray-100 px-4 py-2 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-gray-500 hover:text-[#5F48E6]"
            onClick={() => {
              setShowEmojiPicker((v) => !v);
              setShowTagList(false);
            }}
          >
            <Smile className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="text-gray-500 hover:text-[#5F48E6]"
            onClick={handlePickImage}
          >
            <ImageIcon className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="text-gray-500 hover:text-[#5F48E6]"
            onClick={() => {
              setShowTagList((v) => !v);
              setShowEmojiPicker(false);
            }}
          >
            <Hash className="w-6 h-6" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400">{charCount}</span>
          <button
            type="button"
            onClick={handleDone}
            className="text-sm font-semibold text-[#5F48E6]"
          >
            Done
          </button>
        </div>
      </div>
      {showEmojiPicker && (
        <div className="fixed left-0 right-0 bottom-14 bg-[#F3F0FF] border-t border-gray-200 p-2 grid grid-cols-7 gap-2 max-h-40 overflow-y-auto">
          {emojiMap.map(({ name }) => (
            <button
              key={name}
              type="button"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden"
              onClick={() => handleSelectEmoji(name)}
            >
              <img
                src={`/emojis/${name}.png`}
                alt={name}
                className="w-8 h-8 object-contain"
              />
            </button>
          ))}
        </div>
      )}
      {showTagList && (
        <div className="fixed left-0 right-0 bottom-14 bg-white border-t border-gray-200 p-2 max-h-40 overflow-y-auto">
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => insertAtCursor(`#${tag} `)}
              className="w-full text-left px-3 py-2 text-xs text-[#151921] hover:bg-[#F3F0FF] rounded-lg"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-end z-50">
          <div className="w-full bg-white rounded-t-3xl p-4 space-y-1 shadow-2xl">
            <div className="w-10 h-1.5 rounded-full bg-gray-300 mx-auto mb-2" />
            <button
              onClick={() => {
                onSaveDraft?.(content);
                setShowConfirm(false);
                onClose();
              }}
              className="w-full py-3 text-sm font-semibold text-[#151921]"
            >
              Save Draft
            </button>
            <button
              onClick={() => {
                setShowConfirm(false);
                onClose();
              }}
              className="w-full py-3 text-sm font-semibold text-red-500"
            >
              Discard
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="w-full py-3 text-sm font-semibold text-[#151921] bg-gray-50 rounded-b-3xl"
            >
              Cancel
            </button>
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
  user,
  posts,
  onBack,
  onLikePost,
  onAddComment
}) => {
  // Prefer profile displayName, then nickname, then name.
  const displayName =
    user?.profile?.displayName || user?.nickname || user?.name || '';

  const baseList = displayName
    ? posts.filter((p) => p.user === displayName)
    : posts;

  const myPosts = baseList.sort((a, b) => b.timestamp - a.timestamp);


  return (
    <div className="fixed inset-0 bg-[#F3F0FF] z-40 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
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

export const EMall = ({
  onBack,
  user,
  onRedeemCoupon,
  onCouponStatusChange
}) => {
  const [showMore, setShowMore] = useState(false);
  const [section, setSection] = useState('mall');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showTerms, setShowTerms] = useState(false);
  const [couponTab, setCouponTab] = useState('ready');
  const tierOrder = ['Free', 'Premium', 'Infinity'];
  const tierStyles = {
    Free: 'bg-gray-100 text-gray-600',
    Premium: 'bg-[#FFF1C2] text-[#916400]',
    Infinity: 'bg-[#E5D1FF] text-[#5F2DB2]'
  };

  // Derive current tier name from subscriptionIndex + VIP_PLANS,
  // fall back to string subscription or "Free" for compatibility.
  const subscriptionIndex = user?.subscriptionIndex ?? 0;
  const userTier =
    VIP_PLANS[subscriptionIndex]?.name || user?.subscription || 'Free';
  const userPoints = user?.points ?? 0;
  const ownedCoupons = Array.isArray(user?.coupons) ? user.coupons : [];
  const readyCoupons = ownedCoupons.filter((coupon) => coupon.status !== 'used');
  const usedCoupons = ownedCoupons.filter((coupon) => coupon.status === 'used');

  const sortTiers = (tiers) =>
    [...tiers].sort((a, b) => tierOrder.indexOf(a) - tierOrder.indexOf(b));

  const openDetail = (coupon) => {
    setSelectedCoupon(coupon);
    setShowTerms(false);
  };

  const closeDetails = () => {
    setSelectedCoupon(null);
    setShowTerms(false);
  };

  const handleRedeem = (coupon) => {
    if (!coupon) return;
    const eligible = coupon.tierAccess.includes(userTier);
    const requiredPoints = coupon.points[userTier];
    if (!eligible || typeof requiredPoints !== 'number') return;
    if (userPoints < requiredPoints) return;
    onRedeemCoupon?.(coupon, requiredPoints);
    closeDetails();
  };

  if (showMore) {
    return (
      <div className="fixed inset-0 bg-[#F3F0FF] z-40 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
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

  const renderBrandRow = () => (
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
  );

  const renderMallGrid = () => (
    <div className="space-y-6">
      {renderBrandRow()}
      <div className="grid grid-cols-2 gap-4">
        {MALL_ITEMS.map((item) => {
          const sortedAccess = sortTiers(item.tierAccess);
          const bestTier = sortedAccess[sortedAccess.length - 1];
          const minPoints = item.points[bestTier];
          return (
            <button
              key={item.id}
              onClick={() => openDetail(item)}
              className="bg-white p-3 rounded-2xl shadow-sm flex flex-col text-left border border-white/70 hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="w-full h-32 rounded-xl overflow-hidden mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-gray-500">
                    {item.brand}
                  </p>
                  <h4 className="text-base font-bold text-[#151921]">
                    {item.name}
                  </h4>
                </div>
                <div className="text-right">
                  <p className="text-[#5F48E6] font-bold text-sm">
                    {minPoints} pts
                  </p>
                  <p className="text-[10px] text-gray-500 font-semibold">
                    {bestTier}+
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 mb-3">
                {item.shortDescription}
              </p>
              <div className="flex flex-wrap gap-1">
                {sortedAccess.map((tier) => (
                  <span
                    key={tier}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      tierStyles[tier]
                    }`}
                  >
                    {tier}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    try {
      return new Date(timestamp).toLocaleDateString();
    } catch (err) {
      return '';
    }
  };

  const renderCouponOwned = (coupon, isReady) => (
    <div
      key={coupon.ownedId}
      className="bg-white p-3 rounded-2xl shadow-sm flex gap-3 border border-white/70"
    >
      <div className="w-20 h-20 rounded-2xl overflow-hidden">
        <img
          src={coupon.image}
          alt={coupon.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="text-[11px] uppercase tracking-widest text-gray-500">
          {coupon.brand}
        </p>
        <h4 className="text-base font-bold text-[#151921]">
          {coupon.name}
        </h4>
        <p className="text-xs text-gray-500 mt-1">
          {coupon.description}
        </p>
        <p className="text-[10px] text-gray-400 mt-1">
          {coupon.validUntil}
        </p>
      </div>
      <div className="flex flex-col items-end justify-between">
        <span className="text-xs font-bold text-[#5F48E6]">
          -{coupon.pointsSpent} pts
        </span>
        {isReady ? (
          <button
            onClick={() => onCouponStatusChange?.(coupon.ownedId, 'used')}
            className="text-[10px] px-2 py-1 rounded-full bg-[#151921] text-white"
          >
            Mark used
          </button>
        ) : (
          <span className="text-[10px] text-gray-500">
            Used {formatDate(coupon.usedAt)}
          </span>
        )}
      </div>
    </div>
  );

  const renderMyCoupons = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-white">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#F3F0FF] flex items-center justify-center text-3xl">
            {user?.avatar || '🙂'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#151921]">
              {user?.nickname || user?.name || 'Echo friend'}
            </h3>
            <p className="text-sm text-gray-500">{userPoints} points available</p>
          </div>
        </div>
      </div>
      <div className="flex bg-gray-100 rounded-full p-1">
        <button
          onClick={() => setCouponTab('ready')}
          className={`flex-1 px-3 py-2 rounded-full text-sm font-semibold transition ${
            couponTab === 'ready'
              ? 'bg-white shadow text-[#151921]'
              : 'text-gray-500'
          }`}
        >
          Ready to use ({readyCoupons.length})
        </button>
        <button
          onClick={() => setCouponTab('used')}
          className={`flex-1 px-3 py-2 rounded-full text-sm font-semibold transition ${
            couponTab === 'used'
              ? 'bg-white shadow text-[#151921]'
              : 'text-gray-500'
          }`}
        >
          Used / Expired ({usedCoupons.length})
        </button>
      </div>
      <div className="space-y-3">
        {couponTab === 'ready'
          ? readyCoupons.length === 0 && (
              <div className="text-center text-sm text-gray-400 py-10">
                No coupons yet.
              </div>
            )
          : usedCoupons.length === 0 && (
              <div className="text-center text-sm text-gray-400 py-10">
                No used coupons.
              </div>
            )}
        {(couponTab === 'ready' ? readyCoupons : usedCoupons).map((coupon) =>
          renderCouponOwned(coupon, couponTab === 'ready')
        )}
        {couponTab === 'used' && (
          <button
            onClick={() => setSection('mall')}
            className="w-full text-sm text-[#5F48E6] font-semibold py-3"
          >
            Get more coupons
          </button>
        )}
      </div>
    </div>
  );

  if (selectedCoupon) {
    const sortedAccess = sortTiers(selectedCoupon.tierAccess);
    const eligible = selectedCoupon.tierAccess.includes(userTier);
    const requiredPoints = eligible ? selectedCoupon.points[userTier] : null;
    const hasEnoughPoints =
      eligible && typeof requiredPoints === 'number' && userPoints >= requiredPoints;
    const redeemDisabled =
      !eligible || typeof requiredPoints !== 'number' || !hasEnoughPoints;
    const redeemLabel = !eligible
      ? `${userTier} not eligible`
      : typeof requiredPoints !== 'number'
      ? 'Unavailable'
      : hasEnoughPoints
      ? `Redeem for ${requiredPoints} pts`
      : `Need ${requiredPoints} pts`;

    return (
      <div className="absolute inset-0 bg-[#F3F0FF] z-40 flex flex-col rounded-[2.8rem] overflow-hidden animate-in slide-in-from-right duration-200">
        <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm pt-6">
          <button onClick={closeDetails}>
            <ArrowLeft className="w-6 h-6 text-[#151921]" />
          </button>
          <h2 className="font-bold text-lg text-[#151921]">Coupon Details</h2>
        </div>
        <div className="relative h-52 w-full flex-shrink-0">
          <img
            src={selectedCoupon.image}
            alt={selectedCoupon.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 overflow-y-auto bg-white p-6 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              {selectedCoupon.brand}
            </p>
            <h3 className="text-2xl font-bold text-[#151921]">
              {selectedCoupon.name}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {selectedCoupon.description}
            </p>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5F48E6]" />
              <span>{selectedCoupon.validUntil}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0BAB7C]" />
              <span>{selectedCoupon.location}</span>
            </div>
            <div className="text-xs text-gray-500">
              Available points: {userPoints}
            </div>
          </div>
          <div className="border border-gray-100 rounded-2xl divide-y">
            {sortedAccess.map((tier) => (
              <div
                key={tier}
                className="flex items-center justify-between p-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      tierStyles[tier]
                    }`}
                  >
                    {tier}
                  </span>
                  <span className="text-sm text-[#151921]">
                    Eligible tier
                  </span>
                </div>
                <span className="text-sm font-bold text-[#5F48E6]">
                  {selectedCoupon.points[tier]} pts
                </span>
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={() => setShowTerms((prev) => !prev)}
              className="w-full flex items-center justify-between bg-gray-50 px-4 py-3 rounded-2xl text-sm font-semibold text-[#151921]"
            >
              Terms & Conditions
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showTerms ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showTerms && (
              <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc list-inside">
                {selectedCoupon.terms.map((term, idx) => (
                  <li key={idx}>{term}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="bg-white px-6 py-4 border-t border-gray-100">
          <button
            onClick={() => handleRedeem(selectedCoupon)}
            disabled={redeemDisabled}
            className={`w-full py-3 rounded-2xl font-semibold shadow-lg transition ${
              redeemDisabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#151921] text-white active:scale-[0.98]'
            }`}
          >
            {redeemLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#F3F0FF] z-40 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm pt-6">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-[#151921]" />
        </button>
        <h2 className="font-bold text-lg text-[#151921]">
          {section === 'mall' ? 'E Mall' : 'My Coupons'}
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#FBFAF3] px-4 pt-4 pb-24">
        {section === 'mall' ? renderMallGrid() : renderMyCoupons()}
      </div>
      <div className="bg-white border-t border-gray-100 flex">
        <button
          onClick={() => setSection('mall')}
          className={`flex-1 py-3 text-sm font-semibold ${
            section === 'mall'
              ? 'text-[#5F48E6] border-b-2 border-[#5F48E6]'
              : 'text-gray-400'
          }`}
        >
          E Mall
        </button>
        <button
          onClick={() => setSection('my')}
          className={`flex-1 py-3 text-sm font-semibold ${
            section === 'my'
              ? 'text-[#5F48E6] border-b-2 border-[#5F48E6]'
              : 'text-gray-400'
          }`}
        >
          My Coupons
        </button>
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
    <div className="fixed inset-0 bg-white z-40 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
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

export const SettingsPage = ({ onBack, onOpenBlockList }) => {
  const [darkMode, setDarkMode] = useState(false);

  const placeholder = (label) => {
    alert(`${label} coming soon`);
  };

  const optionRows = [
    {
      key: 'account',
      icon: User,
      label: 'Account',
      desc: 'Profile, login and privacy settings',
      onPress: () => placeholder('Account settings')
    },
    {
      key: 'chat',
      icon: MessageSquare,
      label: 'Chatting Settings',
      desc: 'Sounds, reactions and message tools',
      onPress: () => placeholder('Chatting settings')
    },
    {
      key: 'about',
      icon: Info,
      label: 'About',
      desc: 'Version, policies and acknowledgements',
      onPress: () => placeholder('About Echo')
    },
    {
      key: 'help',
      icon: LifeBuoy,
      label: 'Help',
      desc: 'FAQs and contact support',
      onPress: () => placeholder('Help center')
    },
    {
      key: 'storage',
      icon: Database,
      label: 'Manage Storage',
      desc: 'Clear cache and downloads',
      onPress: () => placeholder('Manage storage')
    }
  ];

  return (
    <div className="fixed inset-0 bg-[#F3F0FF] z-40 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm pt-6">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-[#151921]" />
        </button>
        <h2 className="font-bold text-lg text-[#151921]">Settings</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="bg-white rounded-3xl p-5 shadow-sm space-y-4 border border-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Account
              </h3>
              <p className="text-[11px] text-gray-400">
                Security & Privacy tools live here now
              </p>
            </div>
            <button
              onClick={onOpenBlockList}
              className="text-[11px] text-[#5F48E6] font-semibold"
            >
              Block list
            </button>
          </div>
          <button
            onClick={optionRows[0].onPress}
            className="w-full flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[#5F48E6]" />
              <div className="text-left">
                <p className="text-sm font-semibold text-[#151921]">
                  Account overview
                </p>
                <p className="text-xs text-gray-400">
                  Phone, emails, linked social accounts
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm space-y-4 border border-white">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            App controls
          </h3>
          <button
            onClick={optionRows[1].onPress}
            className="w-full flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <div className="text-left">
                <p className="text-sm font-semibold text-[#151921]">
                  Chatting Settings
                </p>
                <p className="text-xs text-gray-400">
                  Read receipts, prompts and filters
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm font-semibold text-[#151921]">
                  Dark Mode
                </p>
                <p className="text-xs text-gray-400">
                  {darkMode ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                darkMode ? 'bg-[#5F48E6]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                  darkMode ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm space-y-3 border border-white">
          {optionRows.slice(2).map((option) => (
            <button
              key={option.key}
              onClick={option.onPress}
              className="w-full flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <option.icon className="w-5 h-5 text-gray-500" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#151921]">
                    {option.label}
                  </p>
                  <p className="text-xs text-gray-400">
                    {option.desc}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BlockList = ({
  blockedUsers = [],
  onBack,
  onUnblockUser
}) => (
  <div className="fixed inset-0 bg-[#F3F0FF] z-40 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
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

const buildProfileDraft = (user) => ({
  displayName:
    user?.profile?.displayName || user?.nickname || user?.name || 'New Echo',
  age: user?.profile?.age || '',
  gender: user?.profile?.gender || '',
  education: user?.profile?.education || '',
  hobbies: Array.isArray(user?.profile?.hobbies)
    ? user.profile.hobbies
    : [],
  agePreference: user?.profile?.agePreference || '',
  location: user?.profile?.location || ''
});

export const EditProfilePanel = ({ user, onUserChange, onBack }) => {
  const [profileDraft, setProfileDraft] = useState(() => buildProfileDraft(user));
  const [mbtiDraft, setMbtiDraft] = useState(user?.mbti || '');
  const [editingField, setEditingField] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const mergeAndNotify = (nextProfile, nextMbti = mbtiDraft) => {
    onUserChange?.({
      ...user,
      mbti: nextMbti,
      profile: {
        ...user?.profile,
        ...nextProfile
      }
    });
  };

  const startEditing = (field) => {
    const currentValue = (() => {
      if (field === 'mbti') return mbtiDraft;
      if (field === 'hobbies') return profileDraft.hobbies.join(', ');
      return profileDraft[field] || '';
    })();
    setEditingField(field);
    setInputValue(currentValue);
  };

  const commitEdit = () => {
    if (!editingField) return;
    const trimmed = inputValue.trim();
    if (editingField === 'mbti') {
      const sanitized = trimmed.toUpperCase().slice(0, 4);
      setMbtiDraft(sanitized);
      mergeAndNotify(profileDraft, sanitized);
    } else {
      const updatedProfile = { ...profileDraft };
      if (editingField === 'hobbies') {
        updatedProfile.hobbies = trimmed
          ? trimmed.split(',').map((hobby) => hobby.trim()).filter(Boolean)
          : [];
      } else {
        updatedProfile[editingField] = trimmed;
      }
      setProfileDraft(updatedProfile);
      mergeAndNotify(updatedProfile, mbtiDraft);
    }
    setEditingField(null);
    setInputValue('');
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      commitEdit();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setEditingField(null);
      setInputValue('');
    }
  };

  const previewProfile = () => {
    if (editingField) {
      commitEdit();
    }
    mergeAndNotify(profileDraft, mbtiDraft);
    console.log('Preview placeholder – real preview flow will be added later');
    onBack?.();
  };

  const fields = [
    {
      key: 'mbti',
      label: 'MBTI type',
      value: mbtiDraft || 'Tap to update',
      section: 'Core personality info'
    },
    {
      key: 'age',
      label: 'Age',
      value: profileDraft.age || 'Add age',
      section: 'Core personality info'
    },
    {
      key: 'gender',
      label: 'Gender type',
      value: profileDraft.gender || 'Add gender',
      section: 'Core personality info'
    },
    {
      key: 'education',
      label: 'Education',
      value: profileDraft.education || 'Add education',
      section: 'Core personality info'
    },
    {
      key: 'hobbies',
      label: 'Hobbies',
      value:
        profileDraft.hobbies.length > 0
          ? profileDraft.hobbies.join(', ')
          : 'Add hobbies',
      section: 'Lifestyle & interests'
    },
    {
      key: 'agePreference',
      label: 'Age preference',
      value: profileDraft.agePreference || 'Add age preference',
      section: 'Preferences'
    },
    {
      key: 'location',
      label: 'Location',
      value: profileDraft.location || 'Add location',
      section: 'Preferences'
    }
  ];

  const groupedSections = fields.reduce((acc, field) => {
    if (!acc[field.section]) acc[field.section] = [];
    acc[field.section].push(field);
    return acc;
  }, {});

  const currentDisplayName =
    profileDraft.displayName || user?.nickname || user?.name || 'New Echo';

  return (
    <div className="fixed inset-0 bg-[#F3F0FF] z-40 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm pt-6">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-[#151921]" />
        </button>
        <h2 className="font-bold text-lg text-[#151921]">
          Edit Profile
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-white flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#F3F0FF] flex items-center justify-center text-3xl border border-white">
            {user?.avatar || '🙂'}
          </div>
          <div>
            <p className="text-xs uppercase text-gray-400 tracking-widest">
              @{user?.username || user?.nickname || 'echo-user'}
            </p>
            <h3 className="text-2xl font-bold text-[#151921]">
              {currentDisplayName}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {mbtiDraft || 'MBTI pending'} · {user?.constellation || '—'}
            </p>
          </div>
        </div>

        {Object.entries(groupedSections).map(([section, sectionFields]) => (
          <div key={section}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              {section}
            </h3>
            <div className="space-y-3">
              {sectionFields.map((field) => (
                <div
                  key={field.key}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-white/70"
                >
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-3 text-left"
                    onClick={() => startEditing(field.key)}
                  >
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-gray-400">
                        {field.label}
                      </p>
                      <p className="text-sm font-semibold text-[#151921]">
                        {field.value}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </button>
                  {editingField === field.key && (
                    <div className="mt-3 space-y-2">
                      {field.key === 'hobbies' ? (
                        <textarea
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onBlur={commitEdit}
                          onKeyDown={handleInputKeyDown}
                          rows={2}
                          placeholder="Comma separated"
                          className="w-full border border-gray-200 rounded-2xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#5F48E6]"
                        />
                      ) : (
                        <input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onBlur={commitEdit}
                          onKeyDown={handleInputKeyDown}
                          maxLength={field.key === 'mbti' ? 4 : 60}
                          className="w-full border border-gray-200 rounded-2xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#5F48E6]"
                          placeholder={`Update ${field.label.toLowerCase()}`}
                        />
                      )}
                      <p className="text-[10px] text-gray-400">
                        Press Enter or click outside to save.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white border-t border-gray-100 px-5 py-4">
        <button
          onClick={previewProfile}
          className="w-full py-3 rounded-full bg-[#5F48E6] text-white font-semibold shadow-lg active:scale-[0.98] transition"
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export const CoinCenter = ({ user, onBack }) => {
  const profile = user?.profile || {};
  const displayName =
    profile.displayName || user?.nickname || user?.name || 'New Echo';
  const avatar = user?.avatar || '🙂';
  const subscriptionIndex = user?.subscriptionIndex ?? 0;
  const tierName = VIP_PLANS[subscriptionIndex]?.name || 'Free';
  const isPremium = tierName !== 'Free';
  const coins = typeof user?.points === 'number' ? user.points : 0;

  const actions = [
    { key: 'exchange', label: 'Exchange coupons' },
    { key: 'transfer', label: 'Transfer coins' },
    { key: 'history', label: 'History' },
    { key: 'donation', label: 'Donation' }
  ];

  const handleAction = (label) => {
    alert(`${label} coming soon`);
  };

  return (
    <div className="fixed inset-0 bg-[#FFFDF6] z-40 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm pt-6">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-[#151921]" />
        </button>
        <h2 className="font-bold text-lg text-[#151921]">Coins</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-24 space-y-6">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-white flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#F3F0FF] flex items-center justify-center text-3xl border border-white mb-1">
            {avatar}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#151921]">
              {displayName}
            </p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold ${isPremium ? 'bg-[#FFF1C2] text-[#916400]' : 'bg-gray-100 text-gray-600'}`}>
              {isPremium ? 'Premium user' : 'Free user'}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
              Total Coins
            </p>
            <p className="text-5xl font-black text-[#151921] mt-1">
              {coins}
            </p>
            <p className="text-xs text-gray-500 mt-1">Coins</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-white">
          <div className="grid grid-cols-4 gap-3">
            {actions.map((action) => (
              <button
                key={action.key}
                onClick={() => handleAction(action.label)}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-[#F3F0FF] flex items-center justify-center text-[#5F48E6]">
                  <Coins className="w-5 h-5" />
                </div>
                <span className="text-[11px] text-[#151921] text-center leading-tight">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#FFF4E5] rounded-3xl p-4 border border-[#FFE0B8] text-xs text-[#8A5A1F]">
          <p className="font-semibold mb-1">How Coins work</p>
          <p>
            Earn Clicksol Coins by engaging with the community and redeem them for coupons, gifts and special surprises.
          </p>
        </div>
      </div>
    </div>
  );
};

const VALID_MBTI_TYPES = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP'
];

export const MBTIModal = ({ questionSet, onClose, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [manualMode, setManualMode] = useState(false);
  const [manualValue, setManualValue] = useState('');
  const [manualError, setManualError] = useState('');

  if (!questionSet) return null;

  const handleFinish = () => {
    const result = questionSet.questions
      .map((q, index) => answers[index])
      .join('');
    if (result.length === questionSet.questions.length) {
      onComplete(result);
    }
  };

  const canSubmit = questionSet.questions.every((_, index) =>
    Boolean(answers[index])
  );

  const openManual = () => {
    setManualMode(true);
    setManualValue('');
    setManualError('');
  };

  const handleManualSubmit = () => {
    const trimmed = manualValue.trim().toUpperCase();
    if (!VALID_MBTI_TYPES.includes(trimmed)) {
      setManualError('Please enter a valid MBTI type (e.g. INFJ).');
      return;
    }
    onComplete(trimmed);
  };

  if (manualMode) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-[#151921]">
                Enter MBTI manually
              </h3>
              <p className="text-xs text-gray-500">
                Type one of the 16 MBTI types to skip the quick check.
              </p>
            </div>
            <button
              onClick={() => setManualMode(false)}
              className="text-gray-400"
            >
              ✕
            </button>
          </div>
          <div className="p-6 space-y-4">
            <input
              value={manualValue}
              onChange={(e) => {
                setManualValue(e.target.value.toUpperCase());
                setManualError('');
              }}
              maxLength={4}
              placeholder="e.g. INFJ"
              className="w-full border border-gray-200 rounded-2xl p-3 text-center text-lg tracking-widest uppercase outline-none focus:ring-2 focus:ring-[#5F48E6]"
            />
            {manualError && (
              <p className="text-xs text-red-500">{manualError}</p>
            )}
            <p className="text-xs text-gray-500">
              Accepted types: {VALID_MBTI_TYPES.join(', ')}
            </p>
          </div>
          <div className="p-6 pt-0 flex gap-3">
            <button
              onClick={() => setManualMode(false)}
              className="flex-1 py-3 rounded-2xl border border-gray-200 text-[#151921] font-bold"
            >
              Back
            </button>
            <button
              onClick={handleManualSubmit}
              disabled={manualValue.trim().length !== 4}
              className="flex-1 py-3 rounded-2xl bg-[#5F48E6] text-white font-bold disabled:bg-gray-300"
            >
              Save MBTI
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            {questionSet.title}. Answer honestly to discover your type.
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
        </div>
        <div className="p-6 pt-0 space-y-3">
          <div className="flex gap-3">
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
          <p className="text-xs text-center text-gray-500">
            Already have MBTI?{' '}
            <button
              onClick={openManual}
              className="text-[#5F48E6] underline"
            >
              Type it here.
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
