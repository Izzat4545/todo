// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FirebaseConfig";
import { get, getDatabase, onValue, ref } from "firebase/database";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function readData() {
  const starCountRef = ref(database, "test/");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

export const readDataOnce = async () => {
  try {
    const snapshot = await get(ref(database, "test/"));
    return snapshot.val();
  } catch (e) {
    console.log(e);
  }
};
