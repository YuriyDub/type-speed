import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { User } from "firebase/auth";
import { UserData } from "./types";

export const addUserToFirestore = async (user: User) => {
  try {
    const userData: UserData = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };

    await setDoc(doc(db, "users", user.uid), userData);
    console.log("User added to Firestore successfully");
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};

export const getUsersFromFirestore = async (): Promise<UserData[] | null> => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map<UserData>((doc) => ({
      ...(doc.data() as UserData),
    }));
  } catch (error) {
    console.error("Error fetching users from Firestore:", error);
    return null;
  }
};
