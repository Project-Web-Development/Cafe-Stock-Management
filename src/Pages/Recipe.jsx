import React from "react";
import NavbarDefault from "../Components/NavigationBar";
import food from "../Assets/Images/download.jpeg";
import ingredient from "../Assets/Images/air gula.jpeg"

const foods = [
  { id: 1, name: "Makanan 1", quantity: 2 },
  { id: 2, name: "Makanan 2", quantity: 3 },
  { id: 3, name: "Makanan 3", quantity: 1 },
];

const desserts = [
  { id: 4, name: "Minuman 1", quantity: 2 },
  { id: 5, name: "Minuman 2", quantity: 1 },
  { id: 6, name: "Minuman 3", quantity: 3 },
];

const subMakanans = [
  { id: 7, name: "Sub Makanan 1", quantity: 2 },
  { id: 8, name: "Sub Makanan 2", quantity: 1 },
  { id: 9, name: "Sub Makanan 3", quantity: 3 },
];

const subMinumans = [
  { id: 10, name: "Sub Minuman 1", quantity: 4 },
  { id: 11, name: "Sub Minuman 2", quantity: 3 },
  { id: 12, name: "Sub Minuman 3", quantity: 2 },
];

function RecipePage() {
  const [mode, setMode] = React.useState("main");

  // Fungsi untuk mengubah mode menjadi Sub Recipe
  const handleSubRecipeClick = () => {
    setMode("sub");
  };

  // Fungsi untuk mengubah mode menjadi Main Recipe
  const handleMainRecipeClick = () => {
    setMode("main");
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
                mode === "main" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={mode === "main"}
            >
              Main Recipe
            </button>
            <button
              onClick={handleSubRecipeClick}
              className={`bg-brown-500  bg-sky-500/50 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded-r-lg ml-auto ${
                mode === "sub" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={mode === "sub"}
            >
              Sub Recipe
            </button>
          </div>
        </div>
      </div>

      {mode === "main" && (
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
                className="bg-gradient-to-b from-[#343434] to-[#000000] flex  p-4 rounded shadow-xl mr-4 mb-4"
              >
                {/* Gambar di atas, dan elemen teks di bawah */}
                <div className=" flex flex-col items-center">
                  <img
                    src={food}
                    alt={foodItem.name}
                    className="border-b-4 border-indigo-500 shadow-lg w-32 h-32 object-fill rounded-lg mb-4"
                  />
                  <div className=" bg-cover size-30 text-center">
                    <h2 className=" text-white text-xl font-bold">{foodItem.name}</h2>
                    <p className="text-white text-lg ">{foodItem.quantity} /Day</p>
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
                className="bg-gradient-to-b from-[#343434] to-[#000000] flex  p-4 rounded shadow-xl mr-4 mb-4"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={food}
                    alt={dessertItem.name}
                    className="border-b-4 border-indigo-500 shadow-lg w-32 h-32 object-cover rounded-lg mb-4"
                  />
                  <div className="bg-cover size-30 text-center">
                    <h2 className="text-white text-xl font-bold">{dessertItem.name}</h2>
                    <p className="text-white text-lg">{dessertItem.quantity} /Day</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "sub" && (
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
                className="bg-gradient-to-b from-[#343434] to-[#000000] flex  p-4 rounded shadow-xl mr-4 mb-4"
              >
                {/* Gambar di atas, dan elemen teks di bawah */}
                <div className=" flex flex-col items-center">
                  <img
                    src={ingredient}
                    alt={subMakananItem.name}
                    className="border-b-4 border-indigo-500 shadow-lg w-32 h-32 object-fill rounded-lg mb-4"
                  />
                  <h2 className="text-white text-xl font-bold">{subMakananItem.name}</h2>
                  <p className="text-white text-lg">{subMakananItem.quantity} /Day</p>
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
                className="bg-gradient-to-b from-[#343434] to-[#000000] flex  p-4 rounded shadow-xl mr-4 mb-4"
              >
                {/* Gambar di atas, dan elemen teks di bawah */}
                <div className=" flex flex-col items-center">
                  <img
                    src={ingredient}
                    alt={subMinumanItem.name}
                    className="border-b-4 border-indigo-500 shadow-lg w-32 h-32 object-fill rounded-lg mb-4"
                  />
                  <h2 className="text-white text-xl font-bold">{subMinumanItem.name}</h2>
                  <p className="text-white text-lg">{subMinumanItem.quantity} /Day</p>
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
