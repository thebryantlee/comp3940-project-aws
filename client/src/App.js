import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "devextreme/dist/css/dx.material.orange.dark.css";
import "./App.css";
import { DataGrid } from "devextreme-react";
import { Container } from "react-bootstrap";
import {
  FilterPanel,
  HeaderFilter,
  Summary,
  TotalItem,
  ColumnChooser,
  ColumnChooserSearch,
  ColumnChooserSelection,
} from "devextreme-react/data-grid";
import Login from "./Login"; // Import the Login component

function App() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const fetchData = () => {
    let options = {
      method: "GET",
    };
    fetch("http://localhost:8080/query-timestream", options)
      .then((data) => data.json())
      .catch(console.log)
      .then(setData);
  };

  const handleButtonClick = () => {
    fetchData();
  };

  const columns = [
    { dataField: "measure_value::varchar", dataType: "string" },
    { dataField: "truck_id", dataType: "string" },
    { dataField: "fleet", dataType: "string" },
    { dataField: "fuel_capacity", dataType: "number" },
    { dataField: "load_capacity", dataType: "number" },
    { dataField: "model", dataType: "string" },
    { dataField: "make", dataType: "string" },
    { dataField: "measure_name", dataType: "string", visible: false },
  ];

  // If the user is not logged in, render the Login component
  if (!isLoggedIn) {
    // Pass setIsLoggedIn directly to the Login component
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="h-100 w-100 app-container">
      <header className="App-header">
        <button className="car-button" onClick={handleButtonClick}>
          🚚 Fetch Data
        </button>
      </header>
      <div className="px-5">
        <DataGrid
          dataSource={data}
          columns={columns}
          allowColumnReordering={true}
          allowColumnResizing={true}
          height={"80vh"}
          noDataText="Please Fetch Data."
        >
          <HeaderFilter visible={true} />
          <FilterPanel visible={true} />
          <Summary>
            <TotalItem column="truck_id" summaryType="count" />
            <TotalItem column="fuel_capacity" summaryType="sum" />
            <TotalItem column="load_capacity" summaryType="sum" />
          </Summary>
          <ColumnChooser enabled={true} mode={"dragAndDrop"}>
            <ColumnChooserSelection
              allowSelectAll={true}
              selectByClick={true}
              recursive={true}
            />
          </ColumnChooser>
        </DataGrid>
      </div>
    </div>
  );
}

export default App;
