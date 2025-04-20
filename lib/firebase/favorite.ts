// import { doc, setDoc, deleteDoc } from "firebase/firestore";
// import { db } from "@/firebase";


// // お気に入りを追加・削除
// export const toggleFavoriteSchool = async (
//   uid: string,
//   schoolId: string,
//   isLiked: boolean
// ) => {
//   const docRef = doc(db, "users", uid, "favorites", schoolId);
//   if (isLiked) {
//     await setDoc(docRef, { liked: true });
//   } else {
//     await deleteDoc(docRef);
//   }
// };

import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";

/**
 * ユーザーのお気に入りをトグルする
 * @param uid - ユーザーID
 * @param schoolId - 学校ID
 * @param liked - true なら追加、false なら削除
 */

/**
* ユーザーのお気に入り学校一覧を取得
* @param uid - ユーザーID
* @returns { [schoolId: string]: true }
*/

export const toggleFavoriteSchool = async (
  uid: string,
  schoolId: string,
  liked: boolean
): Promise<void> => {
  const favRef = doc(db, "users", uid, "favorites", schoolId);

  if (liked) {
    // お気に入りを追加
    await setDoc(favRef, { liked: true });
  } else {
    // お気に入りを削除
    await deleteDoc(favRef);
  }
};


export const getFavoriteSchools = async (
 uid: string
): Promise<Record<string, boolean>> => {
 const snapshot = await getDocs(collection(db, "users", uid, "favorites"));
 const favorites: Record<string, boolean> = {};
 snapshot.forEach((doc) => {
   favorites[doc.id] = true;
 });
 return favorites;
};
