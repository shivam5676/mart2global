import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography, Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

const data = [
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

const SalesChart = () => {
  const{t}=useTranslation()
  return (
    <Card sx={{ p: 2, boxShadow: 3 }}>
      <CardContent>
        <div className="flex justify-between h-6 mb-4">
          <Typography variant="h6">{t("Sales Details")}</Typography>
          <Select defaultValue="October" size="small" sx={{ float: "right" }}>
            <MenuItem value="October">October</MenuItem>
            <MenuItem value="November">November</MenuItem>
          </Select>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
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
  );
};

export default SalesChart;
