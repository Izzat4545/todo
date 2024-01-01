export interface Task {
  title: string;
  priority: string;
  description: string;
  isFinished: boolean;
}

export type MyData = {
  [date: string]: Task[];
};
