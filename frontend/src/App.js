import React, { useState, useEffect } from "react";
import axios from "axios";
import Main from "./components/Main";

const App = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("data");
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <Main data={data} />
    </div>
  );
};

export default App;
