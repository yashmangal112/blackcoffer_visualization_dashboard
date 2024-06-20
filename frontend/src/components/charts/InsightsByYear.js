import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const InsightsByYear = ({ data }) => {
  const [selectedYears, setSelectedYears] = useState([]);

  const yearCounts = useMemo(() => {
    if (!data) return [];
    const counts = {};
    data.forEach((d) => {
      if (!counts[d.start_year]) counts[d.start_year] = 0;
      counts[d.start_year] += 1;
    });
    return counts;
  }, [data]);

  const years = useMemo(() => {
    if (!data) return [];
    const yearSet = new Set(data.map((d) => d.start_year));
    return Array.from(yearSet);
  }, [data]);

  const filteredData = useMemo(() => {
    if (!selectedYears.length) return data;
    return data.filter((d) => selectedYears.includes(d.start_year));
  }, [data, selectedYears]);

  const chartData = useMemo(() => {
    if (!filteredData) return [];
    const counts = {};
    filteredData.forEach((d) => {
      if (!counts[d.start_year]) counts[d.start_year] = 0;
      counts[d.start_year] += 1;
    });
    return Object.keys(counts).map((year) => ({
      year,
      count: counts[year],
    }));
  }, [filteredData]);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedYears(value ? [value] : []);
  };

  return (
    <div className="p-5 m-5 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col">
      <h1 className="text-2xl font-bold mb-5">Count of Insights by Year</h1>
      <div className="flex justify-between items-center mb-5">
        <label htmlFor="yearFilter" className="mr-3">
          Filter by Year:
        </label>
        <select
          id="yearFilter"
          onChange={handleFilterChange}
          className="p-2 border border-gray-300"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="count"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InsightsByYear;
