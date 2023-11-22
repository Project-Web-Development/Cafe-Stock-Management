import { db } from "../Configs/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
export const getUserDataByEmail = async (email) => {
    try {
      const usersCollection = collection(db, "Users"); // Mengakses koleksi "Users" di Firestore
      const q = query(usersCollection, where("email", "==", email)); // Membuat query dengan filter email
  
      const querySnapshot = await getDocs(q); // Melakukan query ke Firestore
  
      let userData = null;
  
      querySnapshot.forEach((doc) => {
        // Jika ditemukan dokumen dengan email yang sesuai
        if (doc.exists()) {
          // Mengambil data dari dokumen
          userData = {
            id: doc.id,
            email: doc.data().email,
            displayName: doc.data().DisplayName,
            domisili: doc.data().Domisili,
          };
        }
      });
  
      return userData; // Mengembalikan data pengguna atau null jika tidak ditemukan
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };