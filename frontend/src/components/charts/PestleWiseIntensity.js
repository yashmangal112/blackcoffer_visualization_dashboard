import React, { useMemo } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const PestleWiseIntensity = ({ data }) => {
  const newData = useMemo(() => {
    if (!data) return [];
    const pestleIntensity = {};
    data.forEach((d) => {
      if (!pestleIntensity[d.pestle]) pestleIntensity[d.pestle] = 0;
      pestleIntensity[d.pestle] += d.intensity;
    });
    return Object.values(pestleIntensity);
  }, [data]);

  const pestleCategories = useMemo(() => {
    if (!data) return [];
    const pestleSet = new Set(data.map((d) => d.pestle));
    return Array.from(pestleSet);
  }, [data]);

  return (
    <div className="p-5 m-5 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Pestle Wise Intensity</h1>
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

export default PestleWiseIntensity;
