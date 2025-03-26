import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useCustomerDemographics } from "./useCustomerDemographics";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const CustomerDemographics = () => {
  const stateCityMap = useCustomerDemographics();

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold">Customer Demographics</h2>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name;
              const hasCustomers = stateCityMap[stateName] && stateCityMap[stateName].size > 0;
              const fillColor = hasCustomers ? "#6B46C1" : "#D6BCFA"; // Dark purple vs light purple

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor} // Use fill instead of className
                  stroke="#FFF" // Optional: Add border for clarity
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#805AD5", outline: "none" }, // Lighter purple on hover
                    pressed: { fill: "#553C9A", outline: "none" }, // Darker purple on click
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-900 rounded-full"></div>
          <span className="ml-2 text-sm">Has Customers</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
          <span className="ml-2 text-sm">No Customers</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerDemographics;
