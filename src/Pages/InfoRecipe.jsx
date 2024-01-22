import React, { useEffect, useState } from "react";
import NavbarDefault from "../Components/NavigationBar";
import { getMenuById } from "../Context/firebaseController";

function InfoRecipe({ idRecipe, setPopup }) {
  const [menuData, setMenuData] = useState({});
  

  useEffect(() => {
    console.log(`idREcipe : ${idRecipe}`);
    const fetchMenuData = async () => {
      try {
        const menuById = await getMenuById(idRecipe);
        console.log("WOOOI" + menuById);
        setMenuData(menuById);
        console.log("Data menu:", menuById.ingredients[0].ingredients);
      } catch (error) {
        console.error("Error fetching menu data by ID:", error);
      }
    };

    fetchMenuData();
  }, []);

  const handleExitButton = () =>{
    setPopup(false)
  }
  return (
    <div className="h-screen w-screen absolute flex justify-center items-center z-10">
      <div className="justify-center flex flex-col">
        <div className="flex items-center bg-[#DCD7C9] pt-3 px-6 pb-8 rounded-lg max-w-3xl">
          {/* Bagian kiri */}
          <div>
            <img
              src={menuData.link}
              alt={menuData.name}
              className="border-b-[8px] border-indigo-500 shadow-lg w-64 object-cover rounded-3xl mb-2 h-[150px]"
            />
          </div>

          {/* Bagian kanan */}
          <div className="ml-6">
            <div className="flex justify-end">

          <button onClick={handleExitButton}>X</button>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-2xl font-bold">{menuData.name}</h3>
              <h5 className="text-md font-thin">{menuData.category}</h5>
            </div>
            <hr className="my-3 border-t border-black w-80" />

            <p className="text-lg font-extrabold">
              Terjual: {menuData.sold} / Hari
            </p>

            {menuData.ingredients && menuData.ingredients.length > 0 && (
              <div>
                <p className="text-lg mt-2 font-bold">Bahan-bahan:</p>
                <ul className="list-disc ml-6">
                  {menuData.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-black">
                      {`${ingredient.quantity || ""} ${ingredient.unit || ""} ${
                        ingredient.ingredients || ""
                      } (${ingredient.insideQuantityPerUnit || ""} ${
                        ingredient.insideUnit || ""
                      })`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoRecipe;
