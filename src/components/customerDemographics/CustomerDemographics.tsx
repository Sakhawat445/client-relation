"use client";
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

const stateData = [
  { id: "06", state: "California", members: 80, nonMembers: 20 },
  { id: "08", state: "Colorado", members: 40, nonMembers: 60 },
  { id: "17", state: "Illinois", members: 70, nonMembers: 30 },
  { id: "37", state: "North Carolina", members: 65, nonMembers: 35 },
  { id: "42", state: "Pennsylvania", members: 75, nonMembers: 25 },
  { id: "56", state: "Wyoming", members: 55, nonMembers: 45 },
];

const colorScale = scaleQuantile<string>()
  .domain(stateData.map((d) => d.members))
  .range(["#E5D4FF", "#8B5CF6"]);

const CustomerDemographics: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full mb-7">
      <h2 className="text-lg font-semibold mb-2">Customer Demographic</h2>

      <div className="relative mx-auto max-w-xl h-[300px]">
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1000 }}
          width={800}
          height={500}
          className="w-full h-full"
        >
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

      <div className="flex flex-col md:flex-row justify-center items-center mt-4 space-x-0 md:space-x-4 space-y-2 md:space-y-0">
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
