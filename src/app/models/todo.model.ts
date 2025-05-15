export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
  }