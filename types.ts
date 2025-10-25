export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type Comment = {
  id: string;
  user: User;
  text: string;
  timestamp: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  assignees: User[];
  project?: string;
  sprint?: string;
  comments?: Comment[];
  tags?: string[];
};
