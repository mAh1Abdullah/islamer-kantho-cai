import type { Category, Author, Post, PostSummary } from '@/types/sanity';

export const mockCategories: Category[] = [
  {
    _id: 'cat-1',
    title: 'ঈমান ও আকীদা',
    slug: 'aqeedah',
    description: 'সহিহ ইসলামী বিশ্বাসের মৌলিক ভিত্তি, তাওহীদ এবং ঈমানের শাখা-প্রশাখা।',
  },
  {
    _id: 'cat-2',
    title: 'দৈনন্দিন ফিকহ ও আমল',
    slug: 'fiqh',
    description: 'নামাজ, রোজা, জাকাত ও দৈনন্দিন জীবনের ইসলামিক বিধি-বিধান।',
  },
  {
    _id: 'cat-3',
    title: 'সীরাতুন্নবী ও ইতিহাস',
    slug: 'seerat',
    description: 'রাসূলুল্লাহ (সা.)-এর পবিত্র জীবনচরিত এবং সোনালী ইসলামী ইতিহাসের শিক্ষণীয় অধ্যায়।',
  },
  {
    _id: 'cat-4',
    title: 'কুরআন ও তাফসির',
    slug: 'tafsir',
    description: 'পবিত্র কালামুল্লাহর আয়াতসমূহের গভীর অর্থ ও সমকালীন প্রেক্ষাপটে ব্যাখ্যা।',
  },
  {
    _id: 'cat-5',
    title: 'সমকালীন ইসলামী চিন্তা',
    slug: 'contemporary',
    description: 'আধুনিক যুগে ইসলামের প্রাসঙ্গিকতা, অর্থনীতি, সমাজ ও বুদ্ধিবৃত্তিক আলোচনা।',
  },
  {
    _id: 'cat-6',
    title: 'আদব ও আত্মশুদ্ধি',
    slug: 'tazkiyah',
    description: 'অন্তরের রোগমুক্তি, আখলাক উন্নয়ন ও আধ্যাত্মিক উন্নতির দিকনির্দেশনা।',
  },
];

export const mockAuthors: Author[] = [
  {
    _id: 'author-1',
    name: 'মুফতি মুহাম্মদ আব্দুল্লাহ',
    slug: 'mufti-abdullah',
  },
  {
    _id: 'author-2',
    name: 'ড. আহমদ আল-হাসান',
    slug: 'dr-ahmad',
  },
  {
    _id: 'author-3',
    name: 'মাওলানা মাহমুদুর রহমান',
    slug: 'maulana-mahmud',
  },
];

export const mockPosts: Post[] = [
  {
    _id: 'post-1',
    title: 'রমজানের আধ্যাত্মিক প্রস্তুতি ও অন্তরের পরিশুদ্ধি',
    slug: 'spiritual-preparation-for-ramadan',
    excerpt: 'রমজান শুধুমাত্র ক্ষুধা ও তৃষ্ণার প্রশিক্ষণ নয়, বরং এটি আত্মশুদ্ধি ও আল্লাহর নৈকট্য অর্জনের এক অনন্য বসন্তকাল।',
    coverImage: {
      asset: { _ref: 'image-ramadan-1' },
      alt: 'রমজানের রহমত ও বরকত',
    },
    category: mockCategories[1]!,
    author: mockAuthors[0]!,
    publishedAt: '2026-03-01T06:00:00Z',
    updatedAt: '2026-03-02T10:00:00Z',
    featured: true,
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'h2',
        children: [{ _type: 'span', _key: 's1', text: 'রমজান মাসের তাৎপর্য' }],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'পবিত্র রমজান মাস মুমিনের জীবনে এক পরম সৌভাগ্যের উপহার। এ মাসে আল্লাহ তাআলা জান্নাতের দরজাসমূহ উন্মুক্ত করে দেন, জাহান্নামের দরজাসমূহ বন্ধ করে দেন এবং শয়তানকে শৃঙ্খলিত করেন। রোজার মূল উদ্দেশ্য হলো অন্তরে তাকওয়া বা খোদাভীতি অর্জন করা।',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'h3',
        children: [{ _type: 'span', _key: 's3', text: 'তাকওয়া অর্জনের ব্যবহারিক পদক্ষেপ' }],
      },
      {
        _type: 'block',
        _key: 'b4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's4',
            text: '১. প্রতিটি কথা ও কাজে আল্লাহর সন্তুষ্টিকে প্রাধান্য দেওয়া।\n২. জিহ্বা, চোখ ও কানকে সকল প্রকার অন্যায় থেকে বিরত রাখা।\n৩. প্রতিদিন সময় নির্দিষ্ট করে কুরআন তিলাওয়াত ও অর্থ অনুধাবন করা।\n৪. রাতের বেলা কিয়ামুল লাইল বা তাহাজ্জুদ ও তারাবির নামাজে একাগ্রতা বজায় রাখা।',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b5',
        style: 'blockquote',
        children: [
          {
            _type: 'span',
            _key: 's5',
            text: 'রাসূলুল্লাহ (সা.) বলেছেন: "যে ব্যক্তি ঈমান ও সওয়াবের আশায় রমজানের রোজা পালন করবে, তার পূর্ববর্তী সমস্ত গুনাহ ক্ষমা করে দেওয়া হবে।" (সহিহ বুখারি)',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-2',
    title: 'তাওহীদের মূল মর্ম ও আধুনিক জীবনে এর প্রতিফলন',
    slug: 'essence-of-tawheed-in-modern-life',
    excerpt: 'তাওহীদ কেবল একটি তাত্ত্বিক বিশ্বাস নয়, এটি মানুষের সামগ্রিক জীবনবোধ, চিন্তা ও আচরণকে পরিচালিত করার মূল চালিকাশক্তি।',
    coverImage: {
      asset: { _ref: 'image-tawheed-2' },
      alt: 'তাওহীদের আলো',
    },
    category: mockCategories[0]!,
    author: mockAuthors[1]!,
    publishedAt: '2026-02-24T08:30:00Z',
    featured: true,
    body: [
      {
        _type: 'block',
        _key: 'b21',
        style: 'h2',
        children: [{ _type: 'span', _key: 's21', text: 'তাওহীদের অর্থ ও তাৎপর্য' }],
      },
      {
        _type: 'block',
        _key: 'b22',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's22',
            text: 'লা ইলাহা ইল্লাল্লাহ— এই কালিমার মধ্যে নিহিত রয়েছে মানবজাতির যাবতীয় দাসত্ব থেকে মুক্তি এবং একমাত্র মহান স্রষ্টার আনুগত্যের ঘোষণা। তাওহীদ রুবূবিয়্যাহ, তাওহীদ উলূহিয়্যাহ এবং তাওহীদ আসমা ওয়াস সিফাতের সমন্বয়ে তাওহীদের পূর্ণাঙ্গ রূপ গঠিত হয়।',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-3',
    title: 'সীরাতের আয়নায় নবীজির (সা.) ক্ষমাশীলতা ও নৈতিকতা',
    slug: 'prophetic-mercy-and-ethics',
    excerpt: 'মক্কা বিজয়ের দিনে পরম শত্রুদের প্রতি দয়ার যে অনুপম দৃষ্টান্ত বিশ্বনবী (সা.) স্থাপন করেছিলেন, তা ইতিহাসের এক অনন্য মাইলফলক।',
    coverImage: {
      asset: { _ref: 'image-seerat-3' },
      alt: 'সীরাতের সুবাস',
    },
    category: mockCategories[2]!,
    author: mockAuthors[2]!,
    publishedAt: '2026-02-18T10:15:00Z',
    featured: true,
    body: [
      {
        _type: 'block',
        _key: 'b31',
        style: 'h2',
        children: [{ _type: 'span', _key: 's31', text: 'রহমাতুল্লিল আলামিনের জীবনদর্শন' }],
      },
      {
        _type: 'block',
        _key: 'b32',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's32',
            text: 'মক্কা বিজয়ের ঐতিহাসিক দিনে কুরাইশদের উদ্দেশে আল্লাহর রাসূল (সা.) বলেছিলেন: "আজ তোমাদের বিরুদ্ধে কোনো অভিযোগ নেই; যাও, তোমরা সবাই মুক্ত।" এই অসাধারণ ক্ষমা ও উদারতাই ইসলামের দিকে মানুষকে দলে দলে আকৃষ্ট করেছিল।',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-4',
    title: 'কুরআন অনুধাবন ও তাদাব্বুরের প্রয়োজনীয়তা',
    slug: 'importance-of-tadabbur-in-quran',
    excerpt: 'কুরআন কেবল তিলাওয়াতের গ্রন্থ নয়, এটি অনুধাবন, অনুধাবনভিত্তিক চিন্তা এবং বাস্তব জীবনে প্রতিফলনের জন্য নাযিলকৃত হেদায়েত।',
    coverImage: {
      asset: { _ref: 'image-tafsir-4' },
      alt: 'পবিত্র কুরআন তিলাওয়াত',
    },
    category: mockCategories[3]!,
    author: mockAuthors[1]!,
    publishedAt: '2026-02-10T12:00:00Z',
    body: [
      {
        _type: 'block',
        _key: 'b41',
        style: 'h2',
        children: [{ _type: 'span', _key: 's41', text: 'তাদাব্বুর কী এবং কেন?' }],
      },
      {
        _type: 'block',
        _key: 'b42',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's42',
            text: 'আল্লাহ তাআলা পবিত্র কুরআনে ইরশাদ করেন: "তবে কি তারা কুরআন নিয়ে গভীর চিন্তা-ভাবনা করে না, নাকি তাদের অন্তরে তালা লাগানো আছে?" (সূরা মুহাম্মদ: ২৪)',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-5',
    title: 'সমকালীন অর্থব্যবস্থায় হালাল উপার্জনের গুরুত্ব ও মূলনীতি',
    slug: 'halal-earnings-in-contemporary-economy',
    excerpt: 'সুদমুক্ত অর্থব্যবস্থা ও সততাপূর্ণ লেনদেন মুসলিম সমাজের ভিত্তি। বর্তমান জটিল অর্থনৈতিক কাঠামোয় হালাল জীবিকার চ্যালেঞ্জ ও সমাধান।',
    coverImage: {
      asset: { _ref: 'image-economy-5' },
      alt: 'হালাল অর্থনীতি',
    },
    category: mockCategories[4]!,
    author: mockAuthors[0]!,
    publishedAt: '2026-02-02T14:40:00Z',
    body: [
      {
        _type: 'block',
        _key: 'b51',
        style: 'h2',
        children: [{ _type: 'span', _key: 's51', text: 'হালাল উপার্জনের বরকত' }],
      },
      {
        _type: 'block',
        _key: 'b52',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's52',
            text: 'ইবাদত কবুলের অন্যতম প্রধান শর্ত হলো হালাল রিজিক গ্রহণ করা। যে শরীর হারাম খাদ্য দ্বারা পুষ্ট হয়, তা জাহান্নামের আগুনেরই বেশি উপযুক্ত বলে হাদিসে সতর্ক করা হয়েছে।',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-6',
    title: 'বিনয় ও অহংকারমুক্ত জীবনের ইসলামিক রূপরেখা',
    slug: 'humility-and-freedom-from-arrogance',
    excerpt: 'অহংকার পতনের মূল এবং বিনয়ী ব্যক্তিকে আল্লাহ উচ্চ মর্যাদা দান করেন। অন্তরের ব্যাধি নিরাময়ের আধ্যাত্মিক দিকনির্দেশনা।',
    coverImage: {
      asset: { _ref: 'image-tazkiyah-6' },
      alt: 'আত্মশুদ্ধি ও বিনয়',
    },
    category: mockCategories[5]!,
    author: mockAuthors[2]!,
    publishedAt: '2026-01-25T09:20:00Z',
    body: [
      {
        _type: 'block',
        _key: 'b61',
        style: 'h2',
        children: [{ _type: 'span', _key: 's61', text: 'বিনয়ের সৌন্দর্য' }],
      },
      {
        _type: 'block',
        _key: 'b62',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's62',
            text: 'আল্লাহর কাছে সবচেয়ে প্রিয় বান্দা তারা, যারা জমিনে নম্রভাবে চলাফেরা করে এবং অজ্ঞদের বাক্যালাপে শান্তির বাণী শোনায়।',
          },
        ],
      },
    ],
  },
];

export const mockPostSummaries: PostSummary[] = mockPosts.map(({ body, ...rest }) => rest);
