import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { School } from "@/app/types/school";
import { FetchSchoolsParams } from "@/app/types/FetchSchoolsParams";

// データ取得関数（条件付きまたは全件）
export const FetchSchoolsFromFirestore = async (
  params: FetchSchoolsParams = {}
): Promise<School[]> => {
  const schoolRef = collection(db, "schools");

  const filters = [];

  if (params.totalTuitionFee !== undefined) {
    filters.push(where("totalTuitionFee", "<=", params.totalTuitionFee));
  }

  if (params.movingOutsideThePrefecture !== undefined) {
    filters.push(
      where(
        "movingOutsideThePrefecture",
        "==",
        params.movingOutsideThePrefecture
      )
    );
  }

  if (params.commutingStyle) {
    filters.push(where("commutingStyle", "==", params.commutingStyle));
  }

  if (params.highSchool) {
    filters.push(where("highSchool", "==", params.highSchool));
  }

  if (params.attendanceFrequency) {
    filters.push(
      where("attendanceFrequency", "array-contains", params.attendanceFrequency)
    );
  }

  const q = filters.length > 0 ? query(schoolRef, ...filters) : schoolRef;

  const snapshot = await getDocs(q);

  const schools: School[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      course: data.course,
      totalTuitionFee: data.totalTuitionFee,
      firstYearFee: data.firstYearFee,
      secondYearFee: data.secondYearFee,
      thirdYearFee: data.thirdYearFee,
      testFee: data.testFee,
      movingOutsideThePrefecture: data.movingOutsideThePrefecture,
      commutingStyle: data.commutingStyle,
      highSchool: data.highSchool,
      url: data.url,
      imgUrl: data.imgUrl,
      attendanceFrequency: data.attendanceFrequency,
    };
  });

  return schools;
};

export default FetchSchoolsFromFirestore;
