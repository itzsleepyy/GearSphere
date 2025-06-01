// Enhanced TypeScript interfaces for the app

export interface Tag {
  id: string;
  name: string;
  color?: string;
  category?: string;
}

export interface EventRSVP {
  id: string;
  userId: string;
  eventId: string;
  status: 'going' | 'maybe' | 'not_going';
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  startTime: string;
  location: string;
  description?: string;
  image: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  latitude: number;
  longitude: number;
  attendees: number;
  distance?: string;
  tags: Tag[];
  rsvps?: EventRSVP[];
  organizer?: {
    id: string;
    name: string;
    avatar?: string;
  };
  isRSVPed?: boolean;
  maxAttendees?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  image: string;
  mods: string[];
  public: boolean;
  ownerId: string;
  color?: string;
  engine?: string;
  horsepower?: number;
  torque?: number;
  drivetrain?: string;
  transmission?: string;
  description?: string;
  maintenanceRecords?: MaintenanceRecord[];
  performanceMetrics?: PerformanceMetric[];
  createdAt?: string;
  updatedAt?: string;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: 'oil_change' | 'tire_rotation' | 'brake_service' | 'other';
  description: string;
  cost: number;
  mileage: number;
  date: string;
  shopName?: string;
  notes?: string;
}

export interface PerformanceMetric {
  id: string;
  vehicleId: string;
  type: 'dyno_run' | 'quarter_mile' | 'lap_time' | 'autocross';
  value: number;
  unit: string;
  location: string;
  date: string;
  conditions?: string;
  notes?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  date: string;
  event: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  category: 'attendance' | 'social' | 'distance' | 'variety' | 'achievement';
  requirements?: {
    type: string;
    count: number;
    description: string;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  reward?: Badge;
  category: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  location: string;
  language: string;
  interests: string[];
  searchRadius: number;
  dateRange: number;
  publicProfile: boolean;
  publicGarage: boolean;
  notificationsEnabled: boolean;
  pushNotifications: boolean;
  stats: UserStats;
  following: string[];
  followers: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  eventsAttended: number;
  badgesEarned: number;
  vehiclesInGarage: number;
  following: number;
  followers: number;
  totalMilesDriven?: number;
  eventsOrganized?: number;
}

export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: string;
  acceptedAt?: string;
}

export interface EventComment {
  id: string;
  eventId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
  likes: number;
  isLiked?: boolean;
}

export interface EventPhoto {
  id: string;
  eventId: string;
  userId: string;
  url: string;
  caption?: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
  likes: number;
  isLiked?: boolean;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  requirements: {
    type: string;
    count: number;
    timeframe?: string;
  };
  reward: Badge;
  startDate: string;
  endDate: string;
  isActive: boolean;
  participants: number;
  userProgress?: {
    current: number;
    isCompleted: boolean;
  };
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  refreshing?: boolean;
}

// Filter types
export interface EventFilters {
  radius: number;
  dateRange: number;
  tags: string[];
  garageMatch: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface MapFilters {
  radius: number;
  tags: string[];
  dateFilter?: 'today' | 'week' | 'month' | 'all';
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  DevMenu?: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Onboarding: undefined;
};

export type MainTabParamList = {
  Discover: undefined;
  Map: undefined;
  Garage: undefined;
  Badges: undefined;
  Profile: undefined;
};

// Component prop types
export interface EventCardProps {
  event: Event;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onInfo?: () => void;
  onShare?: () => void;
}

export interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

export interface BadgeCardProps {
  badge: Badge;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
}
