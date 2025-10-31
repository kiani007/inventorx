import { ProjectRepository, ProjectFilters } from '@/core/repositories/ProjectRepository';
import { Project, ProjectStatus, ProjectCategory } from '@/core/domain/entities/Project';
import { Inventor } from '@/core/domain/entities/Inventor';
import { ProposalType } from '@/core/domain/entities/Proposal';

// Mock Inventors
const mockInventors: Inventor[] = [
  {
    id: 'inv-1',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@example.com',
    country: 'United States',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Biomedical engineer with 15 years experience in medical device innovation',
    expertise: ['Medical Devices', 'Biotechnology', 'AI'],
    verified: true,
    projectsCount: 5,
    successRate: 92,
  },
  {
    id: 'inv-2',
    name: 'Prof. Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    country: 'United Arab Emirates',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Renewable energy specialist focused on sustainable power solutions',
    expertise: ['Solar Energy', 'Grid Optimization', 'Smart Systems'],
    verified: true,
    projectsCount: 8,
    successRate: 88,
  },
  {
    id: 'inv-3',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@example.com',
    country: 'Spain',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'AI researcher specializing in machine learning and computer vision',
    expertise: ['Machine Learning', 'Computer Vision', 'Robotics'],
    verified: true,
    projectsCount: 12,
    successRate: 95,
  },
  {
    id: 'inv-4',
    name: 'Dr. James Wilson',
    email: 'james.wilson@example.com',
    country: 'United Kingdom',
    avatar: 'https://i.pravatar.cc/150?img=13',
    bio: 'Space technology innovator with NASA background',
    expertise: ['Space Technology', 'Propulsion Systems', 'Materials Science'],
    verified: true,
    projectsCount: 6,
    successRate: 90,
  },
  {
    id: 'inv-5',
    name: 'Dr. Yuki Tanaka',
    email: 'yuki.tanaka@example.com',
    country: 'Japan',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: 'Robotics engineer specializing in autonomous systems',
    expertise: ['Robotics', 'AI', 'Automation'],
    verified: true,
    projectsCount: 10,
    successRate: 93,
  },
  {
    id: 'inv-6',
    name: 'Emma Thompson',
    email: 'emma.thompson@example.com',
    country: 'Canada',
    avatar: 'https://i.pravatar.cc/150?img=10',
    bio: 'Fintech innovator revolutionizing payment systems',
    expertise: ['Blockchain', 'Fintech', 'Cybersecurity'],
    verified: true,
    projectsCount: 7,
    successRate: 87,
  },
];

// Mock Projects
const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'SmartGrid Energy System',
    description: 'Revolutionary renewable energy distribution network using AI-powered optimization to reduce waste and maximize efficiency across urban power grids. This system integrates solar, wind, and traditional power sources intelligently.',
    shortDescription: 'AI-powered renewable energy distribution network for urban grids',
    category: 'GREEN_ENERGY' as ProjectCategory,
    status: 'AVAILABLE' as ProjectStatus,
    inventor: mockInventors[1],
    images: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    location: 'San Francisco, USA',
    country: 'United States',
    tags: ['Energy', 'Tech', 'AI'],
    likes: 234,
    views: 1523,
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-10-25'),
    proposal: {
      id: 'prop-1',
      projectId: 'proj-1',
      options: [
        {
          id: 'opt-1-1',
          type: 'PARTIAL' as ProposalType,
          title: 'Partial Investment',
          description: '30% equity stake with voting rights',
          amount: 2500000,
          percentage: 30,
          terms: ['Board seat included', '5-year lock-in period', 'Quarterly dividends'],
          isAvailable: true,
        },
        {
          id: 'opt-1-2',
          type: 'TOTAL_BUYOUT' as ProposalType,
          title: 'Total Buyout',
          description: 'Complete acquisition of IP and technology',
          amount: 8000000,
          terms: ['All patents transferred', 'Team retention bonus', '2-year transition support'],
          isAvailable: true,
        },
      ],
      currency: 'USD',
      negotiable: true,
      minimumInvestment: 500000,
    },
    documents: [
      {
        id: 'doc-1-1',
        title: 'Technical Brief',
        type: 'TECHNICAL_BRIEF',
        url: '/documents/smartgrid-technical.pdf',
        requiresAuth: true,
      },
      {
        id: 'doc-1-2',
        title: 'Business Presentation',
        type: 'PRESENTATION',
        url: '/documents/smartgrid-presentation.pdf',
        requiresAuth: true,
      },
    ],
    isAuction: false,
    isValidated: true,
    isFeatured: true,
    isNew: false,
    isTrending: true,
  },
  {
    id: 'proj-2',
    title: 'NanoBot Cancer Treatment',
    description: 'Breakthrough nanotechnology for targeted cancer therapy using programmable nanobots that can identify and destroy cancer cells without harming healthy tissue. Clinical trials showing 85% success rate.',
    shortDescription: 'Programmable nanobots for precise cancer cell targeting',
    category: 'MEDICAL_TECH' as ProjectCategory,
    status: 'IN_AUCTION' as ProjectStatus,
    inventor: mockInventors[0],
    images: [
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800',
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800',
    location: 'Boston, USA',
    country: 'United States',
    tags: ['Medical', 'Biotech', 'Innovation'],
    likes: 567,
    views: 3421,
    createdAt: new Date('2024-09-20'),
    updatedAt: new Date('2024-10-28'),
    proposal: {
      id: 'prop-2',
      projectId: 'proj-2',
      options: [
        {
          id: 'opt-2-1',
          type: 'ROYALTIES' as ProposalType,
          title: 'Royalty Agreement',
          description: '15% royalty on all sales for 10 years',
          percentage: 15,
          terms: ['10-year term', 'Minimum annual guarantee $500k', 'Worldwide rights'],
          isAvailable: true,
        },
      ],
      currency: 'USD',
      negotiable: false,
      minimumInvestment: 1000000,
    },
    documents: [
      {
        id: 'doc-2-1',
        title: 'Clinical Trial Results',
        type: 'TECHNICAL_BRIEF',
        url: '/documents/nanobot-clinical.pdf',
        requiresAuth: true,
      },
    ],
    isAuction: true,
    auctionEndDate: new Date('2024-11-05T18:00:00'),
    currentBid: 3500000,
    startingBid: 2000000,
    totalBids: 23,
    isValidated: true,
    isFeatured: true,
    isNew: false,
    isTrending: true,
  },
  {
    id: 'proj-3',
    title: 'Quantum Encryption Protocol',
    description: 'Next-generation quantum encryption system providing unhackable security for financial transactions and sensitive data. Based on quantum entanglement principles.',
    shortDescription: 'Quantum-based unhackable encryption for financial security',
    category: 'FINTECH' as ProjectCategory,
    status: 'AVAILABLE' as ProjectStatus,
    inventor: mockInventors[5],
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    location: 'Toronto, Canada',
    country: 'Canada',
    tags: ['Fintech', 'Security', 'Quantum'],
    likes: 189,
    views: 987,
    createdAt: new Date('2024-10-10'),
    updatedAt: new Date('2024-10-22'),
    proposal: {
      id: 'prop-3',
      projectId: 'proj-3',
      options: [
        {
          id: 'opt-3-1',
          type: 'PARTIAL' as ProposalType,
          title: 'Strategic Partnership',
          description: '25% equity with technology licensing',
          amount: 5000000,
          percentage: 25,
          terms: ['Exclusive banking sector rights', 'Revenue sharing', 'Joint development'],
          isAvailable: true,
        },
      ],
      currency: 'CAD',
      negotiable: true,
      minimumInvestment: 1000000,
    },
    documents: [
      {
        id: 'doc-3-1',
        title: 'Security Whitepaper',
        type: 'TECHNICAL_BRIEF',
        url: '/documents/quantum-whitepaper.pdf',
        requiresAuth: true,
      },
    ],
    isAuction: false,
    isValidated: true,
    isFeatured: false,
    isNew: true,
    isTrending: false,
  },
  {
    id: 'proj-4',
    title: 'Autonomous Farming Robots',
    description: 'Advanced AI-powered agricultural robots that can plant, monitor, and harvest crops autonomously. Increases yield by 40% while reducing water usage by 60%.',
    shortDescription: 'AI robots automating farming for increased yield and sustainability',
    category: 'ROBOTICS' as ProjectCategory,
    status: 'IN_NEGOTIATION' as ProjectStatus,
    inventor: mockInventors[4],
    images: [
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800',
    location: 'Tokyo, Japan',
    country: 'Japan',
    tags: ['Robotics', 'Agriculture', 'Automation'],
    likes: 421,
    views: 2134,
    createdAt: new Date('2024-09-05'),
    updatedAt: new Date('2024-10-20'),
    proposal: {
      id: 'prop-4',
      projectId: 'proj-4',
      options: [
        {
          id: 'opt-4-1',
          type: 'TOTAL_BUYOUT' as ProposalType,
          title: 'Complete Acquisition',
          description: 'Full technology transfer',
          amount: 12000000,
          terms: ['Manufacturing rights', 'Global distribution', 'Support contract'],
          isAvailable: true,
        },
      ],
      currency: 'JPY',
      negotiable: true,
      minimumInvestment: 2000000,
    },
    documents: [
      {
        id: 'doc-4-1',
        title: 'Field Test Results',
        type: 'TECHNICAL_BRIEF',
        url: '/documents/farming-robots-tests.pdf',
        requiresAuth: true,
      },
    ],
    isAuction: false,
    isValidated: true,
    isFeatured: true,
    isNew: false,
    isTrending: false,
  },
  {
    id: 'proj-5',
    title: 'Neural Learning Platform',
    description: 'Revolutionary AI-powered educational platform that adapts to individual learning styles using neural networks. Proven to improve student performance by 45%.',
    shortDescription: 'Adaptive learning platform using neural networks',
    category: 'EDTECH' as ProjectCategory,
    status: 'IN_AUCTION' as ProjectStatus,
    inventor: mockInventors[2],
    images: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
    location: 'Barcelona, Spain',
    country: 'Spain',
    tags: ['Education', 'AI', 'Learning'],
    likes: 312,
    views: 1876,
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-10-27'),
    proposal: {
      id: 'prop-5',
      projectId: 'proj-5',
      options: [
        {
          id: 'opt-5-1',
          type: 'PARTIAL' as ProposalType,
          title: 'Investment Partnership',
          description: '40% equity stake',
          amount: 3000000,
          percentage: 40,
          terms: ['Scaling support', 'Market expansion', 'Technology development'],
          isAvailable: true,
        },
      ],
      currency: 'EUR',
      negotiable: true,
      minimumInvestment: 500000,
    },
    documents: [
      {
        id: 'doc-5-1',
        title: 'Platform Demo',
        type: 'PRESENTATION',
        url: '/documents/neural-learning-demo.pdf',
        requiresAuth: true,
      },
    ],
    isAuction: true,
    auctionEndDate: new Date('2024-11-10T20:00:00'),
    currentBid: 2800000,
    startingBid: 1500000,
    totalBids: 18,
    isValidated: true,
    isFeatured: false,
    isNew: true,
    isTrending: true,
  },
  {
    id: 'proj-6',
    title: 'BioPlastic Revolution',
    description: 'Fully biodegradable plastic alternative made from algae. Breaks down in 90 days in any environment. Scalable manufacturing process ready for commercial production.',
    shortDescription: 'Biodegradable algae-based plastic alternative',
    category: 'BIOTECH' as ProjectCategory,
    status: 'AVAILABLE' as ProjectStatus,
    inventor: mockInventors[0],
    images: [
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
      'https://images.unsplash.com/photo-1582408921715-18e7806365c1?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
    location: 'San Diego, USA',
    country: 'United States',
    tags: ['Biotech', 'Environment', 'Sustainability'],
    likes: 678,
    views: 4231,
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-10-25'),
    proposal: {
      id: 'prop-6',
      projectId: 'proj-6',
      options: [
        {
          id: 'opt-6-1',
          type: 'ROYALTIES' as ProposalType,
          title: 'Licensing Agreement',
          description: '8% royalty on production',
          percentage: 8,
          terms: ['15-year exclusive license', 'Global rights', 'Technical support included'],
          isAvailable: true,
        },
        {
          id: 'opt-6-2',
          type: 'TOTAL_BUYOUT' as ProposalType,
          title: 'Full Acquisition',
          description: 'Complete patent transfer',
          amount: 15000000,
          terms: ['All IP rights', 'Manufacturing know-how', 'Consultant agreement'],
          isAvailable: true,
        },
      ],
      currency: 'USD',
      negotiable: true,
      minimumInvestment: 2000000,
    },
    documents: [
      {
        id: 'doc-6-1',
        title: 'Environmental Impact Study',
        type: 'TECHNICAL_BRIEF',
        url: '/documents/bioplastic-impact.pdf',
        requiresAuth: true,
      },
    ],
    isAuction: false,
    isValidated: true,
    isFeatured: true,
    isNew: false,
    isTrending: true,
  },
  {
    id: 'proj-7',
    title: 'Satellite Debris Collector',
    description: 'Innovative space debris collection system using magnetic nets and AI navigation. Successfully tested in LEO orbit with 95% capture rate.',
    shortDescription: 'AI-powered system for cleaning space debris',
    category: 'SPACE_TECH' as ProjectCategory,
    status: 'AVAILABLE' as ProjectStatus,
    inventor: mockInventors[3],
    images: [
      'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
      'https://images.unsplash.com/photo-1454789476662-53eb23ba5907?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
    location: 'London, UK',
    country: 'United Kingdom',
    tags: ['Space', 'Technology', 'Sustainability'],
    likes: 445,
    views: 2987,
    createdAt: new Date('2024-09-10'),
    updatedAt: new Date('2024-10-18'),
    proposal: {
      id: 'prop-7',
      projectId: 'proj-7',
      options: [
        {
          id: 'opt-7-1',
          type: 'PARTIAL' as ProposalType,
          title: 'Strategic Investment',
          description: '35% equity for scaling operations',
          amount: 10000000,
          percentage: 35,
          terms: ['Launch support', 'Government contracts', 'Technology development'],
          isAvailable: true,
        },
      ],
      currency: 'GBP',
      negotiable: true,
      minimumInvestment: 5000000,
    },
    documents: [
      {
        id: 'doc-7-1',
        title: 'Orbit Test Results',
        type: 'TECHNICAL_BRIEF',
        url: '/documents/debris-collector-test.pdf',
        requiresAuth: true,
      },
    ],
    isAuction: false,
    isValidated: true,
    isFeatured: false,
    isNew: true,
    isTrending: false,
  },
  {
    id: 'proj-8',
    title: 'Smart Insulin Patch',
    description: 'Wearable glucose monitoring and insulin delivery patch that automatically adjusts dosage. FDA approval pending. Game-changer for diabetes management.',
    shortDescription: 'Automated insulin delivery patch with real-time monitoring',
    category: 'MEDICAL_TECH' as ProjectCategory,
    status: 'IN_AUCTION' as ProjectStatus,
    inventor: mockInventors[0],
    images: [
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800',
      'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800',
    location: 'San Francisco, USA',
    country: 'United States',
    tags: ['Medical', 'Wearable', 'Innovation'],
    likes: 892,
    views: 5432,
    createdAt: new Date('2024-09-25'),
    updatedAt: new Date('2024-10-28'),
    proposal: {
      id: 'prop-8',
      projectId: 'proj-8',
      options: [
        {
          id: 'opt-8-1',
          type: 'TOTAL_BUYOUT' as ProposalType,
          title: 'Acquisition Offer',
          description: 'Complete technology acquisition',
          amount: 25000000,
          terms: ['FDA approval support', 'Manufacturing setup', 'Market launch partnership'],
          isAvailable: true,
        },
      ],
      currency: 'USD',
      negotiable: false,
      minimumInvestment: 10000000,
    },
    documents: [
      {
        id: 'doc-8-1',
        title: 'Clinical Data',
        type: 'TECHNICAL_BRIEF',
        url: '/documents/insulin-patch-clinical.pdf',
        requiresAuth: true,
      },
    ],
    isAuction: true,
    auctionEndDate: new Date('2024-11-02T16:00:00'),
    currentBid: 22000000,
    startingBid: 15000000,
    totalBids: 45,
    isValidated: true,
    isFeatured: true,
    isNew: false,
    isTrending: true,
  },
  {
    id: 'proj-9',
    title: 'Ocean Plastic Harvester',
    description: 'Autonomous floating system that collects and processes ocean plastic into reusable materials. Powered by wave energy. Can clean 1000 tons annually.',
    shortDescription: 'Self-powered ocean plastic collection and processing system',
    category: 'GREEN_ENERGY' as ProjectCategory,
    status: 'AVAILABLE' as ProjectStatus,
    inventor: mockInventors[1],
    images: [
      'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800',
    location: 'Dubai, UAE',
    country: 'United Arab Emirates',
    tags: ['Environment', 'Ocean', 'Sustainability'],
    likes: 534,
    views: 3210,
    createdAt: new Date('2024-08-20'),
    updatedAt: new Date('2024-10-15'),
    proposal: {
      id: 'prop-9',
      projectId: 'proj-9',
      options: [
        {
          id: 'opt-9-1',
          type: 'PARTIAL' as ProposalType,
          title: 'Development Partnership',
          description: '45% equity for global deployment',
          amount: 8000000,
          percentage: 45,
          terms: ['Fleet expansion funding', 'Government partnerships', 'Carbon credit revenue'],
          isAvailable: true,
        },
      ],
      currency: 'AED',
      negotiable: true,
      minimumInvestment: 3000000,
    },
    documents: [
      {
        id: 'doc-9-1',
        title: 'Prototype Performance Data',
        type: 'TECHNICAL_BRIEF',
        url: '/documents/ocean-harvester-data.pdf',
        requiresAuth: true,
      },
    ],
    isAuction: false,
    isValidated: true,
    isFeatured: true,
    isNew: false,
    isTrending: false,
  },
  {
    id: 'proj-10',
    title: 'AI Medical Diagnosis Assistant',
    description: 'Deep learning system that analyzes medical images with 98% accuracy. Trained on 10 million cases. Reduces diagnosis time from hours to minutes.',
    shortDescription: 'AI-powered medical imaging analysis with 98% accuracy',
    category: 'AI_ML' as ProjectCategory,
    status: 'IN_AUCTION' as ProjectStatus,
    inventor: mockInventors[2],
    images: [
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800',
    location: 'Madrid, Spain',
    country: 'Spain',
    tags: ['AI', 'Medical', 'Diagnosis'],
    likes: 721,
    views: 4532,
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date('2024-10-27'),
    proposal: {
      id: 'prop-10',
      projectId: 'proj-10',
      options: [
        {
          id: 'opt-10-1',
          type: 'ROYALTIES' as ProposalType,
          title: 'License Agreement',
          description: '12% per diagnostic use',
          percentage: 12,
          terms: ['Hospital network integration', '10-year exclusive', 'Training included'],
          isAvailable: true,
        },
      ],
      currency: 'EUR',
      negotiable: true,
      minimumInvestment: 2000000,
    },
    documents: [
      {
        id: 'doc-10-1',
        title: 'Accuracy Study',
        type: 'TECHNICAL_BRIEF',
        url: '/documents/ai-diagnosis-accuracy.pdf',
        requiresAuth: true,
      },
    ],
    isAuction: true,
    auctionEndDate: new Date('2024-11-08T14:00:00'),
    currentBid: 6500000,
    startingBid: 4000000,
    totalBids: 31,
    isValidated: true,
    isFeatured: false,
    isNew: false,
    isTrending: true,
  },
  {
    id: 'proj-11',
    title: 'Vertical Urban Farm',
    description: 'Modular indoor farming system for urban environments. Uses 95% less water and produces 10x yield per square meter. Plug-and-play modules for any building.',
    shortDescription: 'Space-efficient modular urban farming solution',
    category: 'GREEN_ENERGY' as ProjectCategory,
    status: 'AVAILABLE' as ProjectStatus,
    inventor: mockInventors[4],
    images: [
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
    location: 'Singapore',
    country: 'Singapore',
    tags: ['Agriculture', 'Urban', 'Sustainability'],
    likes: 287,
    views: 1654,
    createdAt: new Date('2024-10-05'),
    updatedAt: new Date('2024-10-20'),
    proposal: {
      id: 'prop-11',
      projectId: 'proj-11',
      options: [
        {
          id: 'opt-11-1',
          type: 'PARTIAL' as ProposalType,
          title: 'Expansion Investment',
          description: '30% equity for global rollout',
          amount: 4500000,
          percentage: 30,
          terms: ['Manufacturing scaling', 'Distribution network', 'Tech support'],
          isAvailable: true,
        },
      ],
      currency: 'SGD',
      negotiable: true,
      minimumInvestment: 1000000,
    },
    documents: [
      {
        id: 'doc-11-1',
        title: 'Yield Performance Report',
        type: 'TECHNICAL_BRIEF',
        url: '/documents/vertical-farm-performance.pdf',
        requiresAuth: true,
      },
    ],
    isAuction: false,
    isValidated: true,
    isFeatured: false,
    isNew: true,
    isTrending: true,
  },
  {
    id: 'proj-12',
    title: 'Wireless Power Grid',
    description: 'Revolutionary wireless power transmission system for homes and businesses. Safe, efficient long-range power delivery up to 100 meters. Patent-protected technology.',
    shortDescription: 'Safe wireless power transmission up to 100 meters',
    category: 'GREEN_ENERGY' as ProjectCategory,
    status: 'SOLD' as ProjectStatus,
    inventor: mockInventors[1],
    images: [
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
    location: 'Dubai, UAE',
    country: 'United Arab Emirates',
    tags: ['Energy', 'Wireless', 'Innovation'],
    likes: 943,
    views: 6721,
    createdAt: new Date('2024-07-10'),
    updatedAt: new Date('2024-09-30'),
    proposal: {
      id: 'prop-12',
      projectId: 'proj-12',
      options: [
        {
          id: 'opt-12-1',
          type: 'TOTAL_BUYOUT' as ProposalType,
          title: 'Sold',
          description: 'Technology acquired',
          amount: 35000000,
          terms: ['Completed transaction'],
          isAvailable: false,
        },
      ],
      currency: 'USD',
      negotiable: false,
    },
    documents: [],
    isAuction: false,
    isValidated: true,
    isFeatured: false,
    isNew: false,
    isTrending: false,
  },
  {
    id: 'proj-13',
    title: 'Carbon Capture Concrete',
    description: 'Revolutionary building material that absorbs CO2 from the atmosphere while curing. 50% stronger than traditional concrete. Reduces construction carbon footprint by 90%.',
    shortDescription: 'CO2-absorbing concrete that strengthens buildings',
    category: 'BIOTECH' as ProjectCategory,
    status: 'AVAILABLE' as ProjectStatus,
    inventor: mockInventors[3],
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    location: 'London, UK',
    country: 'United Kingdom',
    tags: ['Construction', 'Environment', 'Materials'],
    likes: 412,
    views: 2345,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-10-12'),
    proposal: {
      id: 'prop-13',
      projectId: 'proj-13',
      options: [
        {
          id: 'opt-13-1',
          type: 'ROYALTIES' as ProposalType,
          title: 'Production License',
          description: '5% royalty per ton produced',
          percentage: 5,
          terms: ['Global manufacturing rights', '20-year term', 'Technical training'],
          isAvailable: true,
        },
      ],
      currency: 'GBP',
      negotiable: true,
      minimumInvestment: 3000000,
    },
    documents: [
      {
        id: 'doc-13-1',
        title: 'Material Testing Report',
        type: 'TECHNICAL_BRIEF',
        url: '/documents/carbon-concrete-tests.pdf',
        requiresAuth: true,
      },
    ],
    isAuction: false,
    isValidated: true,
    isFeatured: true,
    isNew: false,
    isTrending: false,
  },
  {
    id: 'proj-14',
    title: 'Mind-Controlled Prosthetics',
    description: 'Advanced prosthetic limbs controlled directly by neural signals. Natural movement with haptic feedback. FDA breakthrough device designation received.',
    shortDescription: 'Neural-controlled prosthetics with sensory feedback',
    category: 'MEDICAL_TECH' as ProjectCategory,
    status: 'IN_NEGOTIATION' as ProjectStatus,
    inventor: mockInventors[0],
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    location: 'Boston, USA',
    country: 'United States',
    tags: ['Medical', 'Neuroscience', 'Prosthetics'],
    likes: 1023,
    views: 7892,
    createdAt: new Date('2024-08-05'),
    updatedAt: new Date('2024-10-25'),
    proposal: {
      id: 'prop-14',
      projectId: 'proj-14',
      options: [
        {
          id: 'opt-14-1',
          type: 'TOTAL_BUYOUT' as ProposalType,
          title: 'Strategic Acquisition',
          description: 'Complete IP transfer',
          amount: 45000000,
          terms: ['Research team retention', 'FDA approval support', 'Manufacturing partnership'],
          isAvailable: true,
        },
      ],
      currency: 'USD',
      negotiable: true,
      minimumInvestment: 20000000,
    },
    documents: [
      {
        id: 'doc-14-1',
        title: 'Clinical Trial Data',
        type: 'TECHNICAL_BRIEF',
        url: '/documents/prosthetics-clinical.pdf',
        requiresAuth: true,
      },
    ],
    isAuction: false,
    isValidated: true,
    isFeatured: true,
    isNew: false,
    isTrending: true,
  },
  {
    id: 'proj-15',
    title: 'Holographic Display System',
    description: 'True 3D holographic projection system without special glasses. 360-degree viewing angle. Applications in medicine, education, and entertainment.',
    shortDescription: 'Glasses-free 3D holographic projection technology',
    category: 'AI_ML' as ProjectCategory,
    status: 'IN_AUCTION' as ProjectStatus,
    inventor: mockInventors[2],
    images: [
      'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800',
    ],
    thumbnailImage: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800',
    location: 'Barcelona, Spain',
    country: 'Spain',
    tags: ['Display', 'Technology', 'Innovation'],
    likes: 678,
    views: 4123,
    createdAt: new Date('2024-09-20'),
    updatedAt: new Date('2024-10-28'),
    proposal: {
      id: 'prop-15',
      projectId: 'proj-15',
      options: [
        {
          id: 'opt-15-1',
          type: 'PARTIAL' as ProposalType,
          title: 'Growth Investment',
          description: '50% equity for commercialization',
          amount: 18000000,
          percentage: 50,
          terms: ['Product development', 'Market launch', 'Manufacturing setup'],
          isAvailable: true,
        },
      ],
      currency: 'EUR',
      negotiable: true,
      minimumInvestment: 5000000,
    },
    documents: [
      {
        id: 'doc-15-1',
        title: 'Technology Demo Video',
        type: 'PROTOTYPE_VIDEO',
        url: '/documents/holographic-demo.mp4',
        requiresAuth: true,
      },
    ],
    isAuction: true,
    auctionEndDate: new Date('2024-11-12T19:00:00'),
    currentBid: 16500000,
    startingBid: 10000000,
    totalBids: 27,
    isValidated: true,
    isFeatured: true,
    isNew: false,
    isTrending: true,
  },
];

export class MockProjectRepository implements ProjectRepository {
  private projects: Project[] = mockProjects;

  async getAll(filters?: ProjectFilters): Promise<Project[]> {
    let filtered = [...this.projects];

    if (filters) {
      if (filters.status) {
        filtered = filtered.filter(p => p.status === filters.status);
      }
      if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category);
      }
      if (filters.country) {
        const country = (filters.country as string).toLowerCase();
        filtered = filtered.filter(p => p.country.toLowerCase().includes(country));
      }
      if (filters.isAuction !== undefined) {
        filtered = filtered.filter(p => p.isAuction === filters.isAuction);
      }
      if (filters.proposalType) {
        filtered = filtered.filter(p => 
          p.proposal.options.some(opt => opt.type === filters.proposalType)
        );
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        filtered = filtered.filter(p => {
          const amount = p.proposal.options[0]?.amount || 0;
          if (filters.minPrice && amount < filters.minPrice) return false;
          if (filters.maxPrice && amount > filters.maxPrice) return false;
          return true;
        });
      }
      if (filters.dateFrom) {
        filtered = filtered.filter(p => new Date(p.createdAt) >= new Date(filters.dateFrom!));
      }
      if (filters.dateTo) {
        filtered = filtered.filter(p => new Date(p.createdAt) <= new Date(filters.dateTo!));
      }
    }

    // Sort by featured, trending, new, then by date
    filtered.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      if (a.isTrending && !b.isTrending) return -1;
      if (!a.isTrending && b.isTrending) return 1;
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return filtered;
  }

  async getById(id: string): Promise<Project | null> {
    return this.projects.find(p => p.id === id) || null;
  }

  async search(query: string): Promise<Project[]> {
    return this.getAll({ search: query });
  }

  async getFeatured(): Promise<Project[]> {
    return this.projects.filter(p => p.isFeatured);
  }

  async getTrending(): Promise<Project[]> {
    return this.projects.filter(p => p.isTrending);
  }

  async getRelated(projectId: string, limit: number = 4): Promise<Project[]> {
    const project = await this.getById(projectId);
    if (!project) return [];

    // Find projects with same category or similar tags
    const related = this.projects
      .filter(p => p.id !== projectId)
      .filter(p => 
        p.category === project.category ||
        p.tags.some(tag => project.tags.includes(tag))
      )
      .slice(0, limit);

    return related;
  }
}

