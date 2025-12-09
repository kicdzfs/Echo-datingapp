"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  DAILY_QUESTIONS,
  INITIAL_POSTS,
  COUNTRY_CODES,
  MBTI_QUESTION_SETS,
  VIP_PLANS
} from '../data/mockData';
import PlazaTab from '../components/tabs/PlazaTab';
import GamesTab from '../components/tabs/GamesTab';
import ChatTab from '../components/tabs/ChatTab';
import MeTab from '../components/tabs/MeTab';
import BottomTabBar from '../components/BottomTabBar';
import {
  PostItem,
  NewPostOverlay,
  TodaysQuestionModal,
  MBTIModal
} from '../components/SubComponents';
import {
  AuthLanding,
  LoginScreen,
  PhoneEntryScreen,
  PhoneVerificationScreen,
  ProfileWizard
} from '../components/auth/AuthFlow';

const getConstellation = (dob) => {
  if (!dob) return '';
  const date = new Date(dob);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const zodiacs = [
    ['Capricorn', 1, 19],
    ['Aquarius', 2, 18],
    ['Pisces', 3, 20],
    ['Aries', 4, 19],
    ['Taurus', 5, 20],
    ['Gemini', 6, 20],
    ['Cancer', 7, 22],
    ['Leo', 8, 22],
    ['Virgo', 9, 22],
    ['Libra', 10, 22],
    ['Scorpio', 11, 21],
    ['Sagittarius', 12, 21],
    ['Capricorn', 12, 31]
  ];
  for (let i = 0; i < zodiacs.length; i++) {
    const [sign, m, d] = zodiacs[i];
    if (month === m && day <= d) return sign;
  }
  return 'Capricorn';
};

const getAge = (dob) => {
  if (!dob) return null;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const createInitialProfile = () => ({
  country: COUNTRY_CODES[0].key,
  phone: '',
  signupMethod: 'phone',
  dob: '',
  username: '',
  nickname: '',
  gender: '',
  genderDetail: '',
  preference: '',
  preferenceDetail: '',
  interests: [],
  location: ''
});

export default function App() {
  const [activeTab, setActiveTab] = useState('plaza');
  const [showNewPostOverlay, setShowNewPostOverlay] = useState(false);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [drafts, setDrafts] = useState([]);
  const [editingDraftId, setEditingDraftId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(true);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isChatOverlayActive, setIsChatOverlayActive] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authStage, setAuthStage] = useState('landing');
  const [pendingUser, setPendingUser] = useState(createInitialProfile);
  const [otpCode, setOtpCode] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [showMbtiModal, setShowMbtiModal] = useState(false);
  const [mbtiSet, setMbtiSet] = useState(null);
  const [isTabBarHidden, setIsTabBarHidden] = useState(false);

  // Lock scroll on auth screens (before entering main app)
  useEffect(() => {
    // Lock scroll only on initial Auth landing screen
    if (!currentUser && authStage === 'landing') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentUser, authStage]);

  const updatePendingUser = (payload) =>
    setPendingUser((prev) => ({ ...prev, ...payload }));

  const randomQuestionSet = () =>
    MBTI_QUESTION_SETS[
      Math.floor(Math.random() * MBTI_QUESTION_SETS.length)
    ];

  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const todaysQuestion = (() => {
    const dayOfYear = Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 0)) /
        (1000 * 60 * 60 * 24)
    );
    return DAILY_QUESTIONS[dayOfYear % DAILY_QUESTIONS.length];
  })();

  const handleNewPost = (content) => {
    const authorName =
      currentUser?.nickname || currentUser?.name || 'Echo';
    const avatar = currentUser?.avatar || '🙂';
    const newPost = {
      id: Date.now(),
      user: authorName,
      avatar,
      timestamp: Date.now(),
      content,
      likes: 0,
      comments: [],
      shares: 0,
      isLiked: false
    };
    setPosts([newPost, ...posts]);
  };

  const handleSaveDraft = (content) => {
    const trimmed = content.trim();
    if (!trimmed) return;
    setDrafts((prev) => {
      if (editingDraftId) {
        return prev.map((d) =>
          d.id === editingDraftId
            ? { ...d, content: trimmed, createdAt: Date.now() }
            : d
        );
      }
      return [
        {
          id: Date.now(),
          content: trimmed,
          createdAt: Date.now()
        },
        ...prev
      ];
    });
  };

  const handleLikePost = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            isLiked: !post.isLiked,
            likes: !post.isLiked ? post.likes + 1 : post.likes - 1
          }
        : post
    );
    setPosts(updatedPosts);
    if (selectedPost?.id === postId) {
      const refreshed = updatedPosts.find((post) => post.id === postId);
      refreshed && setSelectedPost(refreshed);
    }
  };

  const handleDeleteDraft = (id) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  const handleOpenDraftForEdit = (id) => {
    setEditingDraftId(id);
    setShowNewPostOverlay(true);
  };

  const handleAddComment = (postId, text) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: [
              {
                id: Date.now(),
                user: currentUser?.nickname || currentUser?.name || 'Echo',
                text
              },
              ...post.comments
            ]
          }
        : post
    );
    setPosts(updatedPosts);
    if (selectedPost?.id === postId) {
      const refreshed = updatedPosts.find((post) => post.id === postId);
      refreshed && setSelectedPost(refreshed);
    }
  };

  const handleBlockUser = (user) => {
    setBlockedUsers((prev) => {
      if (prev.some((u) => u.id === user.id)) {
        return prev;
      }
      return [...prev, user];
    });
  };

  const handleUnblockUser = (userId) => {
    setBlockedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const resetToLanding = () => {
    setAuthStage('landing');
    setPendingUser(createInitialProfile());
    setOtpCode('');
    setOtpInput('');
    setOtpError('');
  };

  const handleSocialSignup = (provider) => {
    updatePendingUser({ signupMethod: provider });
    setAuthStage('wizard');
  };

  const handlePhoneSubmit = () => {
    if (!pendingUser.phone.trim()) return;
    const code = `${Math.floor(Math.random() * 900000) + 100000}`;
    setOtpCode(code);
    setOtpInput('');
    setOtpError('');
    setAuthStage('otp');
  };

  const handleOtpSubmit = () => {
    if (otpInput === otpCode) {
      setAuthStage('wizard');
      setOtpError('');
    } else {
      setOtpError('Incorrect code. Please try again.');
    }
  };

  const finalizeUser = (baseUser) => {
    setCurrentUser(baseUser);
    setAuthStage('app');
    setPendingUser(createInitialProfile());
    setOtpCode('');
    setOtpInput('');
    setOtpError('');
    setActiveTab('plaza');
    setShowQuestionModal(true);
    setShowMbtiModal(true);
    setMbtiSet(randomQuestionSet());
  };

  const handleProfileComplete = () => {
    const newUser = {
      id: Date.now(),
      avatar: '🧡',
      username: pendingUser.username || `echo_${Date.now()}`,
      name: pendingUser.nickname || pendingUser.username || 'Echo User',
      nickname:
        pendingUser.nickname || pendingUser.username || 'Echo User',
      age: getAge(pendingUser.dob),
      gender: pendingUser.gender,
      preference: pendingUser.preference,
      mbti: null,
      constellation: getConstellation(pendingUser.dob),
      interests: pendingUser.interests,
      location: pendingUser.location,
      bio: 'New to Echo! Say hi 👋',
      signupMethod: pendingUser.signupMethod,
      subscriptionIndex: 0,
      subscription: 'Free',
      points: 800,
      coupons: [],
      profile: {
        displayName:
          pendingUser.nickname || pendingUser.username || 'Echo Friend',
        age: getAge(pendingUser.dob) || '—',
        gender: pendingUser.gender || 'Not shared',
        education: '',
        hobbies: pendingUser.interests?.length
          ? pendingUser.interests
          : ['Travel'],
        agePreference: 'Any',
        location: pendingUser.location || 'Unknown'
      }
    };
    finalizeUser(newUser);
  };

  const planIndexFromName = (name = 'Free') => {
    if (!name) return 0;
    const normalized = name.toLowerCase();
    if (normalized.includes('premium')) return 1;
    if (normalized.includes('infinity')) return 2;
    return 0;
  };

  const handleLoginSelect = (user) => {
    const enriched = {
      ...user,
      nickname: user.nickname || user.name,
      subscriptionIndex: planIndexFromName(user.subscription),
      subscription: user.subscription || 'Free',
      points: typeof user.points === 'number' ? user.points : 800,
      coupons: Array.isArray(user.coupons) ? user.coupons : []
    };
    setCurrentUser(enriched);
    setAuthStage('app');
    setActiveTab('plaza');
    if (!enriched.mbti) {
      setMbtiSet(randomQuestionSet());
      setShowMbtiModal(true);
    } else {
      setShowMbtiModal(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    resetToLanding();
  };

  const handleSubscriptionChange = (planIndex) => {
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            subscriptionIndex: planIndex,
            subscription: VIP_PLANS[planIndex]?.name || 'Free'
          }
        : prev
    );
  };

  const handleRedeemCoupon = (coupon, cost) => {
    if (!coupon || typeof cost !== 'number') return;
    setCurrentUser((prev) => {
      if (!prev || (prev.points ?? 0) < cost) return prev;
      const newCoupon = {
        ownedId: Date.now(),
        couponId: coupon.id,
        name: coupon.name,
        brand: coupon.brand,
        image: coupon.image,
        description: coupon.shortDescription,
        status: 'ready',
        redeemedAt: Date.now(),
        validUntil: coupon.validUntil,
        location: coupon.location,
        pointsSpent: cost
      };
      return {
        ...prev,
        points: (prev.points ?? 0) - cost,
        coupons: [newCoupon, ...(prev.coupons || [])]
      };
    });
  };

  const handleCouponStatusChange = (ownedId, nextStatus) => {
    setCurrentUser((prev) => {
      if (!prev || !prev.coupons) return prev;
      return {
        ...prev,
        coupons: prev.coupons.map((coupon) =>
          coupon.ownedId === ownedId
            ? {
                ...coupon,
                status: nextStatus,
                usedAt:
                  nextStatus === 'used' ? Date.now() : coupon.usedAt
              }
            : coupon
        )
      };
    });
  };

  const handleUserProfileChange = (nextUser) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      if (typeof nextUser === 'function') {
        return nextUser(prev);
      }
      return nextUser;
    });
  };

  const handleMbtiComplete = (value) => {
    setCurrentUser((prev) =>
      prev ? { ...prev, mbti: value.toUpperCase() } : prev
    );
    setShowMbtiModal(false);
  };

  const renderAuthStage = () => {
    switch (authStage) {
      case 'landing':
        return (
          <AuthLanding
            onSignupPhone={() => {
              updatePendingUser({ signupMethod: 'phone' });
              setAuthStage('phone');
            }}
            onSocialLogin={handleSocialSignup}
            onLoginExisting={() => setAuthStage('login')}
          />
        );
      case 'login':
        return (
          <LoginScreen
            onBack={() => setAuthStage('landing')}
            onSelectUser={handleLoginSelect}
          />
        );
      case 'phone':
        return (
          <PhoneEntryScreen
            country={pendingUser.country}
            phone={pendingUser.phone}
            onChange={updatePendingUser}
            onSubmit={handlePhoneSubmit}
            onBack={() => setAuthStage('landing')}
          />
        );
      case 'otp':
        return (
        <PhoneVerificationScreen
          phone={`${(COUNTRY_CODES.find((entry) => entry.key === pendingUser.country)?.dial || '').trim()} ${pendingUser.phone}`.trim()}
            code={otpInput}
            onChange={setOtpInput}
            onSubmit={handleOtpSubmit}
            onBack={() => setAuthStage('phone')}
            error={otpError}
          />
        );
      case 'wizard':
        return (
          <ProfileWizard
            data={pendingUser}
            onUpdate={updatePendingUser}
            onComplete={handleProfileComplete}
            onExit={() => setAuthStage('landing')}
          />
        );
      default:
        return null;
    }
  };

  const mainContentClasses = useMemo(
    () =>
      [
        'flex-1',
        'bg-white',
        'relative',
        isChatOverlayActive || isTabBarHidden
          ? 'overflow-hidden pt-0 pb-0'
          : 'overflow-y-auto scrollbar-auto-hide scroll-smooth pb-40 pt-0'
      ].join(' '),
    [isChatOverlayActive, isTabBarHidden]
  );

  const plazaRef = React.useRef(null);

  // When auth flow is not in main app, render auth screens
  if (!currentUser || authStage !== 'app') {
    return (
      <div className="min-h-screen w-full bg-white font-sans flex flex-col">
        <div className="flex-1">{renderAuthStage()}</div>
      </div>
    );
  }

  // When composing a new post, show Create Post as a dedicated full-screen page
  if (showNewPostOverlay) {
    return (
      <div className="min-h-[100dvh] w-full bg-white font-sans flex flex-col">
        <NewPostOverlay
          onClose={() => {
            setShowNewPostOverlay(false);
            setEditingDraftId(null);
          }}
          onPost={handleNewPost}
          onSaveDraft={handleSaveDraft}
          onDiscardDraft={(id) => {
            if (id) handleDeleteDraft(id);
          }}
          draftId={editingDraftId}
          initialContent={
            editingDraftId
              ? drafts.find((d) => d.id === editingDraftId)?.content || ''
              : ''
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white font-sans flex flex-col">
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Main Content Area */}
        <div className={mainContentClasses}>
          {activeTab === 'plaza' && (
            <PlazaTab
              ref={plazaRef}
              posts={posts}
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
              onOpenDetail={setSelectedPost}
            />
          )}
          {activeTab === 'pets' && <GamesTab />}
          {activeTab === 'chat' && (
            <ChatTab
              blockedUsers={blockedUsers}
              onBlockUser={handleBlockUser}
              onOverlayChange={setIsChatOverlayActive}
            />
          )}
          {activeTab === 'me' && (
            <MeTab
              user={currentUser}
              drafts={drafts}
              posts={posts}
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
              blockedUsers={blockedUsers}
              onUnblockUser={handleUnblockUser}
              onLogout={handleLogout}
              onChangeSubscription={handleSubscriptionChange}
              onRedeemCoupon={handleRedeemCoupon}
              onCouponStatusChange={handleCouponStatusChange}
              onUserChange={handleUserProfileChange}
              onSectionChange={(section) =>
                setIsTabBarHidden(section !== 'main')
              }
              onOpenDraft={handleOpenDraftForEdit}
              onDeleteDraft={handleDeleteDraft}
            />
          )}
        </div>

        {/* Post Detail Overlay */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="min-h-screen flex flex-col">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 pt-6 bg-white">
                <button onClick={() => setSelectedPost(null)}>
                  <ArrowLeft className="w-6 h-6 text-[#151921]" />
                </button>
                <span className="font-bold text-[#151921]">
                  Post Details
                </span>
              </div>
              <div className="p-4 pb-28 bg-white">
                <PostItem
                  post={selectedPost}
                  onLike={handleLikePost}
                  onAddComment={handleAddComment}
                  onOpenDetail={() => {}}
                  isDetailView
                />
              </div>
            </div>
          </div>
        )}

        {/* Fixed Bottom Navigation with integrated Post action */}
        {!isChatOverlayActive && !isTabBarHidden && (
          <BottomTabBar
            activeTab={activeTab}
            onChangeTab={(next) => {
              if (next === 'plaza' && activeTab === 'plaza') {
                if (
                  plazaRef.current &&
                  typeof plazaRef.current.scrollToTopAndRefresh === 'function'
                ) {
                  plazaRef.current.scrollToTopAndRefresh();
                }
              } else {
                setActiveTab(next);
              }
            }}
            onOpenPost={() => {
              setEditingDraftId(null);
              setShowNewPostOverlay(true);
            }}
          />
        )}
        {/* Modals */}
        {showQuestionModal && (
          <TodaysQuestionModal
            question={todaysQuestion}
            onClose={() => setShowQuestionModal(false)}
          />
        )}

        {/* Home Indicator removed for web */}
      </div>

      {showMbtiModal && !currentUser?.mbti && mbtiSet && (
        <MBTIModal
          questionSet={mbtiSet}
          onClose={() => setShowMbtiModal(false)}
          onComplete={handleMbtiComplete}
        />
      )}
    </div>
  );
}
