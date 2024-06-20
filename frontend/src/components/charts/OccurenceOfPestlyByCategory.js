import React, { useMemo } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const OccurrencesByPestle = ({ data }) => {
  const newData = useMemo(() => {
    if (!data) return [];
    const pestleCounts = {};
    data.forEach((d) => {
      if (!pestleCounts[d.pestle]) pestleCounts[d.pestle] = 0;
      pestleCounts[d.pestle] += 1;
    });
    return Object.values(pestleCounts);
  }, [data]);
  const pestleCategories = useMemo(() => {
    if (!data) return [];
    const pestleSet = new Set(data.map((d) => d.pestle));
    return Array.from(pestleSet);
  }, [data]);

  return (
    <div className="p-5 m-5 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Occurences by Pestle Category</h1>
      <div>
        <BarChart
          xAxis={[{ scaleType: "band", data: pestleCategories }]}
          series={[{ data: newData }]}
          width={500}
          height={300}
          className="animate-fade-in"
        />
      </div>
    </div>
  );
};

export default OccurrencesByPestle;
