// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FirebaseConfig";
import { get, getDatabase, ref, set } from "firebase/database";
import { Task, MyData } from "../../types/Tasks";
import { getCurrentDate } from "../getCurrentDate";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const readData = async (path: string): Promise<MyData | undefined> => {
  try {
    const snapshot = await get(ref(database, path));
    return snapshot.val();
  } catch (e) {
    console.log(e);
  }
};

export function postData(data: Task[]) {
  try {
    const currentDate = getCurrentDate();
    const tasksRef = ref(database, "tasks/" + currentDate);
    set(tasksRef, data);
  } catch (e) {
    console.log(e);
  }
}
