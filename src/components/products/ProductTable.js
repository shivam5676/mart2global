import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ProductTablePrint from "./ProductTablePrint";
import { productLists } from "./productLists";

const ProductTable = () => {
  const availableColors = [
    "black",
    "gray",
    "pink",
    "yellow",
    "blue",
    "red",
    "maroon",
  ];
  const [products, setProducts] = useState(productLists);
  const [sortDirection, setSortDirection] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchedItems, setsearchedItems] = useState([]);
  const timeoutRef = useRef(null); // Store timeout ID to prevent re-renders
  const [searchValue, setSearchValue] = useState(""); // Track input state
  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };
  const searchedResultHandler = (query) => {
    const queriedProducts = products.filter((item) =>
      ["name", "category", "price"].some((key) =>
        item[key].toLowerCase().includes(query.toLowerCase())
      )
    );
    setsearchedItems(queriedProducts);
  };
  useEffect(() => {
    // Clear existing timeout on each input change
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to log value after 500ms of inactivity
    timeoutRef.current = setTimeout(() => {
      console.log("Search input after 500ms of inactivity:", searchValue);
      searchedResultHandler(searchValue);
    }, 500);

    // Cleanup function to clear timeout if component unmounts or re-renders
    return () => clearTimeout(timeoutRef.current);
  }, [searchValue]); // Runs whenever searchValue changes

  const { t, i18n } = useTranslation();
  const deleteProductHandler = (delId) => {
    console.log(delId);
    const productArrayAfterDeletion = products.filter(
      (current) => current.id != delId
    );
    setProducts(productArrayAfterDeletion);
    // Also remove from search results
    const updatedSearchedItems = searchedItems.filter(
      (product) => product.id !== delId
    );
    setsearchedItems(updatedSearchedItems);

    toast.success("product deleted successfully");
  };
  const sortByName = () => {
    const sortedData = [...searchedItems].sort((a, b) => {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    setsearchedItems(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };
  const toggleColorSelection = (color) => {
    setEditingProduct((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };
  // Handle Form Submission
  const handleSaveChanges = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setsearchedItems((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    toast.success("Product updated successfully!");
    closeModal();
  };
  return (
    <div
      key={i18n.language}
      className=" w-[100%] h-[calc(100vh-70px)] overflow-y-auto customScrollbar px-4 py-2 bg-gray-200"
    >
      <div className="text-white px-2 py-4 flex justify-between max-[500px]:flex-col max-[500px]:gap-2  max-[500px]:w-fit">
        <p className="text-2xl font-semibold text-black">
          {t("Product Stock")}
        </p>
        <div className="flex rounded-[25px] bg-white items-center px-2 border">
          <div className="px-0">
            <CiSearch className="h-4 w-4 text-black " />
          </div>

          <input
            placeholder={t("search product name")}
            className="bg-transparent text-gray-500 px-2 outline-none"
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
        </div>
      </div>
      <div className=" bg-white shadow-lg rounded-lg">
        {/* Table */}
        <ProductTablePrint
          searchedItems={searchedItems}
          sortByName={sortByName}
          sortDirection={sortDirection}
          deleteProductHandler={deleteProductHandler}
          openEditModal={openEditModal}
        />
        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <input
                className="w-full p-2 mb-2 border rounded"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
              />
              <input
                className="w-full p-2 mb-2 border rounded"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value,
                  })
                }
              />
              <input
                className="w-full p-2 mb-2 border rounded"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
              />
              <input
                className="w-full p-2 mb-2 border rounded"
                type="number"
                value={editingProduct.pieces}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    pieces: e.target.value,
                  })
                }
              />

              <div className="mb-4">
                <p className="font-semibold">Available Colors:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      className={`px-3 py-1 rounded text-white ${
                        editingProduct.colors.includes(color)
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                      onClick={() => toggleColorSelection(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600 px-6 pb-4">
          <span>Showing 1-5 of 78</span>
          <div className="flex space-x-2">
            <button className="p-1 px-3 bg-gray-200 rounded hover:bg-gray-300">
              {"<"}
            </button>
            <button className="p-1 px-3 bg-gray-200 rounded hover:bg-gray-300">
              {">"}
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default ProductTable;
