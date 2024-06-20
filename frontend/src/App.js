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
        const url = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${url}/data`);
        setData(response.data);
        localStorage.setItem("data", JSON.stringify(response.data));
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
