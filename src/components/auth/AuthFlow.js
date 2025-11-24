"use client";

import React, { useState, useEffect } from 'react';
import { Phone, ArrowLeft } from 'lucide-react';
import {
  COUNTRY_CODES,
  INTEREST_OPTIONS,
  FREE_USERS_NO_MBTI,
  FREE_USERS_WITH_MBTI,
  PREMIUM_USERS,
  INFINITY_USERS
} from '../../data/mockData';

export const AuthLanding = ({
  onSignupPhone,
  onSocialLogin,
  onLoginExisting
}) => (
  <div className="flex flex-col flex-1 bg-gradient-to-b from-[#E0D9FF] to-[#F3F0FF] px-6 py-8 text-center overflow-y-auto">
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="bg-white/80 rounded-3xl px-8 py-4 shadow-lg text-[#5F48E6] font-bold text-3xl">
        Echo
      </div>
      <p className="text-lg text-[#5F48E6] font-semibold leading-tight max-w-sm">
        Where kindred souls find their echo beyond appearances
      </p>
      <button
        onClick={onSignupPhone}
        className="w-full rounded-full bg-[#151921] text-white py-3 font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
      >
        <Phone className="w-4 h-4" /> Sign up with phone number
      </button>
      <div className="text-[11px] uppercase tracking-widest text-gray-500">
        or use social sign up
      </div>
      <div className="flex flex-col gap-3 w-full">
        {['Google', 'Facebook', 'Apple'].map((provider) => (
          <button
            key={provider}
            onClick={() => onSocialLogin(provider)}
            className="bg-white rounded-full py-3 shadow flex items-center justify-center text-sm font-semibold text-[#151921] active:scale-95 transition-transform"
          >
            Continue with {provider}
          </button>
        ))}
      </div>
    </div>
    <button
      onClick={onLoginExisting}
      className="text-sm text-gray-600 mt-4 font-medium underline underline-offset-2"
    >
      Already have account? Log In
    </button>
  </div>
);

const UserCard = ({ user, onSelect }) => (
  <button
    onClick={() => onSelect(user)}
    className="bg-white rounded-2xl p-4 shadow flex items-center justify-between w-full text-left active:scale-[0.99] transition-transform"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
        {user.avatar}
      </div>
      <div>
        <p className="font-bold text-[#151921]">{user.name}</p>
        <p className="text-xs text-gray-500">
          @{user.username} · {user.subscription}
        </p>
        <p className="text-[11px] text-gray-400 line-clamp-1">
          {user.bio}
        </p>
      </div>
    </div>
    <span className="text-[10px] font-semibold text-gray-400 uppercase">
      {user.mbti || 'No MBTI'}
    </span>
  </button>
);

export const LoginScreen = ({ onBack, onSelectUser }) => {
  const sections = [
    {
      title: 'Free • Profile in progress',
      description: 'Signed up but still exploring MBTI.',
      users: FREE_USERS_NO_MBTI
    },
    {
      title: 'Free • Profile complete',
      description: 'Ready for upgrades any time.',
      users: FREE_USERS_WITH_MBTI
    },
    {
      title: 'Premium explorers',
      description: 'Unlocked more insights.',
      users: PREMIUM_USERS
    },
    {
      title: 'Infinity members',
      description: 'All-access Echo experience.',
      users: INFINITY_USERS
    }
  ];

  return (
    <div className="h-full bg-[#F3F0FF] flex flex-col">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-[#151921]" />
        </button>
        <h2 className="font-bold text-lg text-[#151921]">
          Log in to Echo
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <div>
              <h3 className="text-sm font-bold text-[#151921]">
                {section.title}
              </h3>
              <p className="text-[11px] text-gray-500">
                {section.description}
              </p>
            </div>
            {section.users.map((user) => (
              <UserCard
                key={user.username}
                user={user}
                onSelect={onSelectUser}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PhoneEntryScreen = ({
  country,
  phone,
  onChange,
  onSubmit,
  onBack
}) => (
  <div className="h-full flex flex-col bg-white">
    <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
      <button onClick={onBack}>
        <ArrowLeft className="w-6 h-6 text-[#151921]" />
      </button>
      <h2 className="font-bold text-lg text-[#151921]">
        Can we get your number?
      </h2>
    </div>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex-1 p-4 flex flex-col gap-4"
    >
      <label className="text-sm font-semibold text-gray-500">
        Country / Region
      </label>
      <select
        value={country}
        onChange={(e) => onChange({ country: e.target.value })}
        className="border border-gray-200 rounded-2xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#5F48E6]"
      >
        {COUNTRY_CODES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.country} ({c.code})
          </option>
        ))}
      </select>
      <label className="text-sm font-semibold text-gray-500">
        Phone number
      </label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => onChange({ phone: e.target.value })}
        className="border border-gray-200 rounded-2xl p-3 text-lg tracking-wider outline-none focus:ring-2 focus:ring-[#5F48E6]"
        placeholder="123 456 7890"
        required
      />
      <p className="text-xs text-gray-400">
        We&apos;ll text you a code to verify you&apos;re really you.
        Message and data rates may apply.
      </p>
      <button
        type="submit"
        className="mt-auto bg-[#151921] text-white py-3 rounded-2xl font-bold active:scale-95 transition-transform"
      >
        Send code
      </button>
    </form>
  </div>
);

export const PhoneVerificationScreen = ({
  phone,
  code,
  onChange,
  onSubmit,
  onBack,
  error
}) => (
  <div className="h-full flex flex-col bg-white">
    <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
      <button onClick={onBack}>
        <ArrowLeft className="w-6 h-6 text-[#151921]" />
      </button>
      <h2 className="font-bold text-lg text-[#151921]">
        Enter verification code
      </h2>
    </div>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex-1 p-4 flex flex-col gap-4"
    >
      <p className="text-sm text-gray-500">
        We sent a 6-digit code to <strong>{phone}</strong>
      </p>
      <input
        type="text"
        maxLength={6}
        value={code}
        onChange={(e) => onChange(e.target.value.replace(/\\D/g, ''))}
        className="border border-gray-200 rounded-2xl p-3 text-center tracking-[0.5rem] text-xl outline-none focus:ring-2 focus:ring-[#5F48E6]"
        placeholder="• • • • • •"
      />
      {error && (
        <div className="text-xs text-red-500 font-semibold">
          {error}
        </div>
      )}
      <button
        type="submit"
        className="mt-auto bg-[#5F48E6] text-white py-3 rounded-2xl font-bold active:scale-95 transition-transform disabled:opacity-40"
        disabled={code.length !== 6}
      >
        Verify
      </button>
    </form>
  </div>
);

const stepOrder = [
  'dob',
  'username',
  'nickname',
  'gender',
  'preference',
  'interests',
  'location'
];

const StepHeader = ({ title, description, onBack, showBack }) => (
  <div className="flex items-center gap-3 px-4 py-4">
    {showBack ? (
      <button onClick={onBack}>
        <ArrowLeft className="w-6 h-6 text-[#151921]" />
      </button>
    ) : (
      <span className="w-6" />
    )}
    <div>
      <h2 className="font-bold text-lg text-[#151921]">{title}</h2>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

const isAdult = (dob) => {
  if (!dob) return false;
  const birth = new Date(dob);
  const today = new Date();
  const adultDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  return birth <= adultDate;
};

export const ProfileWizard = ({
  data,
  onUpdate,
  onComplete,
  onExit
}) => {
  const [step, setStep] = useState(0);
  const [locationStatus, setLocationStatus] = useState(null);

  const goNext = () => {
    if (step === stepOrder.length - 1) {
      onComplete();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (step === 0) onExit();
    else setStep((prev) => prev - 1);
  };

  const currentStep = stepOrder[step];

  const stepValid = () => {
    switch (currentStep) {
      case 'dob':
        return isAdult(data.dob);
      case 'username':
        return data.username.trim().length >= 3;
      case 'nickname':
        return data.nickname.trim().length >= 2;
      case 'gender':
        return Boolean(data.gender);
      case 'preference':
        return Boolean(data.preference);
      case 'location':
        return data.location.trim().length > 0;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'dob':
        return (
          <div className="p-4 space-y-4">
            <label className="text-sm font-semibold text-gray-500">
              Date of birth
            </label>
            <input
              type="date"
              value={data.dob}
              onChange={(e) => onUpdate({ dob: e.target.value })}
              className="w-full border border-gray-200 rounded-2xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#5F48E6]"
            />
            {!isAdult(data.dob) && data.dob && (
              <p className="text-xs text-red-500">
                You must be at least 18 to join Echo.
              </p>
            )}
          </div>
        );
      case 'username':
        return (
          <div className="p-4 space-y-4">
            <label className="text-sm font-semibold text-gray-500">
              Unique username
            </label>
            <input
              value={data.username}
              onChange={(e) =>
                onUpdate({ username: e.target.value })
              }
              className="w-full border border-gray-200 rounded-2xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#5F48E6]"
              placeholder="EchoSeeker"
            />
          </div>
        );
      case 'nickname':
        return (
          <div className="p-4 space-y-4">
            <label className="text-sm font-semibold text-gray-500">
              Display name
            </label>
            <input
              value={data.nickname}
              onChange={(e) =>
                onUpdate({ nickname: e.target.value })
              }
              className="w-full border border-gray-200 rounded-2xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#5F48E6]"
              placeholder="Call me..."
            />
          </div>
        );
      case 'gender':
        return (
          <div className="p-4 space-y-4">
            <label className="text-sm font-semibold text-gray-500">
              I identify as
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Female', 'Male', 'Non-binary', 'Prefer not to say'].map(
                (value) => (
                  <button
                    key={value}
                    onClick={() => onUpdate({ gender: value })}
                    type="button"
                    className={`p-4 rounded-2xl border ${
                      data.gender === value
                        ? 'border-[#5F48E6] text-[#5F48E6] bg-white'
                        : 'border-gray-200 text-gray-500 bg-gray-50'
                    } font-semibold text-sm`}
                  >
                    {value}
                  </button>
                )
              )}
            </div>
          </div>
        );
      case 'preference':
        return (
          <div className="p-4 space-y-4">
            <label className="text-sm font-semibold text-gray-500">
              I&apos;m looking for
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Female', 'Male', 'Any', 'Prefer not to say'].map(
                (value) => (
                  <button
                    key={value}
                    onClick={() => onUpdate({ preference: value })}
                    type="button"
                    className={`p-4 rounded-2xl border ${
                      data.preference === value
                        ? 'border-[#5F48E6] text-[#5F48E6] bg-white'
                        : 'border-gray-200 text-gray-500 bg-gray-50'
                    } font-semibold text-sm`}
                  >
                    {value}
                  </button>
                )
              )}
            </div>
          </div>
        );
      case 'interests':
        return (
          <div className="p-4 space-y-4">
            <label className="text-sm font-semibold text-gray-500">
              Interests & hobbies (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((option) => {
                const active = data.interests.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      if (active) {
                        onUpdate({
                          interests: data.interests.filter(
                            (item) => item !== option
                          )
                        });
                      } else {
                        onUpdate({
                          interests: [...data.interests, option]
                        });
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                      active
                        ? 'border-[#5F48E6] text-[#5F48E6] bg-white'
                        : 'border-gray-200 text-gray-500 bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 'location':
        return (
          <div className="p-4 space-y-4">
            <label className="text-sm font-semibold text-gray-500">
              Where are you now?
            </label>
            <input
              value={data.location}
              onChange={(e) =>
                onUpdate({ location: e.target.value })
              }
              className="w-full border border-gray-200 rounded-2xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#5F48E6]"
              placeholder="City, Country"
            />
            <button
              type="button"
              onClick={() => {
                if (!navigator.geolocation) {
                  setLocationStatus('Location services unavailable.');
                  return;
                }
                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    const { latitude, longitude } = pos.coords;
                    onUpdate({
                      location: `${latitude.toFixed(
                        2
                      )}, ${longitude.toFixed(2)}`
                    });
                    setLocationStatus('Location captured.');
                  },
                  () =>
                    setLocationStatus(
                      'Unable to retrieve location. Please type manually.'
                    ),
                  { enableHighAccuracy: true }
                );
              }}
              className="text-xs font-semibold text-[#5F48E6] underline"
            >
              Use current location
            </button>
            {locationStatus && (
              <p className="text-[11px] text-gray-500">
                {locationStatus}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const titles = {
    dob: 'Tell us your birthday',
    username: 'Choose a username',
    nickname: 'How should we call you?',
    gender: 'Share your gender',
    preference: 'Who are you looking for?',
    interests: 'Pick some interests',
    location: 'Set your location'
  };

  const descriptions = {
    dob: 'We only allow members 18+ to keep Echo safe.',
    username: 'It helps friends find you on Echo.',
    nickname: 'This is what other members will see.',
    gender: 'Share as much or as little as you want.',
    preference: 'Helps us tailor your recommendations.',
    interests: 'Optional but helps with matches.',
    location: 'Used to show nearby members.'
  };

  return (
    <div className="h-full flex flex-col bg-[#F3F0FF]">
      <StepHeader
        title={titles[currentStep]}
        description={descriptions[currentStep]}
        onBack={goBack}
        showBack
      />
      <div className="flex-1 overflow-y-auto">{renderStep()}</div>
      <div className="p-4">
        <button
          disabled={!stepValid()}
          onClick={goNext}
          className="w-full bg-[#151921] text-white py-3 rounded-2xl font-bold active:scale-95 transition-transform disabled:bg-gray-300"
        >
          {step === stepOrder.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};
