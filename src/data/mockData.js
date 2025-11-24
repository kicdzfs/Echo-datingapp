// Shared mock data for the Echo app
// This file contains only data (no React / hooks) so it can be used by both UI and future backend code.

export const DAILY_QUESTIONS = [
  "Do you believe that financial freedom is more important than time freedom?",
  "Have you ever made a decision that completely changed the course of your life?",
  "Is it better to regret something you have done than something you haven't?",
  "Do you think technology is making us more connected or more isolated?",
  "Is it possible to maintain a true work-life balance in today's world?"
];

export const INITIAL_POSTS = [
  {
    id: 1,
    user: "Lucas",
    avatar: "🦁",
    timestamp: Date.now() - 3600000,
    content:
      "The night view of Bangkok! 🌃✨ #Bangkok #Travel. The lights are absolutely mesmerizing from this rooftop bar. Highly recommend visiting if you're ever in the city. It's one of those places where you can just sit for hours and watch the world go by.",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
    likes: 8,
    comments: [
      { id: 1, user: "Alice", text: "Wow, stunning view!" },
      { id: 2, user: "Bob", text: "Where is this exactly?" }
    ],
    shares: 2,
    isLiked: false
  },
  {
    id: 2,
    user: "Mia",
    avatar: "🐨",
    timestamp: Date.now() - 7200000,
    content:
      "I just wrapped up 'The Great Gatsby' and it's low-key amazing! The characters and the whole vibe are so memorable. 📚🧐 I can't believe I waited this long to read it. The symbolism of the green light is just hauntingly beautiful. Does anyone else feel like Gatsby was misunderstood?",
    tag: "#Reading",
    likes: 5,
    comments: [{ id: 3, user: "Tom", text: "Classic for a reason." }],
    shares: 1,
    isLiked: true
  }
];

export const GAMES_LIST = [
  {
    id: 1,
    name: "Gobang Master",
    desc: "Classic 5-in-a-row strategy game.",
    difficulty: 3,
    icon: "⚫⚪"
  },
  {
    id: 2,
    name: "Chess Duel",
    desc: "Intellectual battle for grandmasters.",
    difficulty: 5,
    icon: "♟️"
  },
  {
    id: 3,
    name: "Fox & Geese",
    desc: "Asymmetric strategy hunt game.",
    difficulty: 2,
    icon: "🦊"
  }
];

// Detailed Recs List for Cards
export const RECS_LIST = [
  {
    id: 101,
    name: "Ethan",
    age: 24,
    mbti: "INTJ",
    zodiac: "Scorpio",
    match: 95,
    avatar: "🐨",
    interests: ["Hiking", "Tech"]
  },
  {
    id: 102,
    name: "Sophia",
    age: 22,
    mbti: "ENFP",
    zodiac: "Leo",
    match: 88,
    avatar: "🐱",
    interests: ["Art", "Music"]
  },
  {
    id: 103,
    name: "Liam",
    age: 25,
    mbti: "ISTP",
    zodiac: "Taurus",
    match: 82,
    avatar: "🦁",
    interests: ["Gym", "Movies"]
  },
  {
    id: 104,
    name: "Ava",
    age: 23,
    mbti: "INFJ",
    zodiac: "Pisces",
    match: 78,
    avatar: "🐰",
    interests: ["Books", "Yoga"]
  },
  {
    id: 105,
    name: "Noah",
    age: 26,
    mbti: "ENTP",
    zodiac: "Gemini",
    match: 75,
    avatar: "🦊",
    interests: ["Food", "Travel"]
  }
];

export const CHAT_HISTORY = [
  {
    id: 1,
    name: "Michael",
    msg: "Let's check on our game...",
    time: "8:10",
    avatar: "🦛",
    unread: 0
  },
  {
    id: 2,
    name: "Linda",
    msg: "Are there any recommended travel spots?",
    time: "8:30",
    avatar: "🐰",
    unread: 2
  },
  {
    id: 3,
    name: "Selina",
    msg: "Get ready to plan next short trip",
    time: "Yesterday",
    avatar: "🐱",
    unread: 0
  },
  {
    id: 4,
    name: "John",
    msg: "See you tomorrow!",
    time: "Yesterday",
    avatar: "🐶",
    unread: 0
  },
  {
    id: 5,
    name: "Sarah",
    msg: "Haha that was funny!",
    time: "Mon",
    avatar: "🐼",
    unread: 0
  },
  {
    id: 6,
    name: "David",
    msg: "I'll send you the link.",
    time: "Mon",
    avatar: "🦁",
    unread: 0
  },
  {
    id: 7,
    name: "Emily",
    msg: "Nice meeting you!",
    time: "Sun",
    avatar: "🦊",
    unread: 0
  },
  {
    id: 8,
    name: "Chris",
    msg: "Let's play chess again.",
    time: "Sun",
    avatar: "🐸",
    unread: 0
  }
];

export const VIP_PLANS = [
  {
    name: "Free",
    color: "bg-gradient-to-b from-gray-50 to-gray-100",
    textColor: "text-gray-800",
    btnColor: "bg-gray-800",
    features: [
      "5 Daily Match Recommendations",
      "10 Daily Likes Limit",
      "Chat only after mutual match",
      "Standard Profile Exposure",
      "Basic Match Filters",
      "Basic Avatar Set",
      "Water plant once per day"
    ]
  },
  {
    name: "Premium",
    color: "bg-gradient-to-b from-purple-50 to-[#E0D9FF]",
    textColor: "text-[#5F48E6]",
    btnColor: "bg-[#5F48E6]",
    features: [
      "15 Daily Match Recommendations",
      "30 Daily Likes Limit",
      "View top 10 users who liked you",
      "1 Follow-up message if unreplied",
      "1 Weekly Boost",
      "Advanced Match Filters",
      "Unlock premium themes",
      "Water twice per day"
    ]
  },
  {
    name: "Infinity",
    color:
      "bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100",
    textColor: "text-yellow-700",
    btnColor:
      "bg-gradient-to-r from-yellow-400 to-orange-500",
    features: [
      "Unlimited Match Recommendations",
      "Unlimited Likes",
      "View ALL who liked you",
      "Read Receipts"
    ]
  }
];

export const TERMS_LIST = [
  {
    title: "Terms of Service",
    content:
      "Welcome to our app. By using our services, you agree to..."
  },
  {
    title: "Privacy Policy",
    content:
      "We take your privacy seriously. This policy describes how we collect..."
  },
  {
    title: "Community Guidelines",
    content:
      "To maintain a safe environment, we ask all users to follow these rules..."
  },
  {
    title: "Safety Tips",
    content:
      "Here are some tips to stay safe while dating online..."
  }
];

export const COUNTRY_CODES = [
  { key: 'US', country: 'United States', dial: '+1', minLength: 10, maxLength: 10 },
  { key: 'CA', country: 'Canada', dial: '+1', minLength: 10, maxLength: 10 },
  { key: 'MX', country: 'Mexico', dial: '+52', minLength: 10, maxLength: 10 },
  { key: 'BR', country: 'Brazil', dial: '+55', minLength: 10, maxLength: 11 },
  { key: 'AR', country: 'Argentina', dial: '+54', minLength: 10, maxLength: 10 },
  { key: 'CL', country: 'Chile', dial: '+56', minLength: 9, maxLength: 9 },
  { key: 'CO', country: 'Colombia', dial: '+57', minLength: 10, maxLength: 10 },
  { key: 'PE', country: 'Peru', dial: '+51', minLength: 9, maxLength: 9 },
  { key: 'VE', country: 'Venezuela', dial: '+58', minLength: 10, maxLength: 10 },
  { key: 'BO', country: 'Bolivia', dial: '+591', minLength: 8, maxLength: 8 },
  { key: 'UY', country: 'Uruguay', dial: '+598', minLength: 8, maxLength: 8 },
  { key: 'UK', country: 'United Kingdom', dial: '+44', minLength: 10, maxLength: 10 },
  { key: 'IE', country: 'Ireland', dial: '+353', minLength: 9, maxLength: 9 },
  { key: 'PT', country: 'Portugal', dial: '+351', minLength: 9, maxLength: 9 },
  { key: 'ES', country: 'Spain', dial: '+34', minLength: 9, maxLength: 9 },
  { key: 'FR', country: 'France', dial: '+33', minLength: 9, maxLength: 9 },
  { key: 'DE', country: 'Germany', dial: '+49', minLength: 10, maxLength: 11 },
  { key: 'IT', country: 'Italy', dial: '+39', minLength: 9, maxLength: 10 },
  { key: 'NL', country: 'Netherlands', dial: '+31', minLength: 9, maxLength: 9 },
  { key: 'BE', country: 'Belgium', dial: '+32', minLength: 9, maxLength: 9 },
  { key: 'CH', country: 'Switzerland', dial: '+41', minLength: 9, maxLength: 9 },
  { key: 'AT', country: 'Austria', dial: '+43', minLength: 9, maxLength: 10 },
  { key: 'SE', country: 'Sweden', dial: '+46', minLength: 9, maxLength: 10 },
  { key: 'NO', country: 'Norway', dial: '+47', minLength: 8, maxLength: 8 },
  { key: 'DK', country: 'Denmark', dial: '+45', minLength: 8, maxLength: 8 },
  { key: 'FI', country: 'Finland', dial: '+358', minLength: 9, maxLength: 10 },
  { key: 'PL', country: 'Poland', dial: '+48', minLength: 9, maxLength: 9 },
  { key: 'CZ', country: 'Czechia', dial: '+420', minLength: 9, maxLength: 9 },
  { key: 'SK', country: 'Slovakia', dial: '+421', minLength: 9, maxLength: 9 },
  { key: 'HU', country: 'Hungary', dial: '+36', minLength: 9, maxLength: 9 },
  { key: 'RO', country: 'Romania', dial: '+40', minLength: 9, maxLength: 9 },
  { key: 'GR', country: 'Greece', dial: '+30', minLength: 10, maxLength: 10 },
  { key: 'RU', country: 'Russia', dial: '+7', minLength: 10, maxLength: 10 },
  { key: 'KZ', country: 'Kazakhstan', dial: '+7', minLength: 10, maxLength: 10 },
  { key: 'TR', country: 'Turkey', dial: '+90', minLength: 10, maxLength: 10 },
  { key: 'SA', country: 'Saudi Arabia', dial: '+966', minLength: 9, maxLength: 9 },
  { key: 'AE', country: 'United Arab Emirates', dial: '+971', minLength: 9, maxLength: 9 },
  { key: 'QA', country: 'Qatar', dial: '+974', minLength: 8, maxLength: 8 },
  { key: 'BH', country: 'Bahrain', dial: '+973', minLength: 8, maxLength: 8 },
  { key: 'OM', country: 'Oman', dial: '+968', minLength: 8, maxLength: 8 },
  { key: 'IL', country: 'Israel', dial: '+972', minLength: 9, maxLength: 9 },
  { key: 'JO', country: 'Jordan', dial: '+962', minLength: 9, maxLength: 9 },
  { key: 'EG', country: 'Egypt', dial: '+20', minLength: 10, maxLength: 10 },
  { key: 'MA', country: 'Morocco', dial: '+212', minLength: 9, maxLength: 9 },
  { key: 'ZA', country: 'South Africa', dial: '+27', minLength: 9, maxLength: 9 },
  { key: 'NG', country: 'Nigeria', dial: '+234', minLength: 10, maxLength: 10 },
  { key: 'GH', country: 'Ghana', dial: '+233', minLength: 9, maxLength: 9 },
  { key: 'KE', country: 'Kenya', dial: '+254', minLength: 9, maxLength: 10 },
  { key: 'TZ', country: 'Tanzania', dial: '+255', minLength: 9, maxLength: 9 },
  { key: 'UG', country: 'Uganda', dial: '+256', minLength: 9, maxLength: 9 },
  { key: 'ZM', country: 'Zambia', dial: '+260', minLength: 9, maxLength: 9 },
  { key: 'ZW', country: 'Zimbabwe', dial: '+263', minLength: 9, maxLength: 9 },
  { key: 'IN', country: 'India', dial: '+91', minLength: 10, maxLength: 10 },
  { key: 'PK', country: 'Pakistan', dial: '+92', minLength: 10, maxLength: 10 },
  { key: 'BD', country: 'Bangladesh', dial: '+880', minLength: 10, maxLength: 10 },
  { key: 'LK', country: 'Sri Lanka', dial: '+94', minLength: 9, maxLength: 9 },
  { key: 'NP', country: 'Nepal', dial: '+977', minLength: 10, maxLength: 10 },
  { key: 'TH', country: 'Thailand', dial: '+66', minLength: 9, maxLength: 9 },
  { key: 'SG', country: 'Singapore', dial: '+65', minLength: 8, maxLength: 8 },
  { key: 'MY', country: 'Malaysia', dial: '+60', minLength: 9, maxLength: 10 },
  { key: 'ID', country: 'Indonesia', dial: '+62', minLength: 9, maxLength: 11 },
  { key: 'PH', country: 'Philippines', dial: '+63', minLength: 10, maxLength: 10 },
  { key: 'VN', country: 'Vietnam', dial: '+84', minLength: 9, maxLength: 10 },
  { key: 'KH', country: 'Cambodia', dial: '+855', minLength: 9, maxLength: 9 },
  { key: 'LA', country: 'Laos', dial: '+856', minLength: 9, maxLength: 9 },
  { key: 'JP', country: 'Japan', dial: '+81', minLength: 9, maxLength: 10 },
  { key: 'KR', country: 'South Korea', dial: '+82', minLength: 9, maxLength: 10 },
  { key: 'CN', country: 'China', dial: '+86', minLength: 11, maxLength: 11 },
  { key: 'HK', country: 'Hong Kong', dial: '+852', minLength: 8, maxLength: 8 },
  { key: 'MO', country: 'Macau', dial: '+853', minLength: 8, maxLength: 8 },
  { key: 'TW', country: 'Taiwan', dial: '+886', minLength: 9, maxLength: 9 },
  { key: 'AU', country: 'Australia', dial: '+61', minLength: 9, maxLength: 9 },
  { key: 'NZ', country: 'New Zealand', dial: '+64', minLength: 9, maxLength: 9 }
];

export const INTEREST_OPTIONS = [
  'Travel',
  'Cooking',
  'Photography',
  'Pets',
  'Fitness',
  'Gaming',
  'Art & Design',
  'Movies',
  'Music',
  'Gardening',
  'Tech',
  'Foodie Tours'
];

export const MBTI_QUESTION_SETS = [
  {
    id: 'setA',
    title: 'Energy & Insight',
    questions: [
      {
        text:
          'After spending a lot of time socializing, do you usually feel more drained than energized?',
        yes: 'I',
        no: 'E'
      },
      {
        text:
          'When learning something new, do you prefer concrete facts and real-world examples over abstract theories and possibilities?',
        yes: 'S',
        no: 'N'
      },
      {
        text:
          'In decision-making, do you prioritize objective logic and fairness over how people feel about the outcome?',
        yes: 'T',
        no: 'F'
      },
      {
        text:
          'Do you feel more comfortable when life is structured, planned, and organized rather than left open-ended?',
        yes: 'J',
        no: 'P'
      }
    ]
  },
  {
    id: 'setB',
    title: 'World & Flow',
    questions: [
      {
        text:
          'Do you usually feel more energized by exploring the external world than by spending time in your own thoughts?',
        yes: 'E',
        no: 'I'
      },
      {
        text:
          'Are you more drawn to spotting patterns, meanings, and future possibilities than to focusing mainly on present realities?',
        yes: 'N',
        no: 'S'
      },
      {
        text:
          'Do you usually consider emotional impact and group harmony more important than strict logical consistency?',
        yes: 'F',
        no: 'T'
      },
      {
        text:
          'Do you prefer to keep your options open and adapt spontaneously instead of sticking to a fixed plan?',
        yes: 'P',
        no: 'J'
      }
    ]
  }
];

const buildUser = (overrides) => ({
  id: Date.now() + Math.random(),
  avatar: '🙂',
  username: 'echo_user',
  name: 'Echo User',
  age: 24,
  gender: 'Female',
  preference: 'Any',
  mbti: null,
  constellation: 'Virgo',
  interests: ['Travel', 'Coffee'],
  location: 'Bangkok',
  bio: 'Tell me about your favorite travel story.',
  signupMethod: 'phone',
  subscription: 'Free',
  ...overrides
});

export const FREE_USERS_NO_MBTI = [
  buildUser({
    avatar: '🦊',
    username: 'foxglow',
    name: 'Mika',
    age: 23,
    gender: 'Female',
    preference: 'Male',
    interests: ['Photography', 'Urban walks'],
    location: 'Taipei',
    bio: 'Street photographer chasing neon lights.'
  }),
  buildUser({
    avatar: '🐧',
    username: 'polarsteps',
    name: 'Rhea',
    age: 26,
    gender: 'Female',
    preference: 'Female',
    location: 'Melbourne',
    interests: ['Foodie Tours', 'Yoga'],
    bio: 'Plant mom + brunch addict.'
  })
];

export const FREE_USERS_WITH_MBTI = [
  buildUser({
    avatar: '🦁',
    username: 'leo_hiker',
    name: 'Kai',
    age: 28,
    gender: 'Male',
    preference: 'Female',
    mbti: 'ENTP',
    constellation: 'Leo',
    interests: ['Hiking', 'Tech', 'Board Games'],
    location: 'Singapore',
    bio: 'Weekend hikes and spicy food challenges.'
  }),
  buildUser({
    avatar: '🐼',
    username: 'zenpanda',
    name: 'Ava',
    age: 25,
    gender: 'Female',
    preference: 'Any',
    mbti: 'INFJ',
    constellation: 'Libra',
    interests: ['Meditation', 'Poetry', 'Indie films'],
    location: 'Seattle',
    bio: 'Quiet energy, loud playlists.'
  })
];

export const PREMIUM_USERS = [
  buildUser({
    avatar: '🐯',
    username: 'tigerwave',
    name: 'Noah',
    age: 29,
    gender: 'Male',
    preference: 'Female',
    mbti: 'ISTJ',
    subscription: 'Premium',
    location: 'Toronto',
    interests: ['Cycling', 'Coffee roasting'],
    bio: 'Engineer by day, latte artist by night.'
  })
];

export const INFINITY_USERS = [
  buildUser({
    avatar: '🦄',
    username: 'auroradust',
    name: 'Selene',
    age: 27,
    gender: 'Female',
    preference: 'Male',
    mbti: 'ENFP',
    subscription: 'Infinity',
    location: 'Los Angeles',
    interests: ['Festivals', 'Startups', 'Art installations'],
    bio: 'Building a kinder internet, one DM at a time.'
  })
];

// E Mall partner and product data
export const PARTNER_BRANDS = [
  {
    id: 1,
    name: "7-Eleven",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/7-eleven_logo.svg/200px-7-eleven_logo.svg.png",
    bg: "bg-white"
  },
  {
    id: 2,
    name: "Cafe Amazon",
    logo:
      "https://40esrdjz87r6cpqxzfyaiypaqlbsy6tt2qbivfhh85kyi0uoyn-h833788197.scf.usercontent.goog/image_9466de.png",
    bg: "bg-white"
  },
  {
    id: 3,
    name: "After You",
    logo:
      "https://40esrdjz87r6cpqxzfyaiypaqlbsy6tt2qbivfhh85kyi0uoyn-h833788197.scf.usercontent.goog/image_946a83.png",
    bg: "bg-white"
  },
  {
    id: 4,
    name: "Starbucks",
    logo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/200px-Starbucks_Corporation_Logo_2011.svg.png",
    bg: "bg-white"
  }
];

export const MORE_BRANDS_LIST = [
  {
    id: 1,
    name: "Cha Tra Mue",
    logo:
      "https://40esrdjz87r6cpqxzfyaiypaqlbsy6tt2qbivfhh85kyi0uoyn-h833788197.scf.usercontent.goog/image_946ae1.png"
  },
  {
    id: 2,
    name: "Kamu Tea",
    logo:
      "https://40esrdjz87r6cpqxzfyaiypaqlbsy6tt2qbivfhh85kyi0uoyn-h833788197.scf.usercontent.goog/image_946e01.png"
  },
  {
    id: 3,
    name: "Swensen's",
    logo:
      "https://40esrdjz87r6cpqxzfyaiypaqlbsy6tt2qbivfhh85kyi0uoyn-h833788197.scf.usercontent.goog/image_946e7e.png"
  },
  {
    id: 4,
    name: "Dairy Queen",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Dairy_Queen_logo.svg/1200px-Dairy_Queen_logo.svg.png"
  },
  {
    id: 5,
    name: "Potato Corner",
    logo:
      "https://40esrdjz87r6cpqxzfyaiypaqlbsy6tt2qbivfhh85kyi0uoyn-h833788197.scf.usercontent.goog/image_946ea4.jpg"
  },
  {
    id: 6,
    name: "Auntie Anne's",
    logo:
      "https://40esrdjz87r6cpqxzfyaiypaqlbsy6tt2qbivfhh85kyi0uoyn-h833788197.scf.usercontent.goog/image_9471a8.png"
  },
  {
    id: 7,
    name: "Krispy Kreme",
    logo:
      "https://40esrdjz87r6cpqxzfyaiypaqlbsy6tt2qbivfhh85kyi0uoyn-h833788197.scf.usercontent.goog/image_947201.png"
  },
  {
    id: 8,
    name: "KOI Thé",
    logo:
      "https://40esrdjz87r6cpqxzfyaiypaqlbsy6tt2qbivfhh85kyi0uoyn-h833788197.scf.usercontent.goog/image_947243.png"
  }
];

export const MALL_ITEMS = [
  {
    id: 1,
    name: "Starbucks Coffee Trio",
    price: "14.99$",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Amazon Tea Selection",
    price: "3.99$",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "7-Select Snacks Pack",
    price: "2.99$",
    image:
      "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Shaved Ice Dessert",
    price: "10$",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80"
  }
];
