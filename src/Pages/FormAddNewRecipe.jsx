import React from "react";
import { useEffect } from "react";
import NavbarDefault from "../Components/NavigationBar";
import FileUpload from "../Components/FormComponent/FileUploud";
import TextFieldBox from "../Components/FormComponent/TextFieldBox";
import CustomRadioGroupRecipeCat from "../Components/FormComponent/RadioGroupRecipe";
import CustomRadioGroupRecipeType from "../Components/FormComponent/RadioGroupRecipeType";
import SelectBox from "../Components/FormComponent/SelectBox";
import {
  getStockDataByEmail,
  addNewRecipe,
  uploadImageToStorage,
} from "../Context/firebaseController";
import { useUserData } from "../Context/getUserData";

function FormAddNewRecipe() {
  const [menuName, setMenuName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [typeMenu, setTypeMenu] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectBoxes, setSelectBoxes] = React.useState([
    { ingredients: "", quantity: "", unit: "", insideUnit: "" },
  ]);
  const userData = useUserData();

  const [stockOptions, setStockOptions] = React.useState([]);

  const getStockOptions = async () => {
    try {
      // Ganti dengan alamat email yang sesuai
      const userEmail = userData.email;

      // Mendapatkan data stock berdasarkan email
      const stockData = await getStockDataByEmail(userEmail);

      // Mengonversi data stock menjadi format options
      const stockOptions = stockData.map((stockItem) => ({
        value: stockItem.stockName, // Ubah dengan field yang sesuai, // Sesuaikan dengan kebutuhan
        stockName: stockItem.stockName,
        unit: stockItem.unit,
        insideUnit: stockItem.insideUnit,
        // Tambahkan properti lain yang diinginkan
      }));

      return stockOptions;
    } catch (error) {
      console.error("Error getting stock options:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchStockOptions = async () => {
      try {
        if (userData && userData.email) {
          const options = await getStockOptions();
          setStockOptions(options);
        }
      } catch (error) {
        // Handle error jika diperlukan
        console.error("Error fetching stock options:", error);
      }
    };

    fetchStockOptions();
  }, [userData]);

  const handleMenuNameChange = (event) => {
    setMenuName(event.target.value);
  };
  //   const handleQuantityChange = (event) => {
  //     setQuantity(event.target.value);
  //   };
  //   const handleInsideQuantityPerUnitChange = (event) => {
  //     setInsideQuantityPerUnit(event.target.value);
  //   };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFileChange = (file) => {
    // Menyimpan data gambar ke state
    setSelectedFile(file);
  };
  const handleTypeMenuChange = (event) => {
    setTypeMenu(event.target.value);
  };

  const handleQuantityChangeInSelectBox = (index, event) => {
    const value = event.target.value;

    setSelectBoxes((prevSelectBoxes) => {
      const updatedSelectBoxes = [...prevSelectBoxes];
      updatedSelectBoxes[index] = {
        ...updatedSelectBoxes[index],
        quantity: value,
      };

      console.log("Updated selectBoxes:", updatedSelectBoxes);

      return updatedSelectBoxes;
    });
  };
  const handleInsideQuantityPerUnitChangeInSelectBox = (index, event) => {
    const value = event.target.value;

    setSelectBoxes((prevSelectBoxes) => {
      const updatedSelectBoxes = [...prevSelectBoxes];
      updatedSelectBoxes[index] = {
        ...updatedSelectBoxes[index],
        insideQuantityPerUnit: value,
      };

      console.log("Updated selectBoxes:", updatedSelectBoxes);

      return updatedSelectBoxes;
    });
  };
  const handleSelectBoxChange = (index, field, event) => {
    // Mengambil nilai yang sesuai dari event
    const value = event.target.value;

    setSelectBoxes((prevSelectBoxes) => {
      const updatedSelectBoxes = [...prevSelectBoxes];
      updatedSelectBoxes[index] = {
        ...updatedSelectBoxes[index],
        [field]: value,
      };

      // Menyusun data yang sesuai dari stockOptions
      const selectedStockOption = stockOptions.find(
        (option) => option.stockName === value
      );

      if (selectedStockOption) {
        updatedSelectBoxes[index] = {
          ...updatedSelectBoxes[index],
          unit: selectedStockOption.unit,
          insideUnit: selectedStockOption.insideUnit,
          quantity: selectedStockOption.quantity,
          insideQuantityPerUnit: selectedStockOption.insideQuantityPerUnit,
        };
      }

      console.log("Updated selectBoxes:", updatedSelectBoxes);

      return updatedSelectBoxes;
    });
  };

  const handleAddSelectBox = () => {
    setSelectBoxes((prevSelectBoxes) => [
      ...prevSelectBoxes,
      { ingredients: "", quantity: "", unit: "" },
    ]);
  };

  const handleRemoveSelectBox = (index) => {
    setSelectBoxes((prevSelectBoxes) => {
      const updatedSelectBoxes = [...prevSelectBoxes];
      updatedSelectBoxes.splice(index, 1);
      return updatedSelectBoxes;
    });
  };

  const handleAddRecipe = async () => {
    try {
      // Menyimpan data Ingredients, Unit, Quantity, Inside Unit, dan Inside Quantity dalam array
      const recipeData = selectBoxes.map((selectBox, index) => ({
        ingredients: selectBox.ingredients,
        unit: selectBox.unit,
        quantity: selectBox.quantity,
        insideUnit: selectBox.insideUnit,
        insideQuantityPerUnit: selectBox.insideQuantityPerUnit,
      }));

      // Mengonversi objek File menjadi URL dengan mengunggah gambar ke Firebase Storage
      const imageUrl = selectedFile
        ? await uploadImageToStorage(selectedFile)
        : "";

      // Periksa apakah variabel-variabel utama memiliki nilai yang valid
      if (
        menuName &&
        category &&
        typeMenu &&
        imageUrl &&
        recipeData.length > 0
      ) {
        // Menyusun data resep yang akan disimpan di Firestore
        const recipeInfo = {
          namaMenu: menuName,
          category: category,
          link: imageUrl, // Menggunakan nama field 'link' untuk menyimpan URL gambar
          email: userData.email, // Menggunakan nama field 'email' untuk menyimpan email pengguna
          typeMenu: typeMenu,
          // Sesuaikan dengan nama field yang sesuai dengan struktur Firestore
          // Contoh: fieldLain: nilaiFieldLain
          // fieldLain2: nilaiFieldLain2
          ingredients: recipeData,
          sold: 0
        };

        // Memanggil fungsi untuk menyimpan data resep ke Firestore
        await addNewRecipe(recipeInfo);
      } else {
        console.error("Data resep tidak lengkap atau tidak valid.");
      }
    } catch (error) {
      console.error("Error handling and adding recipe data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#3F4E4F] to-[#2C3639] h-screen pt-2">
      <NavbarDefault />

      <div className="flex flex-row justify-between bg-[#DCD7C9] mt-4 p-10 rounded-[35px]">
        <div className="flex flex-col justify-center items-start">
          <FileUpload onFileChange={handleFileChange} />
        </div>

        <div className="flex flex-col justify-center">
          <TextFieldBox
            label="Menu Name"
            value={menuName}
            onChange={handleMenuNameChange}
            width="570px"
          />
          <div className="flex flex-row justify-start">
            <CustomRadioGroupRecipeCat
              value={category}
              onChange={handleCategoryChange}
            />
            <CustomRadioGroupRecipeType
              value={typeMenu}
              onChange={handleTypeMenuChange}
            />
          </div>
          {selectBoxes.map((selectBox, index) => (
            <div
              key={index}
              className="flex flex-row justify-center items-start"
            >
              <SelectBox
                label="Ingredients"
                value={selectBox.ingredients}
                onChange={(value) =>
                  handleSelectBoxChange(index, "ingredients", value)
                }
                required
                minWidth={210}
                options={stockOptions.map((option) => ({
                  value: option.stockName,
                  label: option.stockName,
                  stockName: option.stockName,
                }))}
                getOptionLabel={(option) => option.label}
              />
              <TextFieldBox
                label="Unit"
                value={selectBox.unit}
                onChange={(event) =>
                  handleSelectBoxChange(index, "unit", event)
                }
                required
                width="100px"
                disabled // Menonaktifkan input
              />
              <TextFieldBox
                label="Quantity"
                value={selectBox.quantity}
                onChange={(event) =>
                  handleQuantityChangeInSelectBox(index, event)
                }
                required
                width="85px"
              />
              <TextFieldBox
                label="Inside Unit"
                value={selectBox.insideUnit}
                onChange={(event) =>
                  handleSelectBoxChange(index, "insideUnit", event)
                }
                required
                width="100px"
                disabled // Menonaktifkan input
              />
              <TextFieldBox
                label="Inside Quantity"
                value={selectBox.insideQuantityPerUnit}
                onChange={(event) =>
                  handleInsideQuantityPerUnitChangeInSelectBox(index, event)
                }
                required
                width="85px"
              />
              <button
                onClick={() => handleRemoveSelectBox(index)}
                className="mt-3 bg-red-600 p-2 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-start mt-3 ml-2">
            <button
              onClick={handleAddSelectBox}
              className="bg-[#2C3639] p-2 rounded-md text-white"
              style={{ textAlign: "center" }}
            >
              Add Ingridients
            </button>
          </div>
          <div className="flex justify-start mt-3 ml-2">
            <button
              onClick={handleAddRecipe}
              className="bg-[#2C3639] p-2 rounded-md text-white"
              style={{ textAlign: "center" }}
            >
              Add Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormAddNewRecipe;
