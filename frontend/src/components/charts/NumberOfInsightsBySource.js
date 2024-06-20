import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const InsightsBySource = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSource, setSelectedSource] = useState("");

  const sourceCounts = useMemo(() => {
    if (!data) return [];
    const counts = {};
    data.forEach((d) => {
      if (!counts[d.source]) counts[d.source] = 0;
      counts[d.source] += 1;
    });
    return counts;
  }, [data]);

  const sources = useMemo(() => {
    if (!data) return [];
    const sourceSet = new Set(data.map((d) => d.source));
    return Array.from(sourceSet);
  }, [data]);

  const chartData = useMemo(() => {
    return Object.keys(sourceCounts).map((source) => ({
      name: source,
      value: sourceCounts[source],
    }));
  }, [sourceCounts]);

  const handleFilterChange = (event) => {
    setSelectedSource(event.target.value);
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Value: ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <div className="p-5 m-5 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col">
      <h1 className="text-2xl font-bold mb-5">Number of Insights by Source</h1>
      <div className="flex justify-between items-center mb-5">
        <label htmlFor="sourceFilter" className="mr-3">
          Filter by Source:
        </label>
        <select
          id="sourceFilter"
          onChange={handleFilterChange}
          className="p-2 border border-gray-300"
        >
          <option value="">All Sources</option>
          {sources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {selectedSource && (
        <div className="mt-5">
          <h2 className="text-xl font-bold">Filtered Value</h2>
          <p>{`Source: ${selectedSource}, Count: ${sourceCounts[selectedSource]}`}</p>
        </div>
      )}
    </div>
  );
};

export default InsightsBySource;
