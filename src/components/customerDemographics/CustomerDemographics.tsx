"use client";
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

// Sample Data - Replace this with your actual API data
const stateData = [
  { id: "06", state: "California", members: 80, nonMembers: 20 },
  { id: "08", state: "Colorado", members: 40, nonMembers: 60 },
  { id: "17", state: "Illinois", members: 70, nonMembers: 30 },
  { id: "37", state: "North Carolina", members: 65, nonMembers: 35 },
  { id: "42", state: "Pennsylvania", members: 75, nonMembers: 25 },
  { id: "56", state: "Wyoming", members: 55, nonMembers: 45 },
];

// Define color scale
const colorScale = scaleQuantile<string>()
  .domain(stateData.map((d) => d.members))
  .range(["#E5D4FF", "#8B5CF6"]);

const CustomerDemographics: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-[1000]  " >
      <h2 className="text-lg font-semibold mb-2">Customer Demographic</h2>
      <div className="relative">
        <ComposableMap projection="geoAlbersUsa" width={800} height={200}>
          <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateInfo = stateData.find((s) => s.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={stateInfo ? colorScale(stateInfo.members) : "#EEE"}
                    stroke="#FFF"
                    className="transition duration-200 hover:opacity-75"
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-purple-700 inline-block rounded-full"></span>
          <span className="ml-2 text-sm">Majority Members</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 bg-purple-300 inline-block rounded-full"></span>
          <span className="ml-2 text-sm">Majority Non-Members</span>
        </div>
      </div>
    </div>
  );
};


export default CustomerDemographics;
