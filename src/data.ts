import { Game, StoreItem, Streamer, ForumThread, Tournament } from './types';

// Let's reference our generated images directly
export const CYBER_RPG_COVER = '/src/assets/images/cyber_rpg_cover_1779693822179.png';
export const MECH_WAR_COVER = '/src/assets/images/mech_war_cover_1779693843660.png';
export const RACING_HERO = '/src/assets/images/gaming_hero_banner_1779693796641.png';

export const GAMES_DATA: Game[] = [
  {
    id: 'cyberpunk-neon',
    title: 'Cyberpunk: Neon Void',
    genre: 'Action RPG',
    rating: 4.8,
    price: 59.99,
    releaseDate: '2026-04-12',
    coverUrl: CYBER_RPG_COVER,
    description: 'Immerse yourself in a rain-slicked metropolis where neon glows hide cybernetic corporate conspiracies. Choose your neural implants, hack massive data hubs, and carve your own legend.',
    tags: ['Cyberpunk', 'Open World', 'RPG', 'Sci-Fi'],
    specs: {
      cpu: 'Intel Core i7-12700K or AMD Ryzen 7 5800X',
      gpu: 'NVIDIA RTX 4070 or AMD Radeon RX 7800 XT',
      ram: '16 GB RAM',
      storage: '80 GB SSD'
    },
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    popularity: 98
  },
  {
    id: 'metal-combat',
    title: 'Metal Combat: Hangar 9',
    genre: 'Tactical Mech Melee',
    rating: 4.7,
    price: 49.99,
    releaseDate: '2026-02-28',
    coverUrl: MECH_WAR_COVER,
    description: 'Pilot customizable heavy armored titans equipped with volumetric plasma cannons. Experience chaotic warehouse siege defense runs and direct physical melee showdowns.',
    tags: ['Mech Fighter', 'Tactical', 'Action', 'Destruction'],
    specs: {
      cpu: 'Intel Core i5-11400F or AMD Ryzen 5 3600',
      gpu: 'NVIDIA RTX 3060 or AMD Radeon RX 6600 XT',
      ram: '12 GB RAM',
      storage: '60 GB SSD'
    },
    trailerUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    popularity: 92
  },
  {
    id: 'synth-racer',
    title: 'Neon Speedster: Synth Loop',
    genre: 'Synthwave Racing',
    rating: 4.9,
    price: 29.99,
    releaseDate: '2025-11-15',
    coverUrl: RACING_HERO,
    description: 'Race supersonic retro-futuristic vehicles across anti-gravity magnetic tracks. Drift dynamically to a pounding synthwave beat and trigger absolute hyperspeed nitro charges.',
    tags: ['Arcade Racing', 'Synthwave', 'Co-op', 'Anti-gravity'],
    specs: {
      cpu: 'Intel Core i3-10100 or AMD Ryzen 3 3100',
      gpu: 'NVIDIA GTX 1660 Super or AMD RX 5500 XT',
      ram: '8 GB RAM',
      storage: '25 GB HDD/SSD'
    },
    trailerUrl: 'https://www.w3schools.com/html/movie.mp4',
    popularity: 95
  },
  {
    id: 'deep-space',
    title: 'Cosmic Drift: Infinite Dust',
    genre: 'Space Simulator',
    rating: 4.5,
    price: 39.99,
    releaseDate: '2026-05-10',
    coverUrl: 'https://picsum.photos/seed/cosmic/600/450',
    description: 'Command custom starfighters across hyper-detailed asteroid belts, trading nebulas, and stellar black holes. Perfect Newtonian space flight controls paired with rich mining mechanics.',
    tags: ['Space', 'Simulator', 'Sandbox', 'Exploration'],
    specs: {
      cpu: 'Intel Core i5-12600 or AMD Ryzen 5 5600X',
      gpu: 'NVIDIA RTX 3070 or AMD RX 6700 XT',
      ram: '16 GB RAM',
      storage: '40 GB SSD'
    },
    trailerUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    popularity: 88
  }
];

export const STORE_DATA: StoreItem[] = [
  {
    id: 'glow-mouse',
    title: 'HyperGlow Neon Gaming Mouse',
    category: 'hardware',
    price: 79.99,
    originalPrice: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60',
    rating: 4.8,
    isHot: true,
    description: 'Unparalleled precision tracking at 26,000 DPI with dynamic reactive under-mount smart neon LED bands.'
  },
  {
    id: 'laser-kb',
    title: 'Apex Mechanical Neon Keyboard',
    category: 'hardware',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60',
    rating: 4.9,
    isHot: true,
    description: 'Hot-swappable tactile linear blue switches nestled inside a glowing aircraft-grade aluminum casing.'
  },
  {
    id: 'pro-headset',
    title: 'Hologram-7 Spatial Audio Headset',
    category: 'hardware',
    price: 129.99,
    originalPrice: 159.99,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60',
    rating: 4.6,
    description: 'Immersive spatial object audio tracking, featuring plush memory foam cups with RGB customized matrix panels.'
  },
  {
    id: 'hacker-hoodie',
    title: 'Nexus Hacker Stealth Hoodie',
    category: 'apparel',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60',
    rating: 4.7,
    description: 'Double-woven jet black heavy cotton threads featuring ultraviolet cyber-glyph embroidered reflective details.'
  },
  {
    id: 'elite-jersey',
    title: 'Gaming Hub Pro esports Jersey',
    category: 'apparel',
    price: 45.00,
    imageUrl: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500&auto=format&fit=crop&q=60',
    rating: 4.5,
    description: 'Highly breathable quick-dry jersey with official fluorescent sponsorship neon badge linings.'
  },
  {
    id: 'game-vip-pass',
    title: 'Gaming Hub VIP Lifetime Pass',
    category: 'membership',
    price: 199.99,
    originalPrice: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&auto=format&fit=crop&q=60',
    rating: 4.9,
    isHot: true,
    description: 'Absolute access to all future DLC keys, private discord developer alphas, and premium weekly store coupons.'
  }
];

export const STREAMERS_DATA: Streamer[] = [
  {
    id: 'twitch-1',
    name: 'Valkyria_XP',
    game: 'Cyberpunk: Neon Void',
    viewers: 12400,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    isLive: true,
    streamTitle: 'CHALLENGE! Max Difficulty Neural Hacker Run-Through'
  },
  {
    id: 'twitch-2',
    name: 'Shogun_Rider',
    game: 'Neon Speedster: Synth Loop',
    viewers: 8930,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isLive: true,
    streamTitle: 'TRACK RECORD GRIND - anti-grav loops with subscribers'
  },
  {
    id: 'twitch-3',
    name: 'MechMasterPrime',
    game: 'Metal Combat: Hangar 9',
    viewers: 5120,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    isLive: true,
    streamTitle: 'Hangar 9 Defense Build setup (Customizing plasma cannons)'
  }
];

export const FORUM_THREADS: ForumThread[] = [
  {
    id: 'thread-1',
    title: 'How to bypass the secure server terminal in District 4? (Cyberpunk Void)',
    author: 'Zero_Cool',
    replies: 42,
    likes: 189,
    category: 'Cyberpunk: Neon Void',
    timeAgo: '2 hours ago'
  },
  {
    id: 'thread-2',
    title: 'Metal Combat update v1.4 discussion: Cannon buffs feel slightly overtuned',
    author: 'ShieldWall_00',
    replies: 58,
    likes: 124,
    category: 'Metal Combat: Hangar 9',
    timeAgo: '5 hours ago'
  },
  {
    id: 'thread-3',
    title: 'Official Community Tournament: Season 4 Grid Racing Signups Are Open!',
    author: 'Mod_Chronos',
    replies: 112,
    likes: 354,
    category: 'Tournaments',
    timeAgo: '1 day ago'
  },
  {
    id: 'thread-4',
    title: 'Post your custom mechanical keyboard neon lighting setups here',
    author: 'KeebLoverRGB',
    replies: 231,
    likes: 612,
    category: 'Hardware',
    timeAgo: '3 days ago'
  }
];

export const TOURNAMENTS_DATA: Tournament[] = [
  {
    id: 'tour-1',
    title: 'Synth Loop Pro Cup Season 4',
    game: 'Neon Speedster: Synth Loop',
    prizePool: '$15,000 USD',
    date: 'June 5, 2026',
    teamsCount: 28,
    maxTeams: 32,
    status: 'upcoming'
  },
  {
    id: 'tour-2',
    title: 'District 4 Hackathon Siege',
    game: 'Cyberpunk: Neon Void',
    prizePool: '$10,000 USD',
    date: 'Ongoing',
    teamsCount: 16,
    maxTeams: 16,
    status: 'ongoing'
  },
  {
    id: 'tour-3',
    title: 'Iron Goliath Arena Championship',
    game: 'Metal Combat: Hangar 9',
    prizePool: '$25,000 USD',
    date: 'May 20, 2026',
    teamsCount: 64,
    maxTeams: 64,
    status: 'completed'
  }
];

export const FAQS_DATA = [
  {
    question: 'How do I redeem purchased digital CD keys?',
    answer: 'Once your transaction completes, your instant key voucher is generated inside the "Store" checkout screen and also synced directly with your "Gaming Dashboard" under the Game Keys inventory tab.'
  },
  {
    question: 'Are my systemic specs fully compatible with Cyberpunk: Neon Void?',
    answer: 'You can run your diagnostic evaluation using our automated system specs tracker on the "Games" or "Support" pages. We will verify your available graphics card capabilities, ram capacity, and central processing unit power.'
  },
  {
    question: 'Can I stream my tournament matches?',
    answer: 'Absolutely. We actively support live spectator streams! Be sure to link your Twitch or YouTube stream profile to your Gamer Identity on your Dashboard to sync views.'
  },
  {
    question: 'What is the Refund Policy for hardware items?',
    answer: 'We provide an elite 30-day "no-questions-asked" return or replacement package on all mechanical keyboard, spatial gaming headphones, and smart mouse deliveries.'
  }
];
