import React, { useMemo } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const OccurrencesBySector = ({ data }) => {
  const newData = useMemo(() => {
    if (!data) return [];
    const sectorCounts = {};
    data.forEach((d) => {
      if (!sectorCounts[d.sector]) sectorCounts[d.sector] = 0;
      sectorCounts[d.sector] += 1;
    });
    return Object.values(sectorCounts);
  }, [data]);
  const sectors = useMemo(() => {
    if (!data) return [];
    const sectorSet = new Set(data.map((d) => d.sector));
    return Array.from(sectorSet);
  }, [data]);

  return (
    <div className="p-5 m-5 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Occurences by Sector</h1>
      <div>
        <BarChart
          xAxis={[{ scaleType: "band", data: sectors }]}
          series={[{ data: newData }]}
          width={500}
          height={300}
          className="animate-fade-in"
        />
      </div>
    </div>
  );
};

export default OccurrencesBySector;
