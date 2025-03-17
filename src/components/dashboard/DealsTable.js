import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const dataOctober = [
  {
    id: 1,
    product: "Apple Watch",
    image: "https://via.placeholder.com/40", // Replace with actual image URL
    location: "6096 Marjolaine Landing",
    dateTime: "12.09.2019 - 12:53 PM",
    pieces: 423,
    amount: "$34,295",
    status: "Delivered",
  },
];

const additionalDataNovember = [
  {
    id: 2,
    product: "Samsung Galaxy",
    image: "https://via.placeholder.com/40", // Replace with actual image URL
    location: "5248 Greenview St.",
    dateTime: "15.09.2019 - 10:30 AM",
    pieces: 210,
    amount: "$25,699",
    status: "Shipped",
  },
  {
    id: 3,
    product: "Sony Headphones",
    image: "https://via.placeholder.com/40", // Replace with actual image URL
    location: "7852 Tech Plaza",
    dateTime: "18.09.2019 - 02:45 PM",
    pieces: 150,
    amount: "$12,499",
    status: "Processing",
  },
];

const DealsTable = ({loading}) => {
  const { t } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState("October");

  // Dynamically update data based on selected month
  const tableData =
    selectedMonth === "October"
      ? dataOctober
      : [...dataOctober, ...additionalDataNovember];

  return (
    <>
      {!loading ? (
        <div className="p-4 text-black bg-white shadow-lg rounded-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{t("Deals Details")}</h2>
            <select
              className="border rounded px-3 py-1 text-sm"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option>October</option>
              <option>November</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left">{t("Product Name")}</th>
                  <th className="px-4 py-3 text-left">{t("Location")}</th>
                  <th className="px-4 py-3 text-left">{t("Date - Time")}</th>
                  <th className="px-4 py-3 text-left">{t("Piece")}</th>
                  <th className="px-4 py-3 text-left">{t("Amount")}</th>
                  <th className="px-4 py-3 text-left">{t("Status")}</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 flex items-center space-x-2">
                      <img
                        src={row.image}
                        alt={row.product}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{row.product}</span>
                    </td>
                    <td className="px-4 py-3">{row.location}</td>
                    <td className="px-4 py-3">{row.dateTime}</td>
                    <td className="px-4 py-3">{row.pieces}</td>
                    <td className="px-4 py-3">{row.amount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${
                          row.status === "Delivered"
                            ? "bg-green-500"
                            : row.status === "Shipped"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={"200px"}
          sx={{ bgcolor: "purple.600" }}
        />
      )}
    </>
  );
};

export default DealsTable;
