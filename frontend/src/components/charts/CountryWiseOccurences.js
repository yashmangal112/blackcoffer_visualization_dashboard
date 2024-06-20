import React, { useMemo, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const CountryWiseOccurrences = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState("All");

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (selectedCountry === "All") return data;
    return data.filter((d) => d.country === selectedCountry);
  }, [selectedCountry, data]);

  const newData = useMemo(() => {
    if (!filteredData) return [];
    const countryCounts = {};
    filteredData.forEach((d) => {
      if (!countryCounts[d.country]) countryCounts[d.country] = 0;
      countryCounts[d.country] += 1;
    });
    return Object.values(countryCounts);
  }, [filteredData]);

  const countries = useMemo(() => {
    if (!data) return [];
    const countrySet = new Set(data.map((d) => d.country));
    return ["All", ...Array.from(countrySet)];
  }, [data]);

  const displayedCountries = useMemo(() => {
    if (!data) return [];
    if (selectedCountry === "All")
      return Array.from(new Set(data.map((d) => d.country)));
    return [selectedCountry];
  }, [selectedCountry, data]);

  return (
    <div className="p-8 m-5 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-center items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Country Wise Occurrence</h1>
        <FormControl className="w-1/3">
          <InputLabel id="country-select-label">Country</InputLabel>
          <Select
            labelId="country-select-label"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="bg-white"
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-full flex justify-center">
        <BarChart
          yAxis={[{ scaleType: "band", data: displayedCountries }]}
          series={[{ data: newData }]}
          layout="horizontal"
          width={600}
          height={300}
          className="animate-fade-in"
        />
      </div>
    </div>
  );
};

export default CountryWiseOccurrences;
