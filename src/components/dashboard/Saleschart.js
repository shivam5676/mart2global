import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Skeleton,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const data1 = [
  { name: "5k", value: 20 },
  { name: "10k", value: 35 },
  { name: "15k", value: 50 },
  { name: "20k", value: 64.36 }, // Peak value
  { name: "25k", value: 45 },
  { name: "30k", value: 55 },
  { name: "35k", value: 30 },
  { name: "40k", value: 70 },
  { name: "45k", value: 60 },
  { name: "50k", value: 50 },
  { name: "55k", value: 55 },
  { name: "60k", value: 58 },
];

const data2 = [
  { name: "35k", value: 28 },
  { name: "10k", value: 8 },
  { name: "25k", value: 25 },
  { name: "20k", value: 64.36 }, // Peak value
  { name: "15k", value: 45 },
  { name: "10k", value: 55 },
  { name: "35k", value: 30 },
  { name: "50k", value: 70 },
  { name: "45k", value: 40 },
  { name: "50k", value: 50 },
  { name: "55k", value: 55 },
  { name: "30k", value: 58 },
];

const SalesChart = ({ loading }) => {
  const { t } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState("October");

  // Determine which data set to use
  const chartData = selectedMonth === "October" ? data1 : data2;

  return (
    <>
      {!loading ? (
        <Card sx={{ p: 2, boxShadow: 3 }}>
          <CardContent>
            <div className="flex justify-between h-6 mb-4">
              <Typography variant="h6">{t("Sales Details")}</Typography>
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                size="small"
                sx={{ float: "right" }}
              >
                <MenuItem value="October">October</MenuItem>
                <MenuItem value="November">November</MenuItem>
              </Select>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#007BFF"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={"300px"}
          sx={{ bgcolor: "purple.600" }}
        />
      )}
    </>
  );
};

export default SalesChart;
