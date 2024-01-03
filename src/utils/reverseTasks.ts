import { MyData } from "../types/Tasks";
const ReverseTasks = (tasks: MyData) => {
  // Convert the object into an array of key-value pairs
  const tasksArray = Object.entries(tasks);

  // Reverse the order of the array
  const reversedArray = tasksArray.reverse();

  // Convert the reversed array back into an object
  const reversedTasks = Object.fromEntries(reversedArray);

  return reversedTasks;
};

export default ReverseTasks;
