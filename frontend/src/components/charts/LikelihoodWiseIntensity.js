import React, { useState, useMemo } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LikelihoodWiseIntensity = ({ data }) => {
  const [selectedLikelihood, setSelectedLikelihood] = useState("");

  const likelihoods = useMemo(() => {
    if (!data) return [];
    const likelihoodSet = new Set(data.map((d) => d.likelihood));
    return Array.from(likelihoodSet);
  }, [data]);

  const chartData = useMemo(() => {
    if (!data) return [];
    const counts = {};
    data.forEach((d) => {
      if (!selectedLikelihood || d.likelihood === selectedLikelihood) {
        if (!counts[d.likelihood]) counts[d.likelihood] = 0;
        counts[d.likelihood] += d.intensity;
      }
    });
    return Object.keys(counts).map((likelihood) => ({
      likelihood,
      intensity: counts[likelihood],
    }));
  }, [data, selectedLikelihood]);

  const handleFilterChange = (event) => {
    setSelectedLikelihood(event.target.value);
  };

  return (
    <div className="p-5 m-5 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col">
      <h1 className="text-2xl font-bold mb-5">Likelihood Wise Intensity</h1>
      <div className="flex justify-between items-center mb-5">
        <label htmlFor="likelihoodFilter" className="mr-3">
          Filter by Likelihood:
        </label>
        <select
          id="likelihoodFilter"
          onChange={handleFilterChange}
          className="p-2 border border-gray-300"
        >
          <option value="">All Likelihoods</option>
          {likelihoods.map((likelihood) => (
            <option key={likelihood} value={likelihood}>
              {likelihood}
            </option>
          ))}
        </select>
      </div>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="likelihood" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="intensity" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="intensity" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LikelihoodWiseIntensity;
