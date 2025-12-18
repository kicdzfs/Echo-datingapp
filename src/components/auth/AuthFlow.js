"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Phone,
  ArrowLeft,
  ChevronDown,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import {
  COUNTRY_CODES,
  INTEREST_OPTIONS,
  FREE_USERS_NO_MBTI,
  FREE_USERS_WITH_MBTI,
  PREMIUM_USERS,
  INFINITY_USERS
} from '../../data/mockData';

const GENDER_OPTIONS = [
  {
    value: 'Female',
    label: 'Female',
    details: [
      {
        label: 'Cis woman',
        description:
          'A woman whose gender aligns with the sex assigned at birth.'
      },
      {
        label: 'Trans woman',
        description:
          'A woman whose gender is different from the sex assigned at birth.'
      },
      {
        label: 'Intersex woman',
        description:
          'A woman born with variations in sex characteristics beyond binary definitions.'
      }
    ]
  },
  {
    value: 'Male',
    label: 'Male',
    details: [
      {
        label: 'Cis man',
        description:
          'A man whose gender aligns with the sex assigned at birth.'
      },
      {
        label: 'Trans man',
        description:
          'A man whose gender is different from the sex assigned at birth.'
      },
      {
        label: 'Intersex man',
        description:
          'A man born with variations in sex characteristics beyond binary definitions.'
      }
    ]
  },
  {
    value: 'Beyond binary',
    label: 'Beyond Binary',
    details: [
      {
        label: 'Non-binary',
        description:
          'An umbrella term for genders that are not exclusively male or female.'
      },
      {
        label: 'Genderqueer',
        description:
          'A gender identity that may be fluid or blend masculine and feminine qualities.'
      },
      {
        label: 'Agender',
        description:
          'Someone who identifies as not having a gender.'
      }
    ]
  }
];

const PREFERENCE_OPTIONS = [
  {
    value: 'Women',
    label: 'Women',
    details: [
      {
        label: 'Women',
        description: 'People who identify as women.'
      },
      {
        label: 'Trans women',
        description:
          'Women who are transgender or transfeminine.'
      }
    ]
  },
  {
    value: 'Men',
    label: 'Men',
    details: [
      {
        label: 'Men',
        description: 'People who identify as men.'
      },
      {
        label: 'Trans men',
        description:
          'Men who are transgender or transmasculine.'
      }
    ]
  },
  {
    value: 'Beyond binary',
    label: 'Beyond Binary',
    details: [
      {
        label: 'Non-binary people',
        description: 'People whose gender is beyond the binary spectrum.'
      },
      {
        label: 'Gender-fluid people',
        description: 'People whose gender may shift over time.'
      }
    ]
  },
  {
    value: 'Any',
    label: 'All genders',
    details: [
      {
        label: 'Everyone',
        description:
          'Show me matches across the gender spectrum.'
      }
    ]
  }
];

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const SocialIcon = ({ provider }) => {
  const baseClass = "w-4 h-4 object-contain";
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const update = () => setIsDark(root.dataset.theme === 'dark');
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  if (provider === "Google") {
    return (
      <img
        src="/google-icon.svg"
        alt="Google"
        className={baseClass}
        loading="lazy"
      />
    );
  }
  if (provider === "Facebook") {
    return (
      <img
        src="/facebook-icon.svg"
        alt="Facebook"
        className={baseClass}
        loading="lazy"
      />
    );
  }
  if (provider === "Apple") {
    return (
      <img
        src={isDark ? "/apple_white.png" : "/apple-icon.svg"}
        alt="Apple"
        className={baseClass}
        loading="lazy"
      />
    );
  }
  return null;
};

export const AuthLanding = ({
  onSignupPhone,
  onSocialLogin,
  onLoginExisting
}) => (
  <main className="min-h-screen w-full auth-surface overflow-hidden">
    <div className="min-h-screen flex items-center justify-center px-4">
      <section className="w-full max-w-md bg-transparent text-center">
        <div className="flex flex-col items-center justify-center gap-5">
          <img
            src="/logos/clicksol-logo.png"
            alt="Clicksol"
            className="w-28 sm:w-32 h-auto object-contain mx-auto drop-shadow-lg"
          />
          <p className="text-lg text-[#5F48E6] font-semibold leading-tight max-w-sm">
            Where kindred souls find their echo beyond appearances
          </p>
          <button
            onClick={onSignupPhone}
            className="w-full rounded-full bg-[#151921] text-white py-3 font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform auth-button-dark"
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
                className="auth-card auth-social rounded-full py-3 shadow flex items-center justify-center text-sm font-semibold text-[#151921] active:scale-95 transition-transform"
              >
                <span className="flex items-center gap-2">
                  <SocialIcon provider={provider} />
                  <span>Continue with {provider}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-4 font-medium">
          Already have account?{' '}
          <button
            onClick={onLoginExisting}
            className="underline underline-offset-2 text-[#5F48E6]"
          >
            Log In
          </button>
        </div>
      </section>
    </div>
  </main>
);

const UserCard = ({ user, onSelect }) => (
  <button
    onClick={() => onSelect(user)}
    className="auth-card bg-white rounded-2xl p-4 shadow flex items-center justify-between w-full text-left active:scale-[0.99] transition-transform"
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
    <main className="min-h-screen w-full auth-surface overflow-hidden">
      <div className="max-w-md mx-auto px-4 pt-8 pb-10 h-full">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6 text-[#151921]" />
        </button>
        <h2 className="font-bold text-lg text-[#151921]">
          Log in to Echo
        </h2>
      </div>
      <div className="space-y-6">
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
    </main>
  );
};

export const PhoneEntryScreen = ({
  country,
  phone,
  onChange,
  onSubmit,
  onBack
}) => {
  const countryMeta =
    COUNTRY_CODES.find((entry) => entry.key === country) ||
    COUNTRY_CODES[0];
  const numericPhone = phone.replace(/\D/g, '');
  const withinLength =
    numericPhone.length >= (countryMeta?.minLength || 4) &&
    numericPhone.length <= (countryMeta?.maxLength || 15);
  const phoneError =
    numericPhone.length > 0 && !withinLength
      ? `Phone numbers in ${countryMeta.country} should be ${
          countryMeta.minLength === countryMeta.maxLength
            ? `${countryMeta.minLength} digits`
            : `${countryMeta.minLength}-${countryMeta.maxLength} digits`
        }.`
      : '';
  const [pickerOpen, setPickerOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const pickerRef = useRef(null);

  const buildPlaceholder = useCallback((minLen, maxLen) => {
    const digits = '12345678901234567890';
    const length = Math.min(maxLen || minLen || 10, digits.length);
    const sample = digits.slice(0, length);
    return sample.replace(/(.{3})/g, '$1 ').trim();
  }, []);

  const phonePlaceholder = useMemo(
    () => buildPlaceholder(countryMeta.minLength, countryMeta.maxLength),
    [countryMeta, buildPlaceholder]
  );

  const filteredCountries = useMemo(() => {
    const term = countrySearch.trim().toLowerCase();
    if (!term) return COUNTRY_CODES;
    return COUNTRY_CODES.filter(
      (entry) =>
        entry.country.toLowerCase().includes(term) ||
        entry.dial.includes(term)
    );
  }, [countrySearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!pickerRef.current?.contains(event.target)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <main className="min-h-screen w-full auth-surface">
      <div className="max-w-md mx-auto px-4 pt-8 pb-10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
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
          if (!phoneError && numericPhone.length > 0) {
            onSubmit();
          }
        }}
        className="flex-1 flex flex-col gap-4"
      >
        <label className="text-sm font-semibold text-gray-500">
          Your number
        </label>
        <div className="flex gap-3 flex-wrap" ref={pickerRef}>
          <div className="flex-1 min-w-[170px] sm:min-w-[200px] space-y-2 relative">
            <p className="text-xs font-semibold text-gray-500 uppercase">
              Country / Region
            </p>
            <button
              type="button"
              onClick={() => setPickerOpen((prev) => !prev)}
              className={`w-full h-14 rounded-2xl border border-gray-200 bg-white px-4 flex items-center transition-colors ${
                pickerOpen ? 'ring-2 ring-[#5F48E6]' : ''
              }`}
            >
              <span className="text-sm font-bold text-[#151921] truncate">
                {countryMeta.country}
              </span>
              <div className="ml-auto flex items-center gap-2 text-sm font-semibold text-gray-500">
                <span className="tabular-nums">{countryMeta.dial}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    pickerOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>
            {pickerOpen && (
              <div className="absolute z-20 left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-[#E1DAFF]">
                <div className="p-3 border-b border-gray-100">
                  <input
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search country or code"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-[#151921] placeholder:text-[#7B77A3] outline-none focus:ring-2 focus:ring-[#5F48E6]"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto scrollbar-auto-hide">
                  {filteredCountries.map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => {
                        onChange({ country: c.key });
                        setPickerOpen(false);
                        setCountrySearch('');
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm ${
                        c.key === country
                          ? 'bg-[#F3F0FF] text-[#5F48E6]'
                          : 'text-[#151921]'
                      }`}
                    >
                      <span>{c.country}</span>
                      <span className="font-semibold">{c.dial}</span>
                    </button>
                  ))}
                  {!filteredCountries.length && (
                    <div className="px-4 py-3 text-xs text-gray-500">
                      No matches
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex-[1.4] min-w-[200px] space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase">
              Phone number
            </p>
            <input
              type="tel"
              inputMode="numeric"
              value={numericPhone}
              onChange={(e) =>
                onChange({ phone: e.target.value.replace(/\D/g, '') })
              }
              className="w-full h-14 border border-gray-200 rounded-2xl px-4 text-base tracking-wider outline-none focus:ring-2 focus:ring-[#5F48E6] text-[#151921] placeholder:text-[#7B77A3] bg-white"
              placeholder={phonePlaceholder}
              required
            />
          </div>
        </div>
        {phoneError && (
          <p className="text-xs text-red-500">{phoneError}</p>
        )}
        <p className="text-xs text-gray-400">
          We&apos;ll text you a code to verify you&apos;re really you.
          Message and data rates may apply.
        </p>
        <button
          type="submit"
          disabled={numericPhone.length === 0 || Boolean(phoneError)}
          className="mt-auto bg-[#151921] text-white py-3 rounded-2xl font-bold active:scale-95 transition-transform disabled:opacity-30"
        >
          Send code
        </button>
      </form>
      </div>
    </main>
  );
};

export const PhoneVerificationScreen = ({
  phone,
  code,
  onChange,
  onSubmit,
  onBack,
  error
}) => (
  <main className="min-h-screen w-full auth-surface">
    <div className="max-w-md mx-auto px-4 pt-8 pb-10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
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
        className="flex-1 flex flex-col gap-4"
      >
        <p className="text-sm text-gray-500">
          We sent a 6-digit code to <strong>{phone}</strong>
        </p>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
          className="border border-gray-200 rounded-2xl p-3 text-center tracking-[0.5rem] text-xl outline-none focus:ring-2 focus:ring-[#5F48E6]"
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
  </main>
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

const StepHeader = ({
  title,
  description,
  onBack,
  showBack,
  rightContent
}) => (
  <div className="flex items-center justify-between px-4 py-4">
    <div className="flex items-center gap-3">
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
    {rightContent}
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
  const autoLocationRequestedRef = useRef(false);
  const dobFieldRef = useRef(null);
  const calendarRef = useRef(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const minDOB = '1900-01-01';
  const minDateObj = useMemo(() => new Date(minDOB), []);
  const todayDate = useMemo(() => new Date(), []);
  const [calendarView, setCalendarView] = useState(() => {
    const base = data.dob ? new Date(data.dob) : new Date();
    return { year: base.getFullYear(), month: base.getMonth() };
  });
  const [yearPageStart, setYearPageStart] = useState(() => {
    const base = data.dob ? new Date(data.dob) : new Date();
    return Math.floor(base.getFullYear() / 12) * 12;
  });
  const [showYearPicker, setShowYearPicker] = useState(false);
  const minYear = minDateObj.getFullYear();
  const maxYear = todayDate.getFullYear();
  const maxYearStart = Math.max(minYear, maxYear - 11);

  const currentStep = stepOrder[step];

  const goNext = () => {
    if (currentStep === 'dob' && calendarOpen) {
      setCalendarOpen(false);
    }
    if (step === stepOrder.length - 1) {
      onComplete();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep === 'dob' && calendarOpen) {
      setCalendarOpen(false);
    }
    if (step === 0) onExit();
    else setStep((prev) => prev - 1);
  };

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

  const requestLocation = useCallback(
    (fromButton = false) => {
      if (!navigator.geolocation) {
        setLocationStatus('Location services unavailable.');
        return;
      }
      setLocationStatus(
        fromButton ? 'Refreshing your location...' : 'Trying to detect your area...'
      );
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const response = await fetch(
              `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
            );
            const json = await response.json();
            const address = json.address || {};
            const city =
              address.city ||
              address.town ||
              address.village ||
              address.state;
            const country = address.country;
            const fallback = json.display_name;
            const composed =
              [city, country].filter(Boolean).join(', ') || fallback;
            const finalLocation =
              composed || 'Detected nearby area (edit if needed)';
            onUpdate({ location: finalLocation });
            setLocationStatus(
              composed
                ? 'Location captured.'
                : 'Approximate location captured. Please review.'
            );
          } catch (err) {
            const fallbackCoords = `${latitude.toFixed(
              2
            )}, ${longitude.toFixed(2)}`;
            onUpdate({ location: fallbackCoords });
            setLocationStatus(
              'Coordinates captured. Please refine the address if needed.'
            );
          }
        },
        () =>
          setLocationStatus(
            'Unable to retrieve location. Please type manually.'
          ),
        { enableHighAccuracy: true }
      );
    },
    [onUpdate]
  );

  useEffect(() => {
    if (currentStep === 'location' && !autoLocationRequestedRef.current) {
      autoLocationRequestedRef.current = true;
      const timer = setTimeout(() => requestLocation(), 0);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [currentStep, requestLocation]);

  useEffect(() => {
    if (!calendarOpen) return undefined;
    const handleClick = (event) => {
      if (
        !calendarRef.current?.contains(event.target) &&
        !dobFieldRef.current?.contains(event.target)
      ) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [calendarOpen]);

  const formatDobDisplay = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const changeMonth = (direction) => {
    setCalendarView((prev) => {
      const next = new Date(prev.year, prev.month + direction, 1);
      if (
        next < new Date(minYear, 0, 1) ||
        next > new Date(maxYear, 11, 31)
      ) {
        return prev;
      }
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  };

  const handleDaySelect = (day) => {
    const target = new Date(calendarView.year, calendarView.month, day);
    if (target < minDateObj || target > todayDate) return;
    const iso = target.toISOString().split('T')[0];
    onUpdate({ dob: iso });
    setCalendarView({ year: target.getFullYear(), month: target.getMonth() });
    setCalendarOpen(false);
  };

  const handleYearSelect = (year) => {
    if (year < minYear || year > maxYear) return;
    setCalendarView((prev) => ({ ...prev, year }));
    setShowYearPicker(false);
    setYearPageStart(Math.floor(year / 12) * 12);
  };

  const moveYearPage = (direction) => {
    setYearPageStart((prev) => {
      let next = prev + direction * 12;
      if (next < minYear) next = minYear;
      if (next > maxYearStart) next = maxYearStart;
      return next;
    });
  };

  const toggleYearPicker = () => {
    setShowYearPicker((prev) => {
      if (!prev) {
        setYearPageStart(Math.floor(calendarView.year / 12) * 12);
      }
      return !prev;
    });
  };
  const renderStep = () => {
    switch (currentStep) {
      case 'dob':
        const startOfMonth = new Date(
          calendarView.year,
          calendarView.month,
          1
        );
        const daysInMonth = new Date(
          calendarView.year,
          calendarView.month + 1,
          0
        ).getDate();
        const leadingEmpty = startOfMonth.getDay();
        const cells = [];
        for (let i = 0; i < leadingEmpty; i += 1) {
          cells.push(null);
        }
        for (let day = 1; day <= daysInMonth; day += 1) {
          cells.push(day);
        }
        while (cells.length % 7 !== 0) {
          cells.push(null);
        }
        const canGoPrev = new Date(
          calendarView.year,
          calendarView.month,
          1
        ) > new Date(minDateObj.getFullYear(), minDateObj.getMonth(), 1);
        const canGoNext = new Date(
          calendarView.year,
          calendarView.month,
          daysInMonth
        ) < todayDate;
        return (
          <div className="p-4 space-y-4">
            <label className="text-sm font-semibold text-gray-500">
              Date of birth
            </label>
            <div className="relative" ref={dobFieldRef}>
              <input
                type="text"
                readOnly
                value={formatDobDisplay(data.dob)}
                onClick={() => setCalendarOpen(true)}
                placeholder="MM / DD / YYYY"
                className="w-full border border-gray-200 rounded-2xl p-3 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#5F48E6] text-[#151921] bg-white cursor-pointer"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white text-[#5F48E6]"
                onClick={() => setCalendarOpen((prev) => !prev)}
              >
                <CalendarDays className="w-5 h-5" />
              </button>
              {calendarOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
                  <div
                    ref={calendarRef}
                    className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setCalendarOpen(false);
                          setShowYearPicker(false);
                        }}
                        className="p-2 rounded-full text-gray-400 hover:text-[#151921]"
                        aria-label="Close calendar"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => canGoPrev && changeMonth(-1)}
                          disabled={!canGoPrev}
                          className={`p-1 rounded-full border ${
                            canGoPrev
                              ? 'border-gray-200 text-gray-600'
                              : 'border-transparent text-gray-300'
                          }`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={toggleYearPicker}
                          className="text-sm font-semibold text-[#151921]"
                        >
                          {MONTH_NAMES[calendarView.month]} {calendarView.year}
                        </button>
                        <button
                          type="button"
                          onClick={() => canGoNext && changeMonth(1)}
                          disabled={!canGoNext}
                          className={`p-1 rounded-full border ${
                            canGoNext
                              ? 'border-gray-200 text-gray-600'
                              : 'border-transparent text-gray-300'
                          }`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {showYearPicker ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => moveYearPage(-1)}
                            disabled={yearPageStart <= minYear}
                            className={`text-xs font-semibold ${
                              yearPageStart <= minYear
                                ? 'text-gray-300'
                                : 'text-[#5F48E6]'
                            }`}
                          >
                            Previous
                          </button>
                          <span className="text-sm font-semibold text-[#151921]">
                            {yearPageStart} - {Math.min(yearPageStart + 11, maxYear)}
                          </span>
                          <button
                            type="button"
                            onClick={() => moveYearPage(1)}
                            disabled={yearPageStart >= maxYearStart}
                            className={`text-xs font-semibold ${
                              yearPageStart >= maxYearStart
                                ? 'text-gray-300'
                                : 'text-[#5F48E6]'
                            }`}
                          >
                            Next
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {Array.from({ length: 12 }, (_, idx) => yearPageStart + idx).map(
                            (year) => {
                              const disabled = year < minYear || year > maxYear;
                              const active = calendarView.year === year;
                              return (
                                <button
                                  key={year}
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => handleYearSelect(year)}
                                  className={`py-2 rounded-xl text-sm font-semibold ${
                                    active
                                      ? 'bg-[#5F48E6] text-white'
                                      : 'bg-[#F3F0FF] text-[#151921]'
                                  } ${
                                    disabled ? 'opacity-30 cursor-not-allowed' : ''
                                  }`}
                                >
                                  {year}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-7 gap-1 text-[11px] text-gray-400 font-semibold">
                          {DAY_LABELS.map((label, index) => (
                            <span key={`${label}-${index}`} className="text-center">
                              {label}
                            </span>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-sm">
                          {cells.map((day, idx) => {
                            if (!day) {
                              return <span key={`empty-${idx}`} />;
                            }
                            const candidate = new Date(
                              calendarView.year,
                              calendarView.month,
                              day
                            );
                            const iso = candidate.toISOString().split('T')[0];
                            const disabled =
                              candidate < minDateObj || candidate > todayDate;
                            const isSelected = data.dob === iso;
                            return (
                              <button
                                key={iso}
                                type="button"
                                onClick={() => handleDaySelect(day)}
                                disabled={disabled}
                                className={`h-9 rounded-full text-[13px] ${
                                  isSelected
                                    ? 'bg-[#5F48E6] text-white'
                                    : 'text-[#151921]'
                                } ${
                                  disabled
                                    ? 'opacity-30 cursor-not-allowed'
                                    : 'hover:bg-[#F3F0FF]'
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            {!isAdult(data.dob) && data.dob && (
              <p className="text-xs text-red-500">
                Sorry, you must be at least 18 years old to register.
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
            <div className="space-y-3">
              {GENDER_OPTIONS.map((option) => {
                const active = data.gender === option.value;
                return (
                  <div
                    key={option.value}
                    className={`rounded-2xl border transition-colors ${
                      active
                        ? 'border-[#5F48E6] bg-white shadow'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        onUpdate({ gender: option.value, genderDetail: '' })
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-left"
                    >
                      <span className="font-semibold text-[#151921]">
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-400">
                        {active ? 'Selected' : 'Choose'}
                      </span>
                    </button>
                    {active && (
                      <div className="border-t border-gray-100 px-4 py-3 space-y-2">
                        <p className="text-[11px] uppercase text-gray-400 font-semibold">
                          Add more about your gender
                        </p>
                        {option.details.map((detail) => {
                          const detailActive =
                            data.genderDetail === detail.label;
                          return (
                            <button
                              key={detail.label}
                              type="button"
                              onClick={() =>
                                onUpdate({ genderDetail: detail.label })
                              }
                              className={`w-full text-left rounded-xl border px-3 py-2 text-sm ${
                                detailActive
                                  ? 'border-[#5F48E6] text-[#5F48E6] bg-[#F3F0FF]'
                                  : 'border-gray-200 text-gray-600 bg-white'
                              }`}
                            >
                              <span className="font-semibold block">
                                {detail.label}
                              </span>
                              <span className="text-xs text-gray-500">
                                {detail.description}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'preference':
        return (
          <div className="p-4 space-y-4">
            <label className="text-sm font-semibold text-gray-500">
              I&apos;m looking for
            </label>
            <div className="space-y-3">
              {PREFERENCE_OPTIONS.map((option) => {
                const active = data.preference === option.value;
                return (
                  <div
                    key={option.value}
                    className={`rounded-2xl border transition-colors ${
                      active
                        ? 'border-[#5F48E6] bg-white shadow'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        onUpdate({
                          preference: option.value,
                          preferenceDetail: ''
                        })
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-left"
                    >
                      <span className="font-semibold text-[#151921]">
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-400">
                        {active ? 'Selected' : 'Choose'}
                      </span>
                    </button>
                    {active && (
                      <div className="border-t border-gray-100 px-4 py-3 space-y-2">
                        <p className="text-[11px] uppercase text-gray-400 font-semibold">
                          Who should we show you?
                        </p>
                        {option.details.map((detail) => {
                          const detailActive =
                            data.preferenceDetail === detail.label;
                          return (
                            <button
                              key={detail.label}
                              type="button"
                              onClick={() =>
                                onUpdate({ preferenceDetail: detail.label })
                              }
                              className={`w-full text-left rounded-xl border px-3 py-2 text-sm ${
                                detailActive
                                  ? 'border-[#5F48E6] text-[#5F48E6] bg-[#F3F0FF]'
                                  : 'border-gray-200 text-gray-600 bg-white'
                              }`}
                            >
                              <span className="font-semibold block">
                                {detail.label}
                              </span>
                              <span className="text-xs text-gray-500">
                                {detail.description}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
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
              onClick={() => requestLocation(true)}
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

  const allowSkip = currentStep === 'interests' || currentStep === 'location';
  const handleSkip = () => {
    if (currentStep === 'location') {
      setLocationStatus('Skipped for now. You can update it later.');
    }
    goNext();
  };

  return (
  <main className="min-h-screen w-full auth-surface">
      <div className="max-w-md mx-auto px-4 pt-8 pb-10 h-full flex flex-col">
        <StepHeader
          title={titles[currentStep]}
          description={descriptions[currentStep]}
          onBack={goBack}
          showBack
          rightContent={
            allowSkip ? (
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs font-bold text-[#5F48E6]"
              >
                Skip
              </button>
            ) : null
          }
        />
        <div className="flex-1 overflow-y-auto">{renderStep()}</div>
        <div className="pt-4">
          <button
            disabled={!stepValid()}
            onClick={goNext}
            className="w-full bg-[#151921] text-white py-3 rounded-2xl font-bold active:scale-95 transition-transform disabled:bg-gray-300"
          >
            {step === stepOrder.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
};
