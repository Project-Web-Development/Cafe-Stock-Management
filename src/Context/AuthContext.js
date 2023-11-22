import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import fungsi onAuthStateChanged dan signOut dari Firebase Auth
import { auth } from "../Configs/firebaseConfig"; // Sesuaikan dengan konfigurasi Firebase Anda
import { db } from "../Configs/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Menambahkan state loading

  const signUp = async (email, password, formData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Dapatkan email pengguna

      // Setel status login di konteks autentikasi dengan data pengguna baru
      login(userCredential.user);

      // Simpan data pengguna ke Firestore dengan nama dokumen yang sesuai dengan alamat email pengguna
      await addDoc(collection(db, "Users"), {
        email: email,
        DisplayName: formData.name,
      });

      return email; // Kembalikan alamat email pengguna jika pendaftaran berhasil
    } catch (error) {
      console.error("Error during registration:", error);
      throw error; // Lebih baik melempar error jika terjadi kesalahan saat pendaftaran
    }
  };

  // Fungsi untuk login dipanggil di login.jsx

  const login = (userData) => {
    setUser({ ...userData, email: userData.email }); // Menambahkan email ke dalam data pengguna
  };

  // Fungsi untuk logout
  const logout = async () => {
    try {
      await signOut(auth); // Logout dari Firebase
      setUser(null); // Hapus data pengguna dari konteks autentikasi
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Fungsi untuk memeriksa apakah pengguna sudah login
  const isAuthenticated = () => {
    return !!user;
  };

  // Efek samping untuk memeriksa status login ketika komponen dimuat
  useEffect(() => {
    // Gunakan onAuthStateChanged dari Firebase Auth untuk memeriksa status login
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        login(firebaseUser); // Setel status login berdasarkan status Firebase Auth
      } else {
        setUser(null); // Logout jika tidak ada pengguna yang terautentikasi
      }
      setLoading(false); // Setelah selesai memeriksa status login, set loading menjadi false
    });

    // Kembalikan fungsi berhenti berlangganan (unsubscribe) jika diperlukan
    return () => unsubscribe();
  }, []);

  // Nilai yang akan disediakan oleh konteks autentikasi
  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated,
    signUp,
  };

  // Tampilkan loading jika masih dalam proses memeriksa status login
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
