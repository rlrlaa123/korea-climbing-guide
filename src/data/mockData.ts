import { ClimbingGym, Review } from '../types';
import { countries } from './countries';

export const mockGyms: ClimbingGym[] = [
  {
    id: '1',
    name: '더클라임 강남점',
    image: 'https://images.unsplash.com/photo-1675448057076-4fb80b43c5d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYmluZyUyMGd5bSUyMGJvdWxkZXJpbmclMjB3YWxsfGVufDF8fHx8MTc1NjQ2OTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 156,
    tags: ['볼더링', '리드', '초보환영'],
    location: {
      address: '서울특별시 강남구 테헤란로 123',
      district: '강남구',
      coordinates: [127.0276, 37.5665]
    },
    info: {
      hours: '평일 06:00-23:00, 주말 09:00-22:00',
      phone: '02-1234-5678',
      website: 'https://theclimb.com',
      pricing: {
        dayPass: '15,000원',
        monthly: '120,000원'
      },
      facilities: ['샤워실', '락커', '렌탈장비', '카페', '주차장']
    },
    routes: {
      bouldering: {
        grades: ['V0-V2', 'V3-V5', 'V6-V8', 'V9+'],
        count: 45
      },
      leading: {
        grades: ['5.6-5.8', '5.9-5.10d', '5.11a-5.11d', '5.12+'],
        count: 28
      }
    }
  },
  {
    id: '2',
    name: '클라이밍파크 홍대',
    image: 'https://images.unsplash.com/photo-1727999988371-d9e014d884ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGltYmluZyUyMGd5bSUyMGludGVyaW9yfGVufDF8fHx8MTc1NjQ2OTQ3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 89,
    tags: ['볼더링', '24시간', '젊은분위기'],
    location: {
      address: '서울특별시 마포구 홍익로 456',
      district: '마포구',
      coordinates: [126.9240, 37.5563]
    },
    info: {
      hours: '24시간',
      phone: '02-9876-5432',
      pricing: {
        dayPass: '18,000원',
        monthly: '140,000원'
      },
      facilities: ['24시간 이용', '락커', '렌탈장비', '간식바']
    },
    routes: {
      bouldering: {
        grades: ['V0-V2', 'V3-V5', 'V6-V8'],
        count: 38
      },
      leading: {
        grades: [],
        count: 0
      }
    }
  },
  {
    id: '3',
    name: '락스파이더 잠실',
    image: 'https://images.unsplash.com/photo-1730659071139-ca79bf16d835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYmluZyUyMHdhbGwlMjBjb2xvcmZ1bCUyMGhvbGRzfGVufDF8fHx8MTc1NjQ2OTQ3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 203,
    tags: ['리드', '볼더링', '키즈존'],
    location: {
      address: '서울특별시 송파구 올림픽로 789',
      district: '송파구',
      coordinates: [127.0925, 37.5133]
    },
    info: {
      hours: '평일 10:00-22:30, 주말 09:00-21:00',
      phone: '02-5555-7777',
      pricing: {
        dayPass: '16,000원',
        monthly: '130,000원'
      },
      facilities: ['키즈존', '샤워실', '락커', '렌탈장비', '카페', '주차장']
    },
    routes: {
      bouldering: {
        grades: ['V0-V2', 'V3-V5', 'V6-V8', 'V9+'],
        count: 52
      },
      leading: {
        grades: ['5.6-5.8', '5.9-5.10d', '5.11a-5.11d', '5.12+'],
        count: 35
      }
    }
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    gymId: '1',
    author: {
      nickname: '클라이머김',
      country: countries[0] // 한국
    },
    rating: 5,
    text: '시설이 정말 깨끗하고 직원분들도 친절해요! 홀드 세팅도 자주 바뀌어서 재미있습니다.',
    likes: 12,
    comments: [],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    gymId: '1',
    author: {
      nickname: 'ClimberMike',
      country: countries[1] // 미국
    },
    rating: 4,
    text: 'Great gym with modern facilities! The routes are well-designed and challenging.',
    likes: 8,
    comments: [],
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    gymId: '1',
    author: {
      nickname: '岩登り太郎',
      country: countries[2] // 일본
    },
    rating: 5,
    text: '素晴らしいクライミングジムです！スタッフも親切で、設備も充実しています。',
    likes: 15,
    comments: [],
    createdAt: new Date('2024-01-08')
  },
  {
    id: '4',
    gymId: '2',
    author: {
      nickname: '볼더러',
      country: countries[0] // 한국
    },
    rating: 4,
    text: '24시간 이용 가능해서 너무 좋아요! 밤늦게도 안전하게 운동할 수 있습니다.',
    likes: 6,
    comments: [],
    createdAt: new Date('2024-01-12')
  },
  {
    id: '5',
    gymId: '3',
    author: {
      nickname: 'KletterMax',
      country: countries[4] // 독일
    },
    rating: 5,
    text: 'Excellent gym with great variety of routes. The lead climbing section is particularly impressive!',
    likes: 9,
    comments: [],
    createdAt: new Date('2024-01-14')
  }
];

export const popularTags = [
  '볼더링', '리드', '초보환영', '24시간', '키즈존', 
  '주차가능', '샤워실', '카페', '렌탈장비', '젊은분위기'
];