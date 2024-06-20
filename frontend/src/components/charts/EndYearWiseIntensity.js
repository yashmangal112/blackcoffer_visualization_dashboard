import React, { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
];

const EndYearWiseIntensity = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState("All");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (selectedYear === "All") return data;
    return data.filter((d) => d.end_year === selectedYear);
  }, [selectedYear, data]);

  const newData = useMemo(() => {
    if (!filteredData) return [];
    const endYearIntensity = {};
    filteredData.forEach((d) => {
      if (!endYearIntensity[d.end_year]) endYearIntensity[d.end_year] = 0;
      endYearIntensity[d.end_year] += d.intensity;
    });
    return Object.entries(endYearIntensity).map(([key, value]) => ({
      name: key,
      value,
    }));
  }, [filteredData]);

  const endYears = useMemo(() => {
    if (!data) return [];
    const endYearSet = new Set(data.map((d) => d.end_year));
    return ["All", ...Array.from(endYearSet)];
  }, [data]);

  return (
    <div className="p-8 m-5 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-center items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">End Year Wise Intensity</h1>
        <FormControl className="w-1/3">
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {endYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-full flex justify-center">
        <PieChart width={500} height={300}>
          <Pie
            data={newData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {newData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default EndYearWiseIntensity;
