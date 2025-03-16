import { Skeleton } from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import { FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";

const ProductReportCard = ({
  published,
  UnPublished,
  borderColor,
  overAllPercentageData,
  name,
  cardIcon,
  total,
  compareTo,
  // loading,
}) => {
  const loading = !true;
  const dispatch = useDispatch();
  // const total = (+published || 0) + (+UnPublished || 0);
  console.log(loading);
  return (
    <div className={`bg-white text-black  flex flex-col gap-4 p-4 rounded`}>
      <div className="flex justify-between">
        <div className="px-2 text-sm font-semibold text-gray-500 ">
          {!loading ? (
            <p className="">{name}</p>
          ) : (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={"140px"}
              height={"20px"}
              sx={{ bgcolor: "purple.600" }}
            />
          )}
          <div className="flex text-black text-xl">
            {!loading ? (
              <p>
                <CountUp end={total} duration={3}></CountUp>
              </p>
            ) : (
              <p className="mt-2">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={"80px"}
                  height={"20px"}
                  sx={{ bgcolor: "purple.600" }}
                />
              </p>
            )}
            {total > 0 && (
              <div className="flex items-center px-2">
                <FaArrowUp className="text-green-500" />
              </div>
            )}
          </div>
        </div>
        {!loading ? (
          <div className={`p-2 ${borderColor} h-fit rounded-md`}>
            <img src={cardIcon} className="h-[35px] w-[35px]"></img>
          </div>
        ) : (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={"50px"}
            height={"50px"}
            sx={{ bgcolor: "purple.600" }}
          />
        )}
      </div>
      <div className=" ">
        <div className="flex text-[.75rem] font-semibold justify-between py-1">
          {loading ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={"100px"}
              height={"40px"}
              sx={{ bgcolor: "purple.600" }}
            />
          ) : (
            overAllPercentageData >= 0 && (
              <div className="flex items-center">
                <MdOutlineTrendingUp className="text-blue-500 h-4 w-4 font-semibold" />

                <div className="px-2 flex gap-1">
                  <p className="text-blue-500">{overAllPercentageData || 0}%</p>
                  <p>Up {compareTo}</p>
                </div>
              </div>
            )
          )}
          {loading ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={"100px"}
              height={"40px"}
              sx={{ bgcolor: "purple.600" }}
            />
          ) : (
            overAllPercentageData < 0 && (
              <div className="flex items-center">
                {/* <MdOutlineTrendingUp /> */}

                <MdOutlineTrendingDown className="text-red-500 h-4 w-4 font-semibold" />
                {/* <MdOutlineTrendingDown /> */}

                <div className="px-2 flex gap-1 ">
                  <p className="text-red-500">{overAllPercentageData || 0}%</p>
                  <p>Down {compareTo}</p>
                </div>
              </div>
            )
          )}
        </div>{" "}
      </div>
      {/* <p className="text-[.8rem] text-gray-300 font-semibold">This Month Data</p> */}
    </div>
  );
};

export default ProductReportCard;
