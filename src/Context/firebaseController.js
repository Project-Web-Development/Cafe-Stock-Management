import { db } from "../Configs/firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
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

  export async function getStockDataByEmail(email) {
    try {
      const stockRef = collection(db, 'Stock');
      const queryGetStockByEmail = query(stockRef, where("Email", "==", email)); // Pastikan "Email" sesuai dengan field yang ada di Firestore
  
      const snapshot = await getDocs(queryGetStockByEmail);
      const stockData = [];
  
      snapshot.forEach((doc) => {
        const data = doc.data();
        const stockItem = {
          id: doc.id,
          stockName: data.StockName,
          category: data.Category,
          quantity: data.Quantity,
          unit: data.Unit,
          insideQuantityPerUnit: data.InsideQuantityPerUnit,
          insideUnit: data.InsideUnit,
          
        };
        stockData.push(stockItem);
      });
      console.log(stockData);
      return stockData;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  }

  export default async function addNewStock(stockData) {
    try {
      const stockRef = collection(db, "Stock"); // Referensi koleksi "Stock" di Firestore
      await addDoc(stockRef, stockData); // Menambahkan dokumen baru ke koleksi "Stock"
      console.log("Data stock berhasil ditambahkan ke Firebase!");
    } catch (error) {
      console.error("Error adding stock data:", error);
      throw error;
    }
  }
  