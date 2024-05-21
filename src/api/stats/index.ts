import {
  RainModeStatListElement,
  RainModeStatisticsType,
  SimpleModeStatListElement,
  SimpleModeStatisticsType,
} from "./types";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getUsersFromFirestore } from "../auth";

export const saveSimpleModeStatistics = async (
  userId: string,
  stats: SimpleModeStatisticsType
) => {
  try {
    await setDoc(doc(db, "simpleModeStats", userId), stats, {
      merge: true,
    });
    console.log("Game statistics saved/updated");
  } catch (error) {
    console.error("Error saving game statistics: ", error);
  }
};

export const getSimpleModeStatistics = async (
  userId: string
): Promise<SimpleModeStatisticsType | null> => {
  try {
    const docSnap = await getDoc(doc(db, "simpleModeStats", userId));
    console.log("Game statistics uploaded");

    if (docSnap.exists()) {
      return (await docSnap.data()) as Promise<SimpleModeStatisticsType>;
    } else {
      console.log("No such document!");
      return {
        averageAccuracy: 0,
        averageSpeed: 0,
        gamesCount: 0,
        maxSpeed: 0,
        mistakesCount: 0,
      };
    }
  } catch (error) {
    console.error("Error uploading game statistics: ", error);
    return null;
  }
};

export const saveRainModeStatistics = async (
  userId: string,
  stats: SimpleModeStatisticsType
) => {
  try {
    await setDoc(doc(db, "rainModeStats", userId), stats, {
      merge: true,
    });
    console.log("Game statistics saved/updated");
  } catch (error) {
    console.error("Error saving game statistics: ", error);
  }
};

export const getRainModeStatistics = async (
  userId: string
): Promise<SimpleModeStatisticsType | null> => {
  try {
    const docSnap = await getDoc(doc(db, "rainModeStats", userId));
    console.log("Game statistics uploaded");

    if (docSnap.exists()) {
      return (await docSnap.data()) as Promise<SimpleModeStatisticsType>;
    } else {
      console.log("No such document!");
      return {
        averageAccuracy: 0,
        averageSpeed: 0,
        gamesCount: 0,
        maxSpeed: 0,
        mistakesCount: 0,
      };
    }
  } catch (error) {
    console.error("Error uploading game statistics: ", error);
    return null;
  }
};

export const getAllRainModeStatistics = async (): Promise<
  RainModeStatListElement[] | null
> => {
  try {
    const querySnapshot = await getDocs(collection(db, "rainModeStats"));

    const rainModeStats = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as RainModeStatisticsType),
    }));

    const users = await getUsersFromFirestore();
    return rainModeStats.map<RainModeStatListElement>((stat) => ({
      ...stat,
      user: users?.find((user) => user.id === stat.id) ?? null,
    }));
  } catch (error) {
    console.error("Error uploading game statistics: ", error);
    return null;
  }
};

export const getAllSimpleModeStatistics = async (): Promise<
  SimpleModeStatListElement[] | null
> => {
  try {
    const querySnapshot = await getDocs(collection(db, "simpleModeStats"));

    const simpleModeStats = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as SimpleModeStatisticsType),
    }));

    const users = await getUsersFromFirestore();
    return simpleModeStats.map<SimpleModeStatListElement>((stat) => ({
      ...stat,
      user: users?.find((user) => user.id === stat.id) ?? null,
    }));
  } catch (error) {
    console.error("Error uploading game statistics: ", error);
    return null;
  }
};
