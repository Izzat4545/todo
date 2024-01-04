import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export async function registerUser(
  email: string,
  password: string
): Promise<void> {
  const auth = getAuth();
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.log(error.code);
    throw new Error(error.code);
  }
}

export async function logInUser(
  email: string,
  password: string
): Promise<void> {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw new Error(error.code);
  }
}

export function logOut() {
  const auth = getAuth();
  signOut(auth).catch((error) => {
    console.log(error.message);
  });
}

export function isUserSignedIn() {
  const auth = getAuth();
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe to avoid memory leaks
      resolve(!!user); // Resolve with true if user is signed in, false otherwise
    });
  });
}

export function currentUserId() {
  const auth = getAuth();
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe to avoid memory leaks
      resolve(user?.uid);
    });
  });
}
