"use client";

import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useState, useEffect } from "react";
import { useCityOrders } from "./useCityOrderMap"; // Ensure this hook returns an array of data

interface SelectedState {
  state: string;
  orderCount: number;
  date: string;
}

// Map of full state name to abbreviation
const stateNameMapping: Record<string, string> = {
  "Alabama": "AL",
  "Alaska": "AK",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "Florida": "FL",
  "Georgia": "GA",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Pennsylvania": "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY"
};

const CityOrderMap = () => {
  const orders = useCityOrders();
  // Debug orders data
  useEffect(() => {
    console.log("Orders Data:", orders);
  }, [orders]);

  const [selectedState, setSelectedState] = useState<SelectedState | null>(null);
  const [position, setPosition] = useState({ coordinates: [-97, 40], zoom: 1 });

  const handleMoveEnd = (pos: { coordinates: [number, number]; zoom: number }) => {
    if (pos && pos.coordinates && typeof pos.zoom === "number") {
      setPosition(pos);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md relative w-full md:w-160">
      <h2 className="text-lg font-semibold mb-2">City Order Statistics</h2>
      
      {/* ComposableMap uses the us-states.json file from the public folder */}
      <ComposableMap projection="geoAlbersUsa" width={800} height={500} style={{ width: "100%", height: "auto" }}>
        <ZoomableGroup center={position.coordinates} zoom={position.zoom} onMoveEnd={handleMoveEnd}>
          <Geographies geography="/us-states.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName: string = geo.properties.name;
                // Convert to abbreviation if available
                const stateAbbr = stateNameMapping[stateName] || stateName;
                const stateData = orders.find((o) => o.Country === stateAbbr);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() =>
                      setSelectedState(
                        stateData
                          ? {
                              state: stateAbbr,
                              orderCount: stateData.orderCount,
                              date: stateData.date,
                            }
                          : {
                              state: stateAbbr,
                              orderCount: 0,
                              date: new Date().toISOString(),
                            }
                      )
                    }
                    fill={stateData ? "#6A5ACD" : "#DDD"}
                    stroke="#FFF"
                    className="cursor-pointer hover:opacity-80"
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Popup with selected state data */}
      {selectedState && (
        <div className="absolute bg-white p-3 rounded-lg shadow-lg top-16 left-10 w-48">
          <p className="text-lg font-bold">{selectedState.state}</p>
          <p className="text-gray-700">{selectedState.orderCount.toLocaleString()} orders</p>
          <p className="text-sm text-gray-500">{new Date(selectedState.date).toDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default CityOrderMap;
