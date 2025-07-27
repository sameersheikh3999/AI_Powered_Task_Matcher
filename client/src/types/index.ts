export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  skills: Skill[];
  goals: Goal[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  confidence: number; // 0-100
  experience: number; // years
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  targetDate?: Date;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // minutes
  skills: string[]; // skill IDs
  tags: string[];
  aiScore: number; // 0-100, how well it matches user
  completed: boolean;
  completedAt?: Date;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  category: string;
  options: AssessmentOption[];
}

export interface AssessmentOption {
  id: string;
  text: string;
  score: number;
}

export interface AssessmentResult {
  skillId: string;
  score: number;
  confidence: number;
}

export interface AnalyticsData {
  skillsProgress: {
    skillId: string;
    skillName: string;
    progress: number;
    tasksCompleted: number;
  }[];
  tasksCompleted: {
    date: string;
    count: number;
  }[];
  timeSpent: {
    category: string;
    hours: number;
  }[];
  goalsProgress: {
    goalId: string;
    goalTitle: string;
    progress: number;
  }[];
} 