import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

// お気に入りのトグル
export const toggleFavoriteSchool = async (
  userId: string,
  schoolId: string,
  isFavorite: boolean
) => {
  const favoriteRef = doc(db, "users", userId, "favorites", schoolId);

  try {
    if (isFavorite) {
      // 登録
      await setDoc(favoriteRef, {
        schoolId,
        createdAt: new Date(),
      });
    } else {
      // 削除
      await deleteDoc(favoriteRef);
    }
  } catch (error) {
    console.error("お気に入りの更新に失敗しました", error);
    throw error;
  }
};

