import React, { useState, useMemo } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#83a6ed",
  "#8dd1e1",
  "#82ca9d",
  "#a4de6c",
  "#d0ed57",
  "#ffc658",
];

const OccurrencesByTopic = ({ data }) => {
  const [selectedTopic, setSelectedTopic] = useState("");

  const topicCounts = useMemo(() => {
    if (!data) return {};
    const counts = {};
    data.forEach((d) => {
      if (!counts[d.topic]) counts[d.topic] = 0;
      counts[d.topic] += 1;
    });
    return counts;
  }, [data]);

  const topics = useMemo(() => {
    if (!data) return [];
    const topicSet = new Set(data.map((d) => d.topic));
    return Array.from(topicSet);
  }, [data]);

  const chartData = useMemo(() => {
    const filteredCounts = selectedTopic
      ? { [selectedTopic]: topicCounts[selectedTopic] }
      : topicCounts;
    return Object.keys(filteredCounts).map((topic, index) => ({
      name: topic,
      value: filteredCounts[topic],
      fill: COLORS[index % COLORS.length], // Assign color from the COLORS array
    }));
  }, [topicCounts, selectedTopic]);

  const handleFilterChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <div className="p-5 m-5 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col">
      <h1 className="text-2xl font-bold mb-5">Occurrences By Topics</h1>
      <div className="flex justify-between items-center mb-5">
        <label htmlFor="topicFilter" className="mr-3">
          Filter by Topic:
        </label>
        <select
          id="topicFilter"
          onChange={handleFilterChange}
          className="p-2 border border-gray-300"
        >
          <option value="">All Topics</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            barSize={10}
            data={chartData}
          >
            <RadialBar minAngle={15} background clockWise dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </RadialBar>
            <Legend />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      {selectedTopic && (
        <div className="mt-5">
          <h2 className="text-xl font-bold">Filtered Value</h2>
          <p>{`Topic: ${selectedTopic}, Count: ${topicCounts[selectedTopic]}`}</p>
        </div>
      )}
    </div>
  );
};

export default OccurrencesByTopic;
