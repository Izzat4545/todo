export interface Task {
  task: string;
  description: string;
  priority: string;
  isFinished: boolean;
}

export type MyData = {
  [date: string]: Task[];
};
