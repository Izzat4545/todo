export interface SubtaskT {
  task: string;
  subtask: string[];
  priority: string;
}

export interface TaskGroupT {
  [date: string]: SubtaskT[];
}

export interface TasksT {
  tasks: TaskGroupT[];
}
