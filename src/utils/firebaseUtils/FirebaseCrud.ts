// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FirebaseConfig";
import { get, getDatabase, ref, set } from "firebase/database";
import { MyData } from "../../types/Tasks";
import { currentUserId } from "./FirebaseAuth";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const readData = async (path: string): Promise<MyData | undefined> => {
  const userId = await currentUserId();
  try {
    const snapshot = await get(ref(database, `users/${userId}/${path}/`));
    return snapshot.val();
  } catch (e) {
    console.log(e);
  }
};

export async function postData(data: MyData) {
  const userId = await currentUserId();
  try {
    const tasksRef = ref(database, `users/${userId}/tasks/`);
    set(tasksRef, data);
  } catch (e) {
    console.log(e);
  }
}
