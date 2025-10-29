import { getFirestore, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

export const addBookmark = async (schoolId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("ログインが必要です");

  const docRef = doc(db, "users", user.uid, "bookmarks", schoolId);
  await setDoc(docRef, { schoolId, createdAt: new Date() });
};

export const removeBookmark = async (schoolId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("ログインが必要です");

  const docRef = doc(db, "users", user.uid, "bookmarks", schoolId);
  await deleteDoc(docRef);
};

export const isBookmarked = async (schoolId: string) => {
  const user = auth.currentUser;
  if (!user) return false;

  const docRef = doc(db, "users", user.uid, "bookmarks", schoolId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};