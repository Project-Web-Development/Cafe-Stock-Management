import { db } from "../Configs/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  deleteDoc
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../Configs/firebaseConfig';

export const uploadImageToStorage = async (file) => {
  try {
    // Mendapatkan referensi ke Firebase Storage, sesuaikan dengan path yang sesuai
    const storageRef = ref(storage, `images/${file.name}`);

    // Mengunggah gambar ke Firebase Storage
    const snapshot = await uploadBytesResumable(storageRef, file);

    // Mendapatkan URL gambar setelah berhasil diunggah
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image to Firebase Storage:', error);
    throw error;
  }
};
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
    const stockRef = collection(db, "Stock");
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
    console.error("Error fetching stock data:", error);
    throw error;
  }
}


export async function addNewRecipe(recipeData) {
  try {
    const recipesRef = collection(db, "Menu"); // Ganti "Recipes" dengan nama koleksi yang sesuai di Firestore
    await addDoc(recipesRef, recipeData); // Menambahkan dokumen baru ke koleksi "Recipes"
    console.log("Data resep berhasil ditambahkan ke Firebase!");
  } catch (error) {
    console.error("Error adding recipe data:", error);
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

export async function updateStockData(stockId, updatedStockData) {
  try {
    const stockRef = doc(db, "Stock", stockId);
    await updateDoc(stockRef, updatedStockData);
    console.log("Stock data updated successfully!");
  } catch (error) {
    console.error("Error updating stock data:", error);
    throw error;
  }
}

export async function getStockById(stockId) {
  try {
    const stockRef = doc(db, 'Stock', stockId);
    const stockDoc = await getDoc(stockRef);

    if (stockDoc.exists()) {
      const stockData = stockDoc.data();
      return {
        id: stockDoc.id,
        stockName: stockData.StockName,
        category: stockData.Category,
        quantity: stockData.Quantity,
        unit: stockData.Unit,
        insideQuantityPerUnit: stockData.InsideQuantityPerUnit,
        insideUnit: stockData.InsideUnit,
        maximumStock: stockData.MaximumStock,
        minimumStock : stockData.MinimumStock,
        isInsideQuantityNeeded:stockData.IsInsideQuantityNeeded
      };
    } else {
      console.error(`Stock with ID ${stockId} not found`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching stock data by ID:', error);
    throw error;
  }
}

export const deleteStock = async (id) => {
  try {
    const stockRef = doc(db, "Stock", id);
    await deleteDoc(stockRef);
  } catch (error) {
    throw new Error("Error deleting stock data:", error);
  }
};

export const GetMenuByEmail = async (email) => {
  try {
    const menuRef = collection(db, "Menu");
    const queryGetMenuByEmail = query(menuRef, where("email", "==", email));

    const snapshot = await getDocs(queryGetMenuByEmail);
    const menuData = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const menuItem = {
        id: doc.id,
        name: data.namaMenu,
        category: data.category,
        sold: data.sold,
        link: data.link,
        typeMenu: data.typeMenu
      };
      
      // Periksa jenis menu dan tentukan di mana menu tersebut harus ditempatkan
      if (menuItem.typeMenu === "Main") {
        // Main Recipe
        menuData.push(menuItem);
      } else if (menuItem.typeMenu === "Sub") {
        
        menuData.push(menuItem);
      }
    });

    return menuData;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    throw error;
  }
};

export async function getMenuById(menuId) {
  try {
    const menuRef = doc(db, 'Menu', menuId);
    const menuDoc = await getDoc(menuRef);

    if (menuDoc.exists()) {
      const menuData = menuDoc.data();
      return {
        id: menuDoc.id,
        name: menuData.namaMenu,
        category: menuData.category,
        sold: menuData.sold,
        link: menuData.link,
        typeMenu: menuData.typeMenu,
        ingredients: menuData.ingredients || []
        // Tambahkan properti lain sesuai kebutuhan
      };
    } else {
      console.error(`Menu with ID ${menuId} not found`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching menu data by ID:', error);
    throw error;
  }
}


