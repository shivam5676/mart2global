import React, { useEffect, useRef, useState } from "react";

import userIcon from "../../assests/dashboard/leader.gif";
import orderIcon from "../../assests/dashboard/cube.gif";
import salesIcon from "../../assests/dashboard/scalability.gif";
import pendingIcon from "../../assests/dashboard/hourglass.gif";

import ProductReportCard from "./ProductReportCard";

import {
  fetchContentViewsApi,
  fetchDashboardDataApi,
  fetchLatestUsersApi,
  fetchTopContentDataApi,
} from "../../Api/Dashboard/dashboardApi";

import SalesChart from "./Saleschart";
import DealsTable from "./DealsTable";
import { useTranslation } from "react-i18next";

const DashBoard = () => {
  const [cardsData, setCardsData] = useState(true);

  const { t, i18n } = useTranslation();
  useEffect(() => {
    setTimeout(() => {
      setCardsData(false);
    }, 1500);
  }, []);

  return (
    <div className=" w-[100%] h-[calc(100vh-70px)] overflow-y-scroll customScrollbar px-4 py-2 bg-gray-200">
      <div className={` px-2 py-2 `}>
        <div className="text-[.9rem] font-bold flex justify-between items-center">
          <p className="text-2xl font-semibold text-black">{t("DashBoard")}</p>
        </div>

        <section className="w-[100%]  grid xl:grid-cols-4 sm:grid-cols-2  gap-4 py-2">
          <ProductReportCard
            name={t("Total User")}
            cardIcon={userIcon}
            total={40689}
            overAllPercentageData={10}
            compareTo={t("from yesterday")}
            loading={cardsData}
            borderColor={"bg-blue-100"}
          />

          <ProductReportCard
            name={t("Total Order")}
            cardIcon={orderIcon}
            total={600}
            overAllPercentageData={6.7}
            compareTo={t("from past week")}
            loading={cardsData}
            borderColor={"bg-yellow-100"}
          />
          <ProductReportCard
            name={t("Total Sales")}
            cardIcon={salesIcon}
            total={99}
            overAllPercentageData={-2.4}
            compareTo={t("from yesterday")}
            loading={cardsData}
            borderColor={"bg-green-100"}
          />
          <ProductReportCard
            name={t("Total Pending")}
            cardIcon={pendingIcon}
            total={286}
            overAllPercentageData={4}
            compareTo={t("from yesterday")}
            loading={cardsData}
            borderColor={"bg-red-100"}
          />
        </section>

        <section className="w-[100%]   py-2 ">
          {" "}
          <SalesChart loading={cardsData} />
        </section>

        <DealsTable loading={cardsData}/>
      </div>
    </div>
  );
};

export default DashBoard;
