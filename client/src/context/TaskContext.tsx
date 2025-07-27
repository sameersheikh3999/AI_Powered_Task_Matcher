import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, Skill, Goal } from '../types';

interface TaskContextType {
  tasks: Task[];
  recommendations: Task[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
  fetchRecommendations: () => Promise<void>;
  completeTask: (taskId: string) => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [recommendations, setRecommendations] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // TODO: Implement actual API call
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Learn React Hooks',
          description: 'Master the use of React Hooks for state management',
          category: 'Programming',
          difficulty: 'medium',
          estimatedTime: 120,
          skills: ['react', 'javascript'],
          tags: ['frontend', 'react', 'hooks'],
          aiScore: 85,
          completed: false,
        },
        {
          id: '2',
          title: 'Build a REST API',
          description: 'Create a RESTful API using Node.js and Express',
          category: 'Programming',
          difficulty: 'hard',
          estimatedTime: 240,
          skills: ['nodejs', 'express', 'api'],
          tags: ['backend', 'api', 'nodejs'],
          aiScore: 92,
          completed: false,
        },
      ];
      setTasks(mockTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      // TODO: Implement AI-powered recommendation API call
      const mockRecommendations: Task[] = [
        {
          id: '3',
          title: 'Master TypeScript',
          description: 'Learn TypeScript fundamentals and advanced features',
          category: 'Programming',
          difficulty: 'medium',
          estimatedTime: 180,
          skills: ['typescript', 'javascript'],
          tags: ['typescript', 'programming'],
          aiScore: 95,
          completed: false,
        },
        {
          id: '4',
          title: 'Design System Implementation',
          description: 'Create and implement a design system for web applications',
          category: 'Design',
          difficulty: 'hard',
          estimatedTime: 300,
          skills: ['design', 'ui', 'ux'],
          tags: ['design', 'ui', 'ux'],
          aiScore: 88,
          completed: false,
        },
      ];
      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (taskId: string) => {
    try {
      // TODO: Implement actual API call
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId 
            ? { ...task, completed: true, completedAt: new Date() }
            : task
        )
      );
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      // TODO: Implement actual API call
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
      };
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      // TODO: Implement actual API call
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId 
            ? { ...task, ...updates }
            : task
        )
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      // TODO: Implement actual API call
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchRecommendations();
  }, []);

  const value: TaskContextType = {
    tasks,
    recommendations,
    loading,
    fetchTasks,
    fetchRecommendations,
    completeTask,
    addTask,
    updateTask,
    deleteTask,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}; 