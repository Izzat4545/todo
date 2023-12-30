// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FirebaseConfig";
import { get, getDatabase, ref, set } from "firebase/database";
import { MyData } from "../../types/Tasks";

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

export function postData(data: any) {
  const tasksRef = ref(database, "tasks");
  set(tasksRef, data);
}
