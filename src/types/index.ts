export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  subscription: 'free' | 'premium' | 'pro';
  
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  purchaseDate: string;
  progress: number;
  instructor: string;
  category: string;
  thumbnail?: string;
  duration:string;
  level:string;
  status: 'completed' | 'in-progress' | 'not-started';
}

export interface UserStats {
  totalCourses: number;
  completedCourses: number;
  totalSpent: number;
  learningHours: number;
  completionRate:number;
  currentStreak:number;
}