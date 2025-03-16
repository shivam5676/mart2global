import { useTranslation } from "react-i18next";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductTablePrint = ({
  searchedItems,
  sortByName,
  deleteProductHandler,
  sortDirection,
  openEditModal,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        {/* Table Head */}
        <thead>
          <tr className="text-black-600   border-b text-sm font-semibold">
            <th className="px-4 py-3 text-left">{t("Image")}</th>
            <th
              className="px-4 py-3 text-left cursor-pointer"
              onClick={sortByName}
            >
              {t("Product Name")} {sortDirection === "asc" ? "▲" : "▼"}
            </th>
            <th className="px-4 py-3 text-left">{t("Category")}</th>
            <th className="px-4 py-3 text-left">{t("Price")}</th>
            <th className="px-4 py-3 text-left">{t("Piece")}</th>
            <th className="px-4 py-3 text-left">{t("Available Color")}</th>
            <th className="px-4 py-3 text-left">{t("Action")}</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {searchedItems.length > 0 &&
            searchedItems.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-md"
                  />
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{product.price}</td>
                <td className="px-4 py-3">{product.pieces}</td>
                <td className="px-4 py-3 flex space-x-2">
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className={`w-5 h-5 rounded-full border`}
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </td>
                <td className=" py-3  px-2 text-center">
                  <div className="flex justify-center space-x-2 border  border-gray-300 rounded">
                    <button
                      className="p-2  border-r border-r border-gray-300"
                      onClick={() => openEditModal(product)}
                    >
                      <FaEdit className="text-gray-500 hover:text-gray-700" />
                    </button>
                    <button
                      className="p-2  rounded"
                      onClick={() => {
                        deleteProductHandler(product.id);
                      }}
                    >
                      <FaTrash className="text-red-500 hover:text-red-700" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
        {searchedItems.length == 0 && (
          <p className="flex justify-center text-center font-semibold w-full p-4">
            No items to display
          </p>
        )}
      </table>
    </div>
  );
};
export default ProductTablePrint;
