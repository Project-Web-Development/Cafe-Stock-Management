import React, { useEffect, useState } from "react";
import NavbarDefault from "../Components/NavigationBar";
import { useUserData } from "../Context/getUserData";
import { GetMenuByEmail } from "../Context/firebaseController";

function RecipePage() {
  const [mode, setMode] = useState("Main");
  const userData = useUserData();
  const [foods, setFoods] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [subMakanans, setSubMakanans] = useState([]);
  const [subMinumans, setSubMinumans] = useState([]);
  const [menuData, setMenuData] = useState(null);

  console.log("Foods State:", foods);
  console.log("Desserts State:", desserts);
  console.log("Sub Makanans State:", subMakanans);
  console.log("Sub Minumans State:", subMinumans);

  console.log("MenuData:", menuData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Pastikan userData tidak null dan memiliki properti email sebelum menggunakan propertinya
        if (userData && userData.email) {
          // Cek apakah data menu sudah ada dalam state
          if (menuData) {
            console.log("Menggunakan data menu dari state:", menuData);
          } else {
            // Jika belum ada, ambil data dari Firebase
            const dataFromFirebase = await GetMenuByEmail(userData.email);
            console.log("Mengambil data menu dari Firebase:", dataFromFirebase);

            // Simpan data menu ke dalam state
            setMenuData(dataFromFirebase);
          }

          const foodsArray = [];
          const dessertsArray = [];
          const subMakanansArray = [];
          const subMinumansArray = [];

          // Gunakan menuData dari state jika sudah ada
          const menuToUse = menuData || [];

          menuToUse.forEach((menuItem) => {
            if (menuItem.category === "Makanan") {
              if (menuItem.typeMenu === "Main") {
                foodsArray.push({
                  id: menuItem.id,
                  name: menuItem.name,
                  sold: menuItem.sold,
                  link: menuItem.link
                });
              }
              if (menuItem.typeMenu === "Sub") {
                subMakanansArray.push({
                  id: menuItem.id,
                  name: menuItem.name,
                  sold: menuItem.sold,
                  link: menuItem.link
                });
              }
            }
            if (menuItem.category === "Minuman") {
              if (menuItem.typeMenu === "Main") {
                dessertsArray.push({
                  id: menuItem.id,
                  name: menuItem.name,
                  sold: menuItem.sold,
                  link: menuItem.link
                });
              }
              if (menuItem.typeMenu === "Sub") {
                subMinumansArray.push({
                  id: menuItem.id,
                  name: menuItem.name,
                  sold: menuItem.sold,
                  link: menuItem.link
                });
              }
            }
          });

          setFoods(foodsArray);
          setDesserts(dessertsArray);
          setSubMakanans(subMakanansArray);
          setSubMinumans(subMinumansArray);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
        throw error;
      }
    };

    fetchData(); // Memanggil fungsi fetchData
  }, [mode, userData, menuData]);

  // Fungsi untuk mengubah mode menjadi Sub Recipe
  const handleSubRecipeClick = () => {
    setMode("Sub");
  };

  // Fungsi untuk mengubah mode menjadi Main Recipe
  const handleMainRecipeClick = () => {
    setMode("Main");
  };

  return (
    <div className="bg-gradient-to-b from-[#3F4E4F] to-[#2C3639] h-screen pt-2 flex flex-col">
      <NavbarDefault />

      <div className="flex pt-10 px-60">
        {/* Bagian kiri dengan tombol dan judul */}
        <div className="mr-4">
          <div className="flex justify-between mb-4">
            <button
              onClick={handleMainRecipeClick}
              className={`bg-brown-500  bg-sky-500/50 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded-l-lg ml-auto ${
                mode === "Main" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={mode === "Main"}
            >
              Main Recipe
            </button>
            <button
              onClick={handleSubRecipeClick}
              className={`bg-brown-500  bg-sky-500/50 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded-r-lg ml-auto ${
                mode === "Sub" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={mode === "Sub"}
            >
              Sub Recipe
            </button>
          </div>
        </div>
      </div>

      {mode === "Main" && (
        <div>
          <div className="flex items-center justify-around px-60">
            <h1 className="text-3xl font-bold text-white">Makanan</h1>
            <button className="bg-brown-500 bg-sky-500/50 text-white font-bold py-2 px-4 rounded-full ml-auto">
              Add New Receipt
            </button>
          </div>

          {/* Bagian kanan dengan card menggunakan display flex dan flex-wrap */}
          <div className="flex flex-wrap px-60 pt-5">
            {foods.map((foodItem) => (
               <div
               key={foodItem.id}
               className="bg-gradient-to-b from-[#343434] to-[#212121] flex flex-col items-center justify-center pb-5 rounded-3xl shadow-xl mr-4 mb-4 w-[200px] h-[245px]"
             >
               <div className="flex flex-col">
                 <img
                   src={foodItem.link}
                   alt={foodItem.name}
                   className="border-b-[8px] border-indigo-500 shadow-lg w-56 object-cover rounded-3xl mb-2 h-[150px]"
                 />
                 <div className="bg-cover size-30 text-center">
                   <h2 className="text-white text-md mb-4">
                     {foodItem.name}
                   </h2>
                   <p className="text-white text-lg font-extrabold">
                     {foodItem.sold} / Day
                   </p>
                 </div>
               </div>
             </div>
            ))}
          </div>

          <div className="flex px-60 pt-5">
            <h1 className="text-3xl font-bold text-white">Minuman</h1>
          </div>

          <div className="flex flex-wrap px-60 pt-5">
            {/* Penambahan untuk makanan penutup */}
            {desserts.map((dessertItem) => (
              <div
                key={dessertItem.id}
                className="bg-gradient-to-b from-[#343434] to-[#212121] flex flex-col items-center justify-center pb-5 rounded-3xl shadow-xl mr-4 mb-4 w-[200px] h-[245px]"
              >
                <div className="flex flex-col">
                  <img
                    src={dessertItem.link}
                    alt={dessertItem.name}
                    className="border-b-[8px] border-indigo-500 shadow-lg w-56 object-cover rounded-3xl mb-2 h-[150px]"
                  />
                  <div className="bg-cover size-30 text-center">
                    <h2 className="text-white text-md mb-4">
                      {dessertItem.name}
                    </h2>
                    <p className="text-white text-lg font-extrabold">
                      {dessertItem.sold} / Day
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "Sub" && (
        <div>
          <div className="flex items-center justify-around px-60">
            <h1 className="text-3xl font-bold text-white">Sub Recipe</h1>
            <button className="bg-brown-500 bg-sky-500/50 text-white font-bold py-2 px-4 rounded-full ml-auto">
              Add New Sub Recipe
            </button>
          </div>
          <div className="flex flex-wrap px-60 pt-5">
            {/* Tampilkan daftar sub recipe (snack atau cake) di sini */}
            {subMakanans.map((subMakananItem) => (
              <div
              key={subMakananItem.id}
              className="bg-gradient-to-b from-[#343434] to-[#212121] flex flex-col items-center justify-center pb-5 rounded-3xl shadow-xl mr-4 mb-4 w-[200px] h-[245px]"
            >
              <div className="flex flex-col">
                <img
                  src={subMakananItem.link}
                  alt={subMakananItem.name}
                  className="border-b-[8px] border-indigo-500 shadow-lg w-56 object-cover rounded-3xl mb-2 h-[150px]"
                />
                <div className="bg-cover size-30 text-center">
                  <h2 className="text-white text-md mb-4">
                    {subMakananItem.name}
                  </h2>
                  <p className="text-white text-lg font-extrabold">
                    {subMakananItem.sold} / Day
                  </p>
                </div>
              </div>
            </div>
            ))}
          </div>

          <div className="flex px-60 pt-5">
            <h1 className="text-3xl font-bold text-white">Minuman</h1>
          </div>

          <div className="flex flex-wrap px-60 pt-5">
            {/* Tampilkan daftar sub recipe (snack atau cake) di sini */}
            {subMinumans.map((subMinumanItem) => (
              <div
              key={subMinumanItem.id}
              className="bg-gradient-to-b from-[#343434] to-[#212121] flex flex-col items-center justify-center pb-5 rounded-3xl shadow-xl mr-4 mb-4 w-[200px] h-[245px]"
            >
              <div className="flex flex-col">
                <img
                  src={subMinumanItem.link}
                  alt={subMinumanItem.name}
                  className="border-b-[8px] border-indigo-500 shadow-lg w-56 object-cover rounded-3xl mb-2 h-[150px]"
                />
                <div className="bg-cover size-30 text-center">
                  <h2 className="text-white text-md mb-4">
                    {subMinumanItem.name}
                  </h2>
                  <p className="text-white text-lg font-extrabold">
                    {subMinumanItem.sold} / Day
                  </p>
                </div>
              </div>
            </div>
          
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipePage;
