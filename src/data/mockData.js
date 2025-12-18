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
    likes: 23,
    comments: [
      { id: 1, user: "Alice", text: "Wow, stunning view!" },
      { id: 2, user: "Bob", text: "Where is this exactly?" },
      { id: 3, user: "Nina", text: "Adding this to my bucket list." },
      { id: 4, user: "Jay", text: "Rooftop sunsets are undefeated." },
      { id: 5, user: "Cora", text: "Love the colors in this shot!" },
      { id: 6, user: "Sam", text: "Which hotel is this from?" },
      { id: 7, user: "Ivy", text: "Bangkok nights are magic." },
      { id: 8, user: "Moe", text: "Need this vibe ASAP." },
      { id: 9, user: "Luca", text: "Great composition." },
      { id: 10, user: "Rita", text: "Looks like a movie scene." },
      { id: 11, user: "Wei", text: "Wow just wow." },
      { id: 12, user: "Ben", text: "Saving this spot!" }
    ],
    shares: 4,
    isLiked: false
  },
  {
    id: 2,
    user: "Mia",
    avatar: "🐨",
    timestamp: Date.now() - 7200000,
    content:
      "I just wrapped up 'The Great Gatsby' and it's low-key amazing! The characters and the whole vibe are so memorable. 📚🧐 The symbolism of the green light is just hauntingly beautiful. Does anyone else feel like Gatsby was misunderstood?",
    tag: "#Reading",
    likes: 18,
    comments: [
      { id: 21, user: "Tom", text: "Classic for a reason." },
      { id: 22, user: "Lia", text: "Totally agree." },
      { id: 23, user: "Chen", text: "The ending still hurts." },
      { id: 24, user: "Rob", text: "Time for a re-read." },
      { id: 25, user: "Ana", text: "Gatsby deserved better." },
      { id: 26, user: "Vic", text: "Team Nick forever." },
      { id: 27, user: "Soo", text: "Love the prose." },
      { id: 28, user: "Iris", text: "What a vibe." },
      { id: 29, user: "Ben", text: "Movie adaptation thoughts?" },
      { id: 30, user: "Elle", text: "Same, obsessed now." },
      { id: 31, user: "Jan", text: "Symbolism on point." },
      { id: 32, user: "Raj", text: "Great pick!" }
    ],
    shares: 3,
    isLiked: true
  },
  {
    id: 3,
    user: "Noah",
    avatar: "🧋",
    timestamp: Date.now() - 5400000,
    content:
      "Quick matcha break between meetings. Anyone else obsessed with trying every cafe in town? ☕️🍵",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    likes: 17,
    comments: [
      { id: 33, user: "Jade", text: "Which cafe is this?!" },
      { id: 34, user: "Leo", text: "Matcha forever." },
      { id: 35, user: "Kim", text: "That cup is cute." },
      { id: 36, user: "Ming", text: "Need recs!" },
      { id: 37, user: "Ally", text: "Same addiction here." },
      { id: 38, user: "Dre", text: "Looks cozy." },
      { id: 39, user: "Ian", text: "Drop the address." },
      { id: 40, user: "Tia", text: "I’m in!" },
      { id: 41, user: "Sue", text: "That foam 😍" },
      { id: 42, user: "Max", text: "Great lighting." },
      { id: 43, user: "Rex", text: "Need a latte now." },
      { id: 44, user: "Nina", text: "Love this vibe." }
    ],
    shares: 2,
    isLiked: false
  },
  {
    id: 4,
    user: "Emma",
    avatar: "🎧",
    timestamp: Date.now() - 1800000,
    content:
      "Concert last night was unreal. The crowd singing in unison gave me chills. Music really is a shared language. 🎶",
    likes: 27,
    comments: [
      { id: 45, user: "Kai", text: "Who was performing?" },
      { id: 46, user: "Liam", text: "Totally agree!" },
      { id: 47, user: "Zoe", text: "Live music hits different." },
      { id: 48, user: "Rina", text: "Need concert recs!" },
      { id: 49, user: "Omar", text: "This energy!!" },
      { id: 50, user: "Jules", text: "What a night." },
      { id: 51, user: "Ella", text: "Share the setlist?" },
      { id: 52, user: "Tom", text: "Wish I was there." },
      { id: 53, user: "Ada", text: "Chills from here." },
      { id: 54, user: "Gus", text: "That crowd tho." },
      { id: 55, user: "Amy", text: "Saving for next time." },
      { id: 56, user: "Bo", text: "Music is magic." }
    ],
    shares: 4,
    isLiked: false
  },
  {
    id: 5,
    user: "Olivia",
    avatar: "🍜",
    timestamp: Date.now() - 2700000,
    content:
      "Made a new ramen recipe with miso + spicy chili oil and it SLAPS. Should I drop the recipe? 🍜🔥",
    likes: 32,
    comments: [
      { id: 57, user: "Sasha", text: "Yes please!" },
      { id: 58, user: "Leo", text: "That sounds amazing." },
      { id: 59, user: "Kim", text: "I’m hungry now." },
      { id: 60, user: "Wen", text: "Share the broth secrets!" },
      { id: 61, user: "Ivy", text: "Spicy miso is life." },
      { id: 62, user: "Mo", text: "Drop the recipe." },
      { id: 63, user: "Li", text: "Looks restaurant-level." },
      { id: 64, user: "Ken", text: "Can you meal prep it?" },
      { id: 65, user: "Ana", text: "Yum!" },
      { id: 66, user: "Jo", text: "Craving ramen now." },
      { id: 67, user: "Pia", text: "Spice it up!" },
      { id: 68, user: "Ray", text: "Teach me chef." }
    ],
    shares: 5,
    isLiked: true
  },
  {
    id: 6,
    user: "Ethan",
    avatar: "🏄‍♂️",
    timestamp: Date.now() - 900000,
    content:
      "Sunrise surf session ✅ Salt water + pink skies is the best combo. 🌅🏄‍♂️",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
    likes: 21,
    comments: [
      { id: 69, user: "Mia", text: "Dreamy!" },
      { id: 70, user: "Jay", text: "Take me with you." },
      { id: 71, user: "Rae", text: "What beach?" },
      { id: 72, user: "Sid", text: "Early bird gains." },
      { id: 73, user: "Tae", text: "Goals." },
      { id: 74, user: "Ren", text: "Love the colors." },
      { id: 75, user: "Max", text: "Epic shot." },
      { id: 76, user: "Oli", text: "Surf & sunrise = bliss." },
      { id: 77, user: "Lu", text: "So peaceful." },
      { id: 78, user: "Vic", text: "Teach me to surf!" },
      { id: 79, user: "Ari", text: "Beach therapy." },
      { id: 80, user: "Dee", text: "Love this!" }
    ],
    shares: 2,
    isLiked: false
  },
  {
    id: 7,
    user: "Zara",
    avatar: "📸",
    timestamp: Date.now() - 2500000,
    content:
      "Took a street photography walk today—captured some candid smiles and neon reflections. Cities never sleep.",
    likes: 19,
    comments: [
      { id: 81, user: "Jay", text: "Can we see the shots?" },
      { id: 82, user: "Kim", text: "Neon vibes!" },
      { id: 83, user: "Row", text: "Street photo is art." },
      { id: 84, user: "Nia", text: "Teach me your ways." },
      { id: 85, user: "Teo", text: "Love candid moments." },
      { id: 86, user: "Ona", text: "City nights 🔥" },
      { id: 87, user: "Eli", text: "Favorite lens?" },
      { id: 88, user: "Mac", text: "This is inspiring." },
      { id: 89, user: "Zed", text: "I need to go shoot." },
      { id: 90, user: "Ivy", text: "Sounds amazing." },
      { id: 91, user: "Leo", text: "Urban stories." },
      { id: 92, user: "Ana", text: "Share tips?" }
    ],
    shares: 3,
    isLiked: false
  },
  {
    id: 8,
    user: "Kai",
    avatar: "🥾",
    timestamp: Date.now() - 4100000,
    content:
      "Weekend hike conquered. 12km of trails, waterfalls, and zero cell signal. Exactly what I needed.",
    likes: 24,
    comments: [
      { id: 93, user: "Moe", text: "That sounds perfect." },
      { id: 94, user: "Eve", text: "Which trail?" },
      { id: 95, user: "Ron", text: "Waterfalls??" },
      { id: 96, user: "Ava", text: "Nature reset." },
      { id: 97, user: "Hal", text: "Proud of you!" },
      { id: 98, user: "Len", text: "Adding to my list." },
      { id: 99, user: "Pip", text: "Any tips?" },
      { id: 100, user: "Ira", text: "Sounds epic." },
      { id: 101, user: "Rae", text: "Love a good hike." },
      { id: 102, user: "Ana", text: "So jealous." },
      { id: 103, user: "Dee", text: "Go you!" },
      { id: 104, user: "Tia", text: "Trail recs pls." }
    ],
    shares: 2,
    isLiked: false
  },
  {
    id: 9,
    user: "Liam",
    avatar: "🎨",
    timestamp: Date.now() - 6500000,
    content:
      "Painted for the first time in months. Messy hands, clear mind. Art therapy is real.",
    likes: 29,
    comments: [
      { id: 105, user: "Mia", text: "Show the painting!" },
      { id: 106, user: "Oli", text: "Love that feeling." },
      { id: 107, user: "Ren", text: "Art heals." },
      { id: 108, user: "Kay", text: "What did you paint?" },
      { id: 109, user: "Tim", text: "Inspired." },
      { id: 110, user: "Zoe", text: "Colors you used?" },
      { id: 111, user: "Ari", text: "Need to try this." },
      { id: 112, user: "Han", text: "Proud of you." },
      { id: 113, user: "Dee", text: "Art therapy is real." },
      { id: 114, user: "Pat", text: "Messy is fun." },
      { id: 115, user: "Ian", text: "Keep creating." },
      { id: 116, user: "Una", text: "Love it." }
    ],
    shares: 3,
    isLiked: false
  },
  {
    id: 10,
    user: "Sara",
    avatar: "🍃",
    timestamp: Date.now() - 3200000,
    content:
      "Tried a 10-minute morning meditation this week and it actually made me calmer through the day. Anyone else seeing results?",
    likes: 22,
    comments: [
      { id: 117, user: "Eli", text: "It works for me too." },
      { id: 118, user: "Moe", text: "Need to be consistent." },
      { id: 119, user: "Wen", text: "Best habit ever." },
      { id: 120, user: "Hal", text: "Which app?" },
      { id: 121, user: "Ivy", text: "Totally agree." },
      { id: 122, user: "Jay", text: "Morning calm is real." },
      { id: 123, user: "Vic", text: "Trying this now." },
      { id: 124, user: "Ana", text: "Thanks for sharing." },
      { id: 125, user: "Bo", text: "Meditation = focus." },
      { id: 126, user: "Tia", text: "Love this reminder." },
      { id: 127, user: "Raj", text: "10 minutes is doable." },
      { id: 128, user: "Uma", text: "Need to start!" }
    ],
    shares: 2,
    isLiked: false
  }
];

export const GAMES_LIST = [
  {
    id: 'xo',
    name: 'XO Blitz',
    desc: 'Quick-fire tic tac toe battles for two players.',
    difficulty: 2,
    icon: '❌⭕'
  },
  {
    id: 'chess',
    name: 'Chess Duel',
    desc: 'Traditional chess board for a thoughtful duel.',
    difficulty: 5,
    icon: '♟️'
  }
];

export const GARDEN_THEMES = [
  {
    id: 'meadow',
    name: 'Sunny Meadow',
    climate: 'Mild Breeze',
    perks: 'Boosts seed growth by 5%',
    image: '/gardens/sunny-meadow.png'
  },
  {
    id: 'sunset',
    name: 'Sunset Grove',
    climate: 'Tropical Warmth',
    perks: 'Doubles evening harvest points',
    image: '/gardens/sunset-grove.png'
  },
  {
    id: 'castle',
    name: 'Castle Atrium',
    climate: 'Cool Shade',
    perks: 'Unlocks rare herbs in quests',
    image: '/gardens/castle-atrium.png'
  },
  {
    id: 'shore',
    name: 'Shoreline Oasis',
    climate: 'Sea Breeze',
    perks: 'Watering cooldown reduced by 50%',
    image: '/gardens/shoreline-oasis.png'
  }
];

export const DAILY_GARDEN_TASKS = [
  'Harvest any flower together',
  'Send 5 drops of water to your partner',
  'Visit the seed shop and buy a new seed',
  'Take a photo of today\'s blooms and share it',
  'Write an entry in the growth log'
];

export const REDEEM_REQUIREMENTS = [
  {
    tier: 'Free',
    points: 1000,
    unique: 10,
    relationship: 8
  },
  {
    tier: 'Premium',
    points: 800,
    unique: 8,
    relationship: 6
  },
  {
    tier: 'Infinity',
    points: 500,
    unique: 5,
    relationship: 5
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
    id: "clicksol-ai",
    name: "Clicksol AI",
    isAI: true,
    msg: "Always here to chat",
    time: "",
    avatar: "🤖",
    unread: 0
  },
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
      "Daily Match Recommendations: 5",
      "Daily Likes Limit: 10",
      "See Who Liked You: Not available",
      "Chatting: Only after mutual match/like",
      "Profile Exposure: Standard ranking",
      "Match Filters: Basic (MBTI, Zodiac sign, age, gender, location)",
      "Avatar / Voice Customization: Basic set",
      "Plant Appearance / Decoration: Basic green plant with standard pot",
      "Interaction Continuity: Water once per day; growth pauses if either side is inactive for 3 days",
      "Relationship Insights: Not available",
      "Ad-Free Experience: None",
      "Automatic Translation: Thai & English only",
      "AI Chatbot Chatting Aid: 5 times"
    ]
  },
  {
    name: "Premium",
    color: "bg-gradient-to-b from-purple-50 to-[#E0D9FF]",
    textColor: "text-[#5F48E6]",
    btnColor: "bg-[#5F48E6]",
    features: [
      "Daily Match Recommendations: 15",
      "Daily Likes Limit: 30",
      "See Who Liked You: View top 10 users",
      "Chatting: 1 follow-up message if unreplied",
      "Profile Exposure: 1 weekly Boost",
      "Match Filters: +6 advanced filters (education, lifestyle, values, etc.)",
      "Avatar / Voice Customization: Unlock premium themes & voices",
      "Plant Appearance / Decoration: Unlock rare plant styles and colorful pots",
      "Interaction Continuity: Water twice per day with 20% faster growth; includes 1 Pause Protection per plant",
      "Relationship Insights: View basic activity / match rate",
      "Ad-Free Experience: Partial",
      "Automatic Translation: All supported languages",
      "AI Chatbot Chatting Aid: 15 times"
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
      "Daily Match Recommendations: Unlimited",
      "Daily Likes Limit: Unlimited + priority likes",
      "See Who Liked You: View all in real-time",
      "Chatting: Read receipts + priority inbox",
      "Profile Exposure: 3 weekly Boosts + Top Placement",
      "Match Filters: All filters + AI filter suggestions",
      "Avatar / Voice Customization: All exclusive effects (e.g., glow border)",
      "Plant Appearance / Decoration: Exclusive glowing pots, animated growth effects, themed visual evolutions",
      "Interaction Continuity: Unlimited watering with double growth speed + auto protection; gentle reminders encourage reconnection",
      "Relationship Insights: Full AI report + compatibility advice",
      "Ad-Free Experience: Yes",
      "Automatic Translation: All supported languages",
      "AI Chatbot Chatting Aid: Unlimited"
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
  subscriptionIndex: 0,
  points: 800,
  coupons: [],
  profile: {
    displayName: 'Echo Friend',
    age: '24',
    gender: 'Not shared',
    education: '—',
    hobbies: ['Travel'],
    agePreference: 'Any',
    location: 'Bangkok, Thailand'
  },
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
    bio: 'Street photographer chasing neon lights.',
    profile: {
      displayName: 'Mika Chen',
      age: '23',
      gender: 'Female',
      education: "Bachelor's in Media Arts",
      hobbies: ['Street photography', 'Analog cameras', 'Night runs'],
      agePreference: '24-30',
      location: 'Taipei, Taiwan'
    }
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
    bio: 'Plant mom + brunch addict.',
    profile: {
      displayName: 'Rhea Patel',
      age: '26',
      gender: 'Female',
      education: "Master's in Nutrition",
      hobbies: ['Yoga', 'Plant-based cooking', 'Cafe hopping'],
      agePreference: '25-33',
      location: 'Melbourne, Australia'
    }
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
    bio: 'Weekend hikes and spicy food challenges.',
    profile: {
      displayName: 'Kai Lim',
      age: '28',
      gender: 'Male',
      education: "Bachelor's in Engineering",
      hobbies: ['Mountain hiking', 'Matcha brewing', 'Retro games'],
      agePreference: '25-32',
      location: 'Singapore'
    }
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
    bio: 'Quiet energy, loud playlists.',
    profile: {
      displayName: 'Ava Shores',
      age: '25',
      gender: 'Female',
      education: "Bachelor's in Literature",
      hobbies: ['Meditation', 'Poetry slams', 'Vinyl collecting'],
      agePreference: '24-34',
      location: 'Seattle, USA'
    }
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
    bio: 'Engineer by day, latte artist by night.',
    profile: {
      displayName: 'Noah Reeves',
      age: '29',
      gender: 'Male',
      education: "Master's in Mechanical Engineering",
      hobbies: ['Cycling', 'Coffee roasting', 'DIY gadgets'],
      agePreference: '26-34',
      location: 'Toronto, Canada'
    }
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
    bio: 'Building a kinder internet, one DM at a time.',
    profile: {
      displayName: 'Selene Park',
      age: '27',
      gender: 'Female',
      education: "Bachelor's in International Business",
      hobbies: ['Music festivals', 'Startup meetups', 'Art fairs'],
      agePreference: '27-37',
      location: 'Los Angeles, USA'
    }
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
    logo: "/logos/cafe_amazon-logo.svg",
    bg: "bg-white"
  },
  {
    id: 3,
    name: "After You",
    logo: "/logos/after_you-logo.png",
    bg: "bg-white"
  },
  {
    id: 4,
    name: "Starbucks",
    logo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/200px-Starbucks_Corporation_Logo_2011.svg.png",
    bg: "bg-white"
  },
  {
    id: 5,
    name: "Fitness First",
    logo: "/logos/fitness-first-logo.png",
    bg: "bg-white"
  }
];

export const MORE_BRANDS_LIST = [
  {
    id: 1,
    name: "Cha Tra Mue",
    logo: "/logos/cha_tra_mue-logo.png"
  },
  {
    id: 2,
    name: "Kamu Tea",
    logo: "/logos/kamu_tea-logo.png"
  },
  {
    id: 3,
    name: "Swensen's",
    logo: "/logos/swensens-logo.png"
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
    logo: "/logos/potato_corner-logo.png"
  },
  {
    id: 6,
    name: "Auntie Anne's",
    logo: "/logos/auntie_annes-logo.png"
  },
  {
    id: 7,
    name: "Krispy Kreme",
    logo: "/logos/krispy_kreme_logo.png"
  },
  {
    id: 8,
    name: "KOI Thé",
    logo: "/logos/koi-the-logo.webp"
  },
  {
    id: 9,
    name: "Jetts Fitness",
    logo: "/logos/Jetts-Black-logo.png"
  },
  {
    id: 10,
    name: "Virgin Active",
    logo: "/logos/Virgin_Active-logo.png"
  },
  {
    id: 12,
    name: "Apex Medical Center",
    logo: "/logos/APEX-logo.png"
  },
  {
    id: 13,
    name: "Nitipon Clinic",
    logo: "/logos/Nitipon_Clinic-logo.png"
  }
];

export const MALL_ITEMS = [
  {
    id: 1,
    brand: 'Starbucks',
    name: 'Starbucks Coffee Trio',
    shortDescription: 'Redeem two grande handcrafted drinks.',
    description:
      'Enjoy any two grande-sized handcrafted beverages at participating Starbucks Thailand stores. Perfect for an afternoon coffee date.',
    tierAccess: ['Free', 'Premium', 'Infinity'],
    points: {
      Free: 450,
      Premium: 360,
      Infinity: 300
    },
    validUntil: 'Available through 30 Jun 2025',
    location: 'All Starbucks Thailand locations',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
    terms: [
      'Coupon must be redeemed in person with linked Echo ID.',
      'Not valid with other promotions or double-discount campaigns.',
      'Maximum of 1 redemption per partner pair per week.'
    ]
  },
  {
    id: 2,
    brand: 'Cafe Amazon',
    name: 'Amazon Tea Selection',
    shortDescription: 'Iced tea flight for adventurous duos.',
    description:
      'Mix and match two Cafe Amazon signature iced teas or coffees. Premium foam toppings included at no extra poin cost.',
    tierAccess: ['Premium', 'Infinity'],
    points: {
      Premium: 280,
      Infinity: 220
    },
    validUntil: 'Valid until 31 Aug 2025',
    location: 'All Cafe Amazon Thailand cafés',
    image:
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80',
    terms: [
      'Premium or Infinity membership is required.',
      'Redeemable Monday–Friday only.',
      'Exchange for two drinks valued at ≤ THB 150 each.'
    ]
  },
  {
    id: 3,
    brand: '7-Eleven',
    name: '7-Select Snacks Pack',
    shortDescription: 'Choose any 4 snack favourites in store.',
    description:
      'Grab four 7-Select snacks (chips, dried fruits, cookies, or nuts) from any 7-Eleven nationwide. Great for road trips or midnight cravings.',
    tierAccess: ['Free', 'Premium', 'Infinity'],
    points: {
      Free: 260,
      Premium: 210,
      Infinity: 180
    },
    validUntil: 'Redeem by 15 Jul 2025',
    location: '7-Eleven Thailand – all branches',
    image:
      'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80',
    terms: [
      'Limited to snack SKUs priced ≤ THB 40 each.',
      'Non-refundable once redeemed.',
      'Barcode provided inside Echo must be shown at cashier.'
    ]
  },
  {
    id: 4,
    brand: 'After You',
    name: 'Shibuya Dessert Date',
    shortDescription: 'Share a signature Shibuya honey toast.',
    description:
      'Treat yourselves to a full-size Shibuya honey toast with selected toppings plus two drinks at After You Dessert Café.',
    tierAccess: ['Infinity'],
    points: {
      Infinity: 180
    },
    validUntil: 'Weekends only · 1 Sep – 31 Dec 2025',
    location: 'Participating After You Dessert Café branches',
    image:
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80',
    terms: [
      'Infinity tier exclusive reward.',
      'Limited to first 300 redemptions per month.',
      'Dine-in only.'
    ]
  },
  {
    id: 5,
    brand: 'Fitness First',
    name: '1-Week All Access Pass',
    shortDescription: 'Unlimited classes and gym access for 7 days.',
    description:
      'Try Fitness First with a 7-day pass that includes group classes, weights, cardio zones, and locker access. Available at select Thailand clubs.',
    tierAccess: ['Premium', 'Infinity'],
    points: {
      Premium: 420,
      Infinity: 320
    },
    validUntil: 'Valid 60 days from redemption',
    location: 'Selected Fitness First Thailand clubs',
    image:
      'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Activate in person with a valid ID.',
      'First-time visitors only; non-transferable.',
      'Class bookings subject to availability.'
    ]
  },
  {
    id: 6,
    brand: 'Jetts Fitness',
    name: '3-Day Anytime Access',
    shortDescription: '24/7 gym access at participating Jetts clubs.',
    description:
      'Enjoy three consecutive days of training at Jetts Fitness with 24/7 access to weights, cardio, and functional zones.',
    tierAccess: ['Free', 'Premium', 'Infinity'],
    points: {
      Free: 260,
      Premium: 210,
      Infinity: 170
    },
    validUntil: 'Redeem by 30 Sep 2025',
    location: 'Jetts Fitness Thailand locations',
    image:
      'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Valid for 3 consecutive days after first entry.',
      'Must present Echo coupon and photo ID.',
      'Not combinable with intro offers.'
    ]
  },
  {
    id: 7,
    brand: 'Virgin Active',
    name: 'Signature Class Drop-In',
    shortDescription: 'Redeem one premium group class (Reformer/GRID).',
    description:
      'Choose one Virgin Active premium class (Reformer Pilates, GRID, or Cycle) at participating clubs. Includes towel service.',
    tierAccess: ['Infinity'],
    points: {
      Infinity: 280
    },
    validUntil: 'Valid for 45 days post-redeem',
    location: 'Virgin Active Bangkok clubs',
    image:
      'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Advance booking required; limited slots.',
      'One class per member per month.',
      'Late cancellation policy may apply.'
    ]
  },
  {
    id: 9,
    brand: 'Apex Medical Center',
    name: 'Hydrafacial Glow',
    shortDescription: 'Signature hydrafacial treatment session.',
    description:
      'Redeem one hydrafacial session at Apex Medical Center for deep cleanse, hydration, and glow.',
    tierAccess: ['Infinity'],
    points: {
      Infinity: 520
    },
    validUntil: 'Expires 90 days from redemption',
    location: 'Participating Apex Medical Center clinics',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Infinity members only.',
      'Appointment required; 24h cancellation policy.',
      'Not valid with other promos.'
    ]
  },
  {
    id: 10,
    brand: 'Nitipon Clinic',
    name: 'Brightening Peel Duo',
    shortDescription: 'Two-session brightening peel package.',
    description:
      'Enjoy two sessions of gentle brightening peel with post-care guidance at Nitipon Clinic.',
    tierAccess: ['Premium', 'Infinity'],
    points: {
      Premium: 480,
      Infinity: 390
    },
    validUntil: 'Valid until 31 Dec 2025',
    location: 'Selected Nitipon Clinic branches',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Two sessions must be used within 30 days.',
      'Consultation required before first treatment.',
      'Not suitable for certain skin conditions; clinic discretion applies.'
    ]
  },
  {
    id: 11,
    brand: 'Cha Tra Mue',
    name: 'Thai Tea Lovers Set',
    shortDescription: 'Two signature Thai milk teas with toppings.',
    description:
      'Redeem two large Cha Tra Mue Thai milk teas with your choice of boba or grass jelly. Perfect for sharing a classic Thai treat.',
    tierAccess: ['Free', 'Premium', 'Infinity'],
    points: {
      Free: 240,
      Premium: 190,
      Infinity: 160
    },
    validUntil: 'Valid until 31 Oct 2025',
    location: 'Cha Tra Mue Thailand branches',
    image:
      'https://images.unsplash.com/photo-1527169402691-feff5539e52c?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Includes standard toppings only.',
      'One redemption per day per account.',
      'Show coupon barcode at cashier.'
    ]
  },
  {
    id: 12,
    brand: 'Kamu Tea',
    name: 'Signature Brown Sugar Pair',
    shortDescription: 'Two brown sugar milk teas with pearls.',
    description:
      'Enjoy two Kamu Tea brown sugar milk teas with freshly cooked pearls. Ice and sugar level adjustable.',
    tierAccess: ['Premium', 'Infinity'],
    points: {
      Premium: 220,
      Infinity: 180
    },
    validUntil: 'Redeem by 30 Sep 2025',
    location: 'Kamu Tea Thailand stores',
    image:
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Up to large size; custom toppings not included.',
      'Cannot be combined with other promotions.',
      'Redeem in person only.'
    ]
  },
  {
    id: 13,
    brand: "Swensen's",
    name: 'Double Sundae Treat',
    shortDescription: 'Two classic sundaes of your choice.',
    description:
      'Pick any two classic sundaes at Swensen’s Thailand. Choose your favorite flavors and toppings for a sweet date.',
    tierAccess: ['Free', 'Premium', 'Infinity'],
    points: {
      Free: 320,
      Premium: 260,
      Infinity: 210
    },
    validUntil: 'Valid through 31 Dec 2025',
    location: "Swensen's Thailand branches",
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Excludes premium/limited-time sundaes over THB 189.',
      'Dine-in only.',
      'One redemption per coupon.'
    ]
  },
  {
    id: 14,
    brand: 'Dairy Queen',
    name: 'Blizzard Buddy Pack',
    shortDescription: 'Two medium Blizzards any flavor.',
    description:
      'Cool off with two medium Blizzards of any standard flavor at participating Dairy Queen Thailand locations.',
    tierAccess: ['Free', 'Premium', 'Infinity'],
    points: {
      Free: 210,
      Premium: 170,
      Infinity: 140
    },
    validUntil: 'Valid 45 days from redemption',
    location: 'Dairy Queen Thailand',
    image:
      'https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Add-ons/toppings charged separately.',
      'Not valid with buy-one-get-one promos.',
      'Show coupon barcode before ordering.'
    ]
  },
  {
    id: 15,
    brand: 'Potato Corner',
    name: 'Fries Feast',
    shortDescription: 'Two jumbo flavored fries + drink combo.',
    description:
      'Grab two jumbo flavored fries (any flavor) plus two soft drinks at Potato Corner. Shareable snack for movie nights.',
    tierAccess: ['Free', 'Premium', 'Infinity'],
    points: {
      Free: 230,
      Premium: 190,
      Infinity: 150
    },
    validUntil: 'Redeem by 31 Oct 2025',
    location: 'Potato Corner Thailand kiosks',
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Valid for jumbo size only.',
      'Additional toppings not included.',
      'One coupon per transaction.'
    ]
  },
  {
    id: 16,
    brand: "Auntie Anne's",
    name: 'Pretzel Date Combo',
    shortDescription: 'Two pretzels + two lemonades.',
    description:
      'Choose any two classic pretzels and two 16oz lemonades at Auntie Anne’s Thailand. Perfect for a quick bite together.',
    tierAccess: ['Free', 'Premium', 'Infinity'],
    points: {
      Free: 250,
      Premium: 200,
      Infinity: 170
    },
    validUntil: 'Valid until 31 Dec 2025',
    location: "Auntie Anne's Thailand",
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Excludes premium pretzels.',
      'No cash value; non-refundable.',
      'Show coupon at counter before paying.'
    ]
  },
  {
    id: 17,
    brand: 'Krispy Kreme',
    name: 'Dozen Sharing Box',
    shortDescription: 'One dozen assorted doughnuts.',
    description:
      'Redeem one dozen assorted Krispy Kreme doughnuts (standard range) to share the sweetness.',
    tierAccess: ['Premium', 'Infinity'],
    points: {
      Premium: 360,
      Infinity: 300
    },
    validUntil: 'Use within 30 days of redemption',
    location: 'Krispy Kreme Thailand stores',
    image:
      'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Excludes limited/seasonal doughnuts.',
      'Not combinable with other offers.',
      'One box per coupon.'
    ]
  },
  {
    id: 18,
    brand: 'KOI Thé',
    name: 'Bubble Tea Duo',
    shortDescription: 'Two medium bubble teas, any standard flavor.',
    description:
      'Mix and match two KOI Thé medium bubble teas with standard toppings. Ice/sugar customization included.',
    tierAccess: ['Free', 'Premium', 'Infinity'],
    points: {
      Free: 220,
      Premium: 180,
      Infinity: 150
    },
    validUntil: 'Valid 60 days from redemption',
    location: 'KOI Thé Thailand locations',
    image:
      'https://images.unsplash.com/photo-1542834369-f10ebf06d3e0?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Premium toppings charged separately.',
      'Maximum one coupon per visit.',
      'Not valid for delivery.'
    ]
  },
  {
    id: 19,
    brand: 'Jetts Fitness',
    name: 'Buddy Pass',
    shortDescription: 'Bring a friend for one training session.',
    description:
      'Access Jetts Fitness with a friend for one training session. Includes use of weights, cardio, and stretching areas.',
    tierAccess: ['Free', 'Premium', 'Infinity'],
    points: {
      Free: 150,
      Premium: 120,
      Infinity: 100
    },
    validUntil: 'Redeem by 30 Nov 2025',
    location: 'Jetts Fitness Thailand clubs',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Both guests must check in together.',
      'One buddy pass per member per month.',
      'Valid for staffed hours only.'
    ]
  },
  {
    id: 20,
    brand: 'Virgin Active',
    name: 'Wellness Day Pass',
    shortDescription: 'Full-day access + one standard class.',
    description:
      'Enjoy a full day at Virgin Active with gym floor access, pool/sauna where available, plus one standard group class.',
    tierAccess: ['Premium', 'Infinity'],
    points: {
      Premium: 420,
      Infinity: 340
    },
    validUntil: 'Valid for 30 days after redemption',
    location: 'Virgin Active Bangkok clubs',
    image:
      'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Class booking required; subject to availability.',
      'Bring a government ID for entry.',
      'Not valid with other trials.'
    ]
  },
  {
    id: 21,
    brand: 'Apex Medical Center',
    name: 'Laser Hair Removal Trial',
    shortDescription: 'One small-area laser hair removal session.',
    description:
      'Try a single-session laser hair removal for a small area at Apex Medical Center with professional technicians.',
    tierAccess: ['Premium', 'Infinity'],
    points: {
      Premium: 420,
      Infinity: 330
    },
    validUntil: 'Redeem within 45 days',
    location: 'Apex Medical Center clinics',
    image:
      'https://images.unsplash.com/photo-1556228721-6891f9b5cde5?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Consultation required before treatment.',
      'Not combinable with other aesthetic promos.',
      'One trial per user.'
    ]
  },
  {
    id: 22,
    brand: 'Nitipon Clinic',
    name: 'Facial Rejuvenation Mask',
    shortDescription: 'Soothing clinic-grade facial mask session.',
    description:
      'Enjoy a relaxing clinic-grade facial mask session targeting hydration and glow at Nitipon Clinic.',
    tierAccess: ['Free', 'Premium', 'Infinity'],
    points: {
      Free: 260,
      Premium: 210,
      Infinity: 180
    },
    validUntil: 'Valid through 31 Jan 2026',
    location: 'Selected Nitipon Clinic branches',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80',
    terms: [
      'Appointment required; subject to slot availability.',
      'Not suitable for acute skin conditions.',
      'Show coupon at reception before service.'
    ]
  }
];
