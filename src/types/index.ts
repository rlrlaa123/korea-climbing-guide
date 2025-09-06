export interface ClimbingGym {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  location: {
    address: string;
    district: string;
    coordinates: [number, number];
  };
  info: {
    hours: string;
    phone: string;
    website?: string;
    pricing: {
      dayPass: string;
      monthly: string;
    };
    facilities: string[];
  };
  routes: {
    bouldering: {
      grades: string[];
      count: number;
    };
    leading: {
      grades: string[];
      count: number;
    };
  };
}

export interface Review {
  id: string;
  gymId: string;
  author: {
    nickname: string;
    country: Country;
  };
  rating: number;
  text: string;
  images?: string[];
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  author: {
    nickname: string;
    country: Country;
  };
  text: string;
  createdAt: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export type TabType = 'info' | 'routes' | 'reviews';