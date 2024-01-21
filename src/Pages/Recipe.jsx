import React, { useEffect, useState } from "react";
import NavbarDefault from "../Components/NavigationBar";

import TextFieldBox from "../Components/FormComponent/TextFieldBox";
import { useUserData } from "../Context/getUserData";
import { GetMenuByEmail, updateMenuSold } from "../Context/firebaseController";
import { useNavigate } from "react-router-dom";
import "./Recipe.css";

function RecipePage() {
  const [mode, setMode] = useState("Main");
  const userData = useUserData();
  const [foods, setFoods] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [subMakanans, setSubMakanans] = useState([]);
  const [subMinumans, setSubMinumans] = useState([]);
  const [menuData, setMenuData] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [soldTextField, setSoldTextField] = useState(
    Array(foods.length).fill("")
  );
  const [dessertSoldTextField, setDessertSoldTextField] = useState(
    Array(desserts.length).fill("")
  );
  
  const [subMakananSoldTextField, setSubMakananSoldTextField] = useState(
    Array(subMakanans.length).fill("")
  );
  const [subMinumanSoldTextField, setSubMinumanSoldTextField] = useState(
    Array(subMinumans.length).fill("")
  );
  const handleSoldChange = (event, index) => {
    const newValue = event.target.value;
    console.log("nilaiiii :"+newValue +"index"+ index);
    // Buat salinan array untuk menghindari perubahan langsung pada array asli
    const updatedSoldTextField = [...soldTextField];
    const updateDessertSoldTextField = [...dessertSoldTextField];
    const updateSubMakanansSoldTextField = [...subMakananSoldTextField];
    const updateSubMinumansSoldTextField = [...subMinumanSoldTextField]

    // Perbarui nilai pada indeks tertentu
    updatedSoldTextField[index] = newValue;
    updateDessertSoldTextField[index] = newValue;
    updateSubMakanansSoldTextField[index] = newValue;
    updateSubMinumansSoldTextField[index] = newValue;

    // Setel state dengan array yang diperbarui
    setSoldTextField(updatedSoldTextField);
    setDessertSoldTextField(updateDessertSoldTextField);
    setSubMakananSoldTextField(updateSubMakanansSoldTextField);
    setSubMinumanSoldTextField(updateSubMinumansSoldTextField);
  };
  const [flipStates, setFlipStates] = useState({});
  const handleCardClick = (id) => {
    setFlipStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };

  const navigate = useNavigate();
  console.log(selectedRecipe);
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
                  link: menuItem.link,
                });
              }
              if (menuItem.typeMenu === "Sub") {
                subMakanansArray.push({
                  id: menuItem.id,
                  name: menuItem.name,
                  sold: menuItem.sold,
                  link: menuItem.link,
                });
              }
            }
            if (menuItem.category === "Minuman") {
              if (menuItem.typeMenu === "Main") {
                dessertsArray.push({
                  id: menuItem.id,
                  name: menuItem.name,
                  sold: menuItem.sold,
                  link: menuItem.link,
                });
              }
              if (menuItem.typeMenu === "Sub") {
                subMinumansArray.push({
                  id: menuItem.id,
                  name: menuItem.name,
                  sold: menuItem.sold,
                  link: menuItem.link,
                });
              }
            }
          });

          setFoods(foodsArray);
          console.log("Nilai foods setelah pembaruan state:", foods);
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
  const handleButtonAddNewRecipe = () => {
    navigate("/formAddNewrecipe");
  };
  const handleToInfoRecipe = (recipe) => {
    setSelectedRecipe(recipe.id);
    navigate(`/infoRecipe/${recipe.id}`);
  };
  const handleUpdateButton = async (foodItemId, index) => {
    try {
      // Cetak ID dan nilai ke konsol
      console.log("ID Kartu yang akan diupdate:", foodItemId);
      console.log("Nilai yang ingin diupdate:", soldTextField[index]);

      // Panggil fungsi untuk melakukan update pada koleksi "Menu"
      await updateMenuSold(foodItemId, soldTextField[index]);

      // Perbarui nilai sold pada foods sesuai dengan ID yang cocok
      setFoods((prevFoods) => {
        return prevFoods.map((food) => {
          if (food.id === foodItemId) {
            return {
              ...food,
              sold: soldTextField[index],
            };
          }
          return food;
        });
      });

      console.log("Update pada koleksi Menu berhasil dilakukan.");
    } catch (error) {
      console.error("Error updating Menu data:", error);
      // Tambahkan log atau tindakan lain yang sesuai jika terjadi kesalahan
    }
  };
  const handleUpdateDessertButton = async (dessertItemId, index) => {
    try {
      console.log("ID Kartu yang akan diupdate:", dessertItemId);
      console.log("Nilai yang ingin diupdate:", dessertSoldTextField[index]);
  
      // Panggil fungsi untuk melakukan update pada koleksi "Menu" desserts
      await updateMenuSold(dessertItemId, dessertSoldTextField[index]);
  
      // Perbarui nilai sold pada desserts sesuai dengan ID yang cocok
      setDesserts((prevDesserts) => {
        return prevDesserts.map((dessert) => {
          if (dessert.id === dessertItemId) {
            return {
              ...dessert,
              sold: dessertSoldTextField[index],
            };
          }
          return dessert;
        });
      });
  
      console.log("Update pada koleksi Menu desserts berhasil dilakukan.");
    } catch (error) {
      console.error("Error updating Menu desserts data:", error);
    }
  };
  const handleUpdateSubMakanansButton = async (subMakanansItemId, index) => {
    try {
      console.log("ID Kartu yang akan diupdate:", subMakanansItemId);
      console.log("Nilai yang ingin diupdate:" , subMakananSoldTextField[index]);
  
      // Panggil fungsi untuk melakukan update pada koleksi "Menu" desserts
      await updateMenuSold(subMakanansItemId, subMakananSoldTextField[index]);
  
      // Perbarui nilai sold pada desserts sesuai dengan ID yang cocok
      setSubMakanans((prevSubMakanans) => {
        return prevSubMakanans.map((subMakanan) => {
          if (subMakanan.id === subMakanansItemId) {
            return {
              ...subMakanan,
              sold: subMakananSoldTextField[index],
            };
          }
          return subMakanan;
        });
      });
  
      console.log("Update pada koleksi Menu desserts berhasil dilakukan.");
    } catch (error) {
      console.error("Error updating Menu desserts data:", error);
    }
  };
  const handleUpdateSubMinumansButton = async (subMinumansItemId, index) => {
    try {
      console.log("ID Kartu yang akan diupdate:", subMinumansItemId);
      console.log("Nilai yang ingin diupdate:" , subMinumanSoldTextField[index]);
  
      // Panggil fungsi untuk melakukan update pada koleksi "Menu" desserts
      await updateMenuSold(subMinumansItemId, subMinumanSoldTextField[index]);
  
      // Perbarui nilai sold pada desserts sesuai dengan ID yang cocok
      setSubMinumans((prevSubMinumans) => {
        return prevSubMinumans.map((subMinuman) => {
          if (subMinuman.id === subMinumansItemId) {
            return {
              ...subMinuman,
              sold: subMinumanSoldTextField[index],
            };
          }
          return subMinuman;
        });
      });
  
      console.log("Update pada koleksi Menu desserts berhasil dilakukan.");
    } catch (error) {
      console.error("Error updating Menu desserts data:", error);
    }
  };
  

  return (
    <div className="bg-gradient-to-b from-[#3F4E4F] to-[#2C3639] h-full pt-2 flex flex-col">
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
        <div className="">
          <div className="flex items-center justify-start px-60">
            <h1 className="text-3xl font-bold text-white">Makanan</h1>
            <button className="bg-brown-500 bg-sky-500/50 text-white font-bold py-2 px-4 rounded-full ml-auto" onClick={handleButtonAddNewRecipe}>
              Add New Receipt
            </button>
          </div>

          {/* Bagian kanan dengan card menggunakan display flex dan flex-wrap */}
          <div className="flex flex-wrap items-center justify-start px-60 relative">
            {foods.map((foodItem, index) => (
              <div
                key={foodItem.id}
                className={`card flex flex-col pb-5 rounded-3xl mr-4 mb-4 ${
                  flipStates[foodItem.id] ? "flip" : ""
                }`}
              >
                {/* Bagian depan card */}
                <div className="absolute">
                  <div className="front bg-gradient-to-b from-[#343434] to-[#212121] rounded-3xl shadow-xl w-[300px] h-[350px] justify-center">
                    <div className="flex flex-col mt-4 items-center">
                      <img
                        src={foodItem.link}
                        alt={foodItem.name}
                        className="border-b-[8px] border-indigo-500 shadow-lg w-[300px] object-cover rounded-3xl mb-2 h-[200px]"
                      />
                      <div className="bg-cover size-30 text-center">
                        <h2 className="text-white text-md mb-4">
                          {foodItem.name}
                        </h2>
                        <p className="text-white text-lg font-extrabold">
                          {foodItem.sold} / Day
                        </p>
                      </div>

                      {/* Tombol-tombol di tengah card */}
                      <div className="flex space-x-4 mt-2">
                        <button
                          onClick={() => handleCardClick(foodItem.id)}
                          className="flip-button bg-blue-gray-500 w-20 h-10 rounded-sm"
                        >
                          Flip
                        </button>
                        <button
                          onClick={() => handleToInfoRecipe(foodItem)}
                          className="flip-button bg-blue-gray-500 w-20 h-10 rounded-sm"
                        >
                          Info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bagian belakang card */}
                <div>
                  <div className="back bg-gradient-to-b from-[#343434] to-[#212121] rounded-3xl shadow-xl w-[300px] h-[350px] mt-4 relative">
                    {/* Konten bagian belakang card */}
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="text-white text-2xl font-bold mb-4">
                        {foodItem.name}
                      </p>
                      <h1 className="text-white text-lg font-thin mb-4">
                        {foodItem.sold} / Day
                      </h1>

                      {/* Menggunakan div untuk menyusun secara horizontal */}
                      <div className="flex flex-row mb-4 p-10 ">
                        <TextFieldBox
                          label="Jumlah baru"
                          value={soldTextField[index]}
                          onChange={(event) => handleSoldChange(event, index)}
                          type="number"
                          width="80%" // Sesuaikan lebar sesuai kebutuhan
                        />
                        <button
                          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() => handleUpdateButton(foodItem.id, index)}
                        >
                          Update
                        </button>
                      </div>

                      <button
                        onClick={() => handleCardClick(foodItem.id)}
                        className="flip-button bg-red-500 text-white px-4 py-2 rounded mx-auto mt-4"
                      >
                        Flip
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex px-60 pt-5">
            <h1 className="text-3xl font-bold text-white">Minuman</h1>
          </div>

          
          <div className="flex items-center justify-start px-60 relative">
            {desserts.map((dessertItem, index) => (
              <div
                key={dessertItem.id}
                className={`card flex flex-col pb-5 rounded-3xl mr-4 mb-4 ${
                  flipStates[dessertItem.id] ? "flip" : ""
                }`}
              >
                {/* Bagian depan card */}
                <div className="absolute">
                  <div className="front bg-gradient-to-b from-[#343434] to-[#212121] rounded-3xl shadow-xl w-[300px] h-[350px] justify-center">
                    <div className="flex flex-col mt-4 items-center">
                      <img
                        src={dessertItem.link}
                        alt={dessertItem.name}
                        className="border-b-[8px] border-indigo-500 shadow-lg w-[300px] object-cover rounded-3xl mb-2 h-[200px]"
                      />
                      <div className="bg-cover size-30 text-center">
                        <h2 className="text-white text-md mb-4">
                          {dessertItem.name}
                        </h2>
                        <p className="text-white text-lg font-extrabold">
                          {dessertItem.sold} / Day
                        </p>
                      </div>

                      {/* Tombol-tombol di tengah card */}
                      <div className="flex space-x-4 mt-2">
                        <button
                          onClick={() => handleCardClick(dessertItem.id)}
                          className="flip-button bg-blue-gray-500 w-20 h-10 rounded-sm"
                        >
                          Flip
                        </button>
                        <button
                          onClick={() => handleToInfoRecipe(dessertItem)}
                          className="flip-button bg-blue-gray-500 w-20 h-10 rounded-sm"
                        >
                          Info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bagian belakang card */}
                <div>
                  <div className="back bg-gradient-to-b from-[#343434] to-[#212121] rounded-3xl shadow-xl w-[300px] h-[350px] mt-4 relative">
                    {/* Konten bagian belakang card */}
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="text-white text-2xl font-bold mb-4">
                        {dessertItem.name}
                      </p>
                      <h1 className="text-white text-lg font-thin mb-4">
                        {dessertItem.sold} / Day
                      </h1>

                      {/* Menggunakan div untuk menyusun secara horizontal */}
                      <div className="flex flex-row mb-4 p-10 ">
                        <TextFieldBox
                          label="Jumlah baru"
                          value={dessertSoldTextField[index]}
                          onChange={(event) => handleSoldChange(event, index)}
                          type="number"
                          width="80%" // Sesuaikan lebar sesuai kebutuhan
                        />
                        <button
                          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() => handleUpdateDessertButton(dessertItem.id, index)}
                        >
                          Update
                        </button>
                      </div>

                      <button
                        onClick={() => handleCardClick(dessertItem.id)}
                        className="flip-button bg-red-500 text-white px-4 py-2 rounded mx-auto mt-4"
                      >
                        Flip
                      </button>
                    </div>
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
            <button
              className="bg-brown-500 bg-sky-500/50 text-white font-bold py-2 px-4 rounded-full ml-auto"
              onClick={handleButtonAddNewRecipe}
            >
              Add New Recipe
            </button>
          </div>
          <div className="flex items-center justify-start px-60 relative">
            {subMakanans.map((subMakanansItem, index) => (
              <div
                key={subMakanansItem.id}
                className={`card flex flex-col pb-5 rounded-3xl mr-4 mb-4 ${
                  flipStates[subMakanansItem.id] ? "flip" : ""
                }`}
              >
                {/* Bagian depan card */}
                <div className="absolute">
                  <div className="front bg-gradient-to-b from-[#343434] to-[#212121] rounded-3xl shadow-xl w-[300px] h-[350px] justify-center">
                    <div className="flex flex-col mt-4 items-center">
                      <img
                        src={subMakanansItem.link}
                        alt={subMakanansItem.name}
                        className="border-b-[8px] border-indigo-500 shadow-lg w-[300px] object-cover rounded-3xl mb-2 h-[200px]"
                      />
                      <div className="bg-cover size-30 text-center">
                        <h2 className="text-white text-md mb-4">
                          {subMakanansItem.name}
                        </h2>
                        <p className="text-white text-lg font-extrabold">
                          {subMakanansItem.sold} / Day
                        </p>
                      </div>

                      {/* Tombol-tombol di tengah card */}
                      <div className="flex space-x-4 mt-2">
                        <button
                          onClick={() => handleCardClick(subMakanansItem.id)}
                          className="flip-button bg-blue-gray-500 w-20 h-10 rounded-sm"
                        >
                          Flip
                        </button>
                        <button
                          onClick={() => handleToInfoRecipe(subMakanansItem)}
                          className="flip-button bg-blue-gray-500 w-20 h-10 rounded-sm"
                        >
                          Info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bagian belakang card */}
                <div>
                  <div className="back bg-gradient-to-b from-[#343434] to-[#212121] rounded-3xl shadow-xl w-[300px] h-[350px] mt-4 relative">
                    {/* Konten bagian belakang card */}
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="text-white text-2xl font-bold mb-4">
                        {subMakanansItem.name}
                      </p>
                      <h1 className="text-white text-lg font-thin mb-4">
                        {subMakanansItem.sold} / Day
                      </h1>

                      {/* Menggunakan div untuk menyusun secara horizontal */}
                      <div className="flex flex-row mb-4 p-10 ">
                        <TextFieldBox
                          label="Jumlah baru"
                          value={subMakananSoldTextField[index]}
                          onChange={(event) => handleSoldChange(event, index)}
                          type="number"
                          width="80%" // Sesuaikan lebar sesuai kebutuhan
                        />
                        <button
                          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() => handleUpdateSubMakanansButton(subMakanansItem.id, index)}
                        >
                          Update
                        </button>
                      </div>

                      <button
                        onClick={() => handleCardClick(subMakanansItem.id)}
                        className="flip-button bg-red-500 text-white px-4 py-2 rounded mx-auto mt-4"
                      >
                        Flip
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex px-60 pt-5">
            <h1 className="text-3xl font-bold text-white">Minuman</h1>
          </div>

          <div className="flex items-center justify-start px-60 relative">
            {subMinumans.map((subMinumansItem, index) => (
              <div
                key={subMinumansItem.id}
                className={`card flex flex-col pb-5 rounded-3xl mr-4 mb-4 ${
                  flipStates[subMinumansItem.id] ? "flip" : ""
                }`}
              >
                {/* Bagian depan card */}
                <div className="absolute">
                  <div className="front bg-gradient-to-b from-[#343434] to-[#212121] rounded-3xl shadow-xl w-[300px] h-[350px] justify-center">
                    <div className="flex flex-col mt-4 items-center">
                      <img
                        src={subMinumansItem.link}
                        alt={subMinumansItem.name}
                        className="border-b-[8px] border-indigo-500 shadow-lg w-[300px] object-cover rounded-3xl mb-2 h-[200px]"
                      />
                      <div className="bg-cover size-30 text-center">
                        <h2 className="text-white text-md mb-4">
                          {subMinumansItem.name}
                        </h2>
                        <p className="text-white text-lg font-extrabold">
                          {subMinumansItem.sold} / Day
                        </p>
                      </div>

                      {/* Tombol-tombol di tengah card */}
                      <div className="flex space-x-4 mt-2">
                        <button
                          onClick={() => handleCardClick(subMinumansItem.id)}
                          className="flip-button bg-blue-gray-500 w-20 h-10 rounded-sm"
                        >
                          Flip
                        </button>
                        <button
                          onClick={() => handleToInfoRecipe(subMinumansItem)}
                          className="flip-button bg-blue-gray-500 w-20 h-10 rounded-sm"
                        >
                          Info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bagian belakang card */}
                <div>
                  <div className="back bg-gradient-to-b from-[#343434] to-[#212121] rounded-3xl shadow-xl w-[300px] h-[350px] mt-4 relative">
                    {/* Konten bagian belakang card */}
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="text-white text-2xl font-bold mb-4">
                        {subMinumansItem.name}
                      </p>
                      <h1 className="text-white text-lg font-thin mb-4">
                        {subMinumansItem.sold} / Day
                      </h1>

                      {/* Menggunakan div untuk menyusun secara horizontal */}
                      <div className="flex flex-row mb-4 p-10 ">
                        <TextFieldBox
                          label="Jumlah baru"
                          value={subMinumanSoldTextField[index]}
                          onChange={(event) => handleSoldChange(event, index)}
                          type="number"
                          width="80%" // Sesuaikan lebar sesuai kebutuhan
                        />
                        <button
                          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() => handleUpdateSubMinumansButton(subMinumansItem.id, index)}
                        >
                          Update
                        </button>
                      </div>

                      <button
                        onClick={() => handleCardClick(subMinumansItem.id)}
                        className="flip-button bg-red-500 text-white px-4 py-2 rounded mx-auto mt-4"
                      >
                        Flip
                      </button>
                    </div>
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
