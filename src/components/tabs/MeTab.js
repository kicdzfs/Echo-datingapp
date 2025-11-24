"use client";

import React, { useState } from 'react';
import {
  Activity,
  User as UserIcon,
  ShoppingBag,
  Crown,
  Shield,
  Settings,
  LogOut,
  Edit3,
  ChevronRight
} from 'lucide-react';
import { VIP_PLANS } from '../../data/mockData';
import {
  PersonalPlaza,
  EMall,
  VIPCenter,
  SecurityPrivacy,
  SettingsPage,
  BlockList
} from '../SubComponents';

const MeTab = ({
  user,
  posts,
  onLikePost,
  onAddComment,
  blockedUsers = [],
  onUnblockUser,
  onLogout,
  onChangeSubscription
}) => {
  const [view, setView] = useState('main');
  const [isMatched, setIsMatched] = useState(false);
  const currentPlan = user?.subscriptionIndex ?? 0;
  const planName = VIP_PLANS[currentPlan]?.name || 'Free';

  if (view === 'plaza') {
    return (
      <PersonalPlaza
        posts={posts}
        onBack={() => setView('main')}
        onLikePost={onLikePost}
        onAddComment={onAddComment}
      />
    );
  }
  if (view === 'emall') {
    return <EMall onBack={() => setView('main')} />;
  }
  if (view === 'vip') {
    return (
      <VIPCenter
        onBack={() => setView('main')}
        currentPlan={currentPlan}
        hasMbti={Boolean(user?.mbti)}
        onSelectPlan={(planIndex) => {
          onChangeSubscription?.(planIndex);
          setView('main');
        }}
      />
    );
  }
  if (view === 'security') {
    return <SecurityPrivacy onBack={() => setView('main')} />;
  }
  if (view === 'settings') {
    return (
      <SettingsPage
        onBack={() => setView('main')}
        onOpenBlockList={() => setView('blocked')}
      />
    );
  }
  if (view === 'blocked') {
    return (
      <BlockList
        blockedUsers={blockedUsers}
        onBack={() => setView('settings')}
        onUnblockUser={onUnblockUser}
      />
    );
  }

  return (
    <div className="pb-20 bg-[#F3F0FF] h-full overflow-y-auto">
      <div className="pt-10 px-4 pb-4">
        <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-white relative flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-[#F3F0FF] rounded-full flex items-center justify-center text-4xl border-2 border-white shadow-inner">
              {user?.avatar || '🙂'}
            </div>
            <div className="pt-1">
              <h2 className="text-2xl font-bold text-[#151921]">
                {user?.nickname || user?.name || 'New Echo'}
              </h2>
              <div className="text-xs text-gray-500 mt-0.5 mb-2">
                {user?.mbti || 'MBTI pending'} ·{' '}
                {user?.constellation || '—'} <br />{' '}
                {user?.location || 'Location hidden'}
              </div>
              {user?.interests?.length > 0 && (
                <div className="flex flex-wrap gap-1 text-[10px] text-[#5F48E6]">
                  {user.interests.slice(0, 3).map((interest) => (
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
          <button className="bg-[#F3F0FF] text-[#5F48E6] px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-[#E0D9FF] transition-colors">
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

      <div className="px-4 mt-6 space-y-3">
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
          onClick={() => setView('plaza')}
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
          onClick={() => setView('emall')}
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
          onClick={() => setView('vip')}
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

        <div
          onClick={() => setView('security')}
          className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#151921]">
                Security and Privacy
              </h4>
              <p className="text-xs text-gray-400">
                Protect your data
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>

        <div
          onClick={() => setView('settings')}
          className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#151921]">
                Settings
              </h4>
              <p className="text-xs text-gray-400">
                Customize experience
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
