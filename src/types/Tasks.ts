export interface Task {
  task: string;
  subtask: string[];
  priority: string;
}

export type MyData = {
  [date: string]: Task[];
};
