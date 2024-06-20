import React, { useMemo, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const AverageRelevanceByTopic = ({ data }) => {
  const [selectedTopic, setSelectedTopic] = useState("All");

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (selectedTopic === "All") return data;
    return data.filter((d) => d.topic === selectedTopic);
  }, [selectedTopic, data]);

  const newData = useMemo(() => {
    if (!filteredData) return [];
    const topicRelevance = {};
    const topicCounts = {};
    filteredData.forEach((d) => {
      if (!topicRelevance[d.topic]) {
        topicRelevance[d.topic] = 0;
        topicCounts[d.topic] = 0;
      }
      topicRelevance[d.topic] += d.relevance;
      topicCounts[d.topic] += 1;
    });
    const avgRelevance = {};
    Object.keys(topicRelevance).forEach((topic) => {
      avgRelevance[topic] = topicRelevance[topic] / topicCounts[topic];
    });
    return Object.values(avgRelevance);
  }, [filteredData]);

  const topics = useMemo(() => {
    if (!data) return [];
    const topicSet = new Set(data.map((d) => d.topic));
    return ["All", ...Array.from(topicSet)];
  }, [data]);

  const displayedTopics = useMemo(() => {
    if (!data) return [];
    if (selectedTopic === "All")
      return Array.from(new Set(data.map((d) => d.topic)));
    return [selectedTopic];
  }, [selectedTopic, data]);

  return (
    <div className="p-8 m-5 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-center items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Average Relevance by Topic</h1>
        <FormControl className="w-1/3">
          <InputLabel id="topic-select-label">Topic</InputLabel>
          <Select
            labelId="topic-select-label"
            value={selectedTopic}
            onChange={handleTopicChange}
            className="bg-white"
          >
            {topics.map((topic) => (
              <MenuItem key={topic} value={topic}>
                {topic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-full">
        <LineChart
          xAxis={[{ scaleType: "band", data: displayedTopics }]}
          series={[{ data: newData }]}
          borderRadius={15}
          width={600}
          height={300}
          className="animate-fade-in"
        />
      </div>
    </div>
  );
};

export default AverageRelevanceByTopic;
