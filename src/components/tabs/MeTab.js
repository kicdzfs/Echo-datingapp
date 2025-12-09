"use client";

import React, { useState, useEffect } from 'react';
import {
  Activity,
  User as UserIcon,
  ShoppingBag,
  Crown,
  LogOut,
  Edit3,
  ChevronRight,
  FileText,
  Coins,
  Settings
} from 'lucide-react';
import { VIP_PLANS } from '../../data/mockData';
import {
  PersonalPlaza,
  EMall,
  VIPCenter,
  SettingsPage,
  BlockList,
  EditProfilePanel,
  CoinCenter
} from '../SubComponents';

const DraftsPanel = ({ drafts = [], onBack, onOpenDraft, onDeleteDraft }) => (
  <div className="pb-20 h-full flex flex-col bg-white">
    <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4">
      <div className="h-12 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-1"
        >
          <ChevronRight className="w-5 h-5 rotate-180 text-[#151921]" />
        </button>
        <h2 className="font-bold text-lg text-[#151921]">Drafts</h2>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4 space-y-3">
      {drafts.length === 0 && (
        <p className="text-xs text-gray-400 mt-4">
          No drafts yet. Posts you save from Create Post will appear here.
        </p>
      )}
      {drafts.map((draft) => (
        <div
          key={draft.id}
          className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex items-start gap-3"
        >
          <button
            onClick={() => onOpenDraft?.(draft.id)}
            className="flex-1 text-left"
          >
            <p className="text-sm text-[#151921] line-clamp-3">
              {draft.content}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              {new Date(draft.createdAt).toLocaleString()}
            </p>
          </button>
          <button
            onClick={() => onDeleteDraft?.(draft.id)}
            className="text-xs text-red-500 px-2 py-1 rounded-full border border-red-100"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);

const MeTab = ({
  user,
  posts,
  onLikePost,
  onAddComment,
  blockedUsers = [],
  onUnblockUser,
  onLogout,
  onChangeSubscription,
  onRedeemCoupon,
  onCouponStatusChange,
  onUserChange,
  onSectionChange,
  drafts = [],
  onOpenDraft,
  onDeleteDraft
}) => {
  const [activeSection, setActiveSection] = useState('main');
  const [isMatched, setIsMatched] = useState(false);
  const currentPlan = user?.subscriptionIndex ?? 0;
  const planName = VIP_PLANS[currentPlan]?.name || 'Free';
  const profileInfo = user?.profile || {};
  const displayName =
    profileInfo.displayName || user?.nickname || user?.name || 'New Echo';
  const profileLocation =
    profileInfo.location || user?.location || 'Location hidden';
  const profileHobbies =
    (Array.isArray(profileInfo.hobbies) && profileInfo.hobbies.length > 0
      ? profileInfo.hobbies
      : user?.interests) || [];

  const updateSection = (nextSection) => {
    setActiveSection(nextSection);
    onSectionChange?.(nextSection);
  };

  useEffect(() => {
    onSectionChange?.('main');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (activeSection === 'plaza') {
    return (
      <PersonalPlaza
        user={user}
        posts={posts}
        onBack={() => updateSection('main')}
        onLikePost={onLikePost}
        onAddComment={onAddComment}
      />
    );
  }

  if (activeSection === 'emall') {
    return (
      <EMall
        onBack={() => updateSection('main')}
        user={user}
        onRedeemCoupon={onRedeemCoupon}
        onCouponStatusChange={onCouponStatusChange}
      />
    );
  }
  if (activeSection === 'vip') {
    return (
      <VIPCenter
        onBack={() => updateSection('main')}
        currentPlan={currentPlan}
        hasMbti={Boolean(user?.mbti)}
        onSelectPlan={(planIndex) => {
          onChangeSubscription?.(planIndex);
          updateSection('main');
        }}
      />
    );
  }
  if (activeSection === 'editProfile') {
    return (
      <EditProfilePanel
        key={user?.id || user?.nickname || 'current-user'}
        user={user}
        onUserChange={onUserChange}
        onBack={() => updateSection('main')}
      />
    );
  }
  if (activeSection === 'settings') {
    return (
      <SettingsPage
        onBack={() => updateSection('main')}
        onOpenBlockList={() => updateSection('blocked')}
      />
    );
  }
  if (activeSection === 'blocked') {
    return (
      <BlockList
        blockedUsers={blockedUsers}
        onBack={() => updateSection('settings')}
        onUnblockUser={onUnblockUser}
      />
    );
  }
  if (activeSection === 'coins') {
    return (
      <CoinCenter user={user} onBack={() => updateSection('main')} />
    );
  }
  if (activeSection === 'drafts') {
    return (
      <DraftsPanel
        drafts={drafts}
        onBack={() => updateSection('main')}
        onOpenDraft={onOpenDraft}
        onDeleteDraft={onDeleteDraft}
      />
    );
  }

  return (
    <div className="pb-20 h-full flex flex-col bg-white">
      {/* Top App Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4">
        <div className="h-12 flex items-center justify-between">
          <button
            onClick={() => updateSection('coins')}
            className="w-9 h-9 rounded-full bg-white shadow-sm border border-white flex items-center justify-center text-[#5F48E6] active:scale-95 transition-transform"
          >
            <Coins className="w-5 h-5" />
          </button>
          <button
            onClick={() => updateSection('settings')}
            className="w-10 h-10 rounded-full bg-white shadow-sm border border-white flex items-center justify-center text-[#5F48E6] active:scale-95 transition-transform"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto bg-white px-4 pb-4 pt-3">
        <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-white relative flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-[#F3F0FF] rounded-full flex items-center justify-center text-4xl border-2 border-white shadow-inner">
              {user?.avatar || '🙂'}
            </div>
            <div className="pt-1">
              <h2 className="text-2xl font-bold text-[#151921]">
                {displayName}
              </h2>
              <div className="text-xs text-gray-500 mt-0.5 mb-2">
                {user?.mbti || 'MBTI pending'} · {user?.constellation || '—'}{' '}
                <br /> {profileLocation}
              </div>
              {profileHobbies.length > 0 && (
                <div className="flex flex-wrap gap-1 text-[10px] text-[#5F48E6]">
                  {profileHobbies.slice(0, 3).map((interest) => (
                    <span
                      key={interest}
                      className="bg-[#F3F0FF] px-2 py-0.5 rounded-md italic"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setActiveSection('editProfile')}
            className="bg-[#F3F0FF] text-[#5F48E6] px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-[#E0D9FF] transition-colors"
          >
            <Edit3 className="w-3 h-3" /> Edit
          </button>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#FBFAF3] border border-[#0BAB7C]/20 text-[#0BAB7C] text-[10px] px-3 py-1 rounded-full font-medium shadow-sm flex items-center gap-1 w-[90%] justify-center">
            <span className="w-1.5 h-1.5 bg-[#0BAB7C] rounded-full" />
            {user?.mbti
              ? 'MBTI verified'
              : 'Complete MBTI to unlock more'}
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">
        <div
          onClick={() => setIsMatched(!isMatched)}
          className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[#5F48E6]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#151921]">
                My Situation
              </h4>
              <p className="text-xs text-gray-400">
                {isMatched ? 'Matched' : 'Unmatched'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>

        <div
          onClick={() => updateSection('plaza')}
          className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#151921]">
                Personal Plaza
              </h4>
              <p className="text-xs text-gray-400">
                View shared stories
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>

        <div
          onClick={() => updateSection('drafts')}
          className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#F3F0FF] flex items-center justify-center text-[#5F48E6]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#151921]">
                Draft
              </h4>
              <p className="text-xs text-gray-400">
                Saved posts
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>

        <div
          onClick={() => updateSection('emall')}
          className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#151921]">
                E Mall
              </h4>
              <p className="text-xs text-gray-400">
                Browse curated goods
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>

        <div
          onClick={() => updateSection('vip')}
          className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#151921]">
                VIP Center
              </h4>
              <p className="text-xs text-gray-400">
                Upgrade membership ({planName})
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>

        <div className="h-6" />
        <button
          onClick={onLogout}
          className="w-full bg-red-50 text-red-500 rounded-2xl py-4 font-bold flex items-center justify-center gap-2 mb-8 hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default MeTab;
