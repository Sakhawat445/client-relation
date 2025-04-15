"use client";
import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const CityOrderMap: React.FC = () => {
  const [zoom, setZoom] = useState(1);
  const [tooltipData, setTooltipData] = useState<{
    name: string;
    orders: number;
    position: { x: number; y: number };
  } | null>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.5, 8));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.5, 1));

  const stateOrders: { [key: string]: number } = {
    Colorado: 1567,
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto relative mx-auto mt-6">
      <h2 className="text-md font-semibold text-gray-800 mb-3">
        City Order Statistics
      </h2>

      <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-[20rem] overflow-hidden">
        <ComposableMap
          projection="geoAlbersUsa"
          width={320}
          height={280}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup zoom={zoom} center={[-97, 38]}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const name = geo.properties.name;
                  const orders = stateOrders[name];

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={orders ? "#8B5CF6" : "#D6D6DA"}
                      stroke="#FFF"
                      className="transition duration-200 hover:fill-purple-400"
                      onMouseEnter={(e) => {
                        if (orders) {
                          const rect = (
                            e.target as Element
                          ).getBoundingClientRect();
                          setTooltipData({
                            name,
                            orders,
                            position: {
                              x: rect.x + rect.width / 2,
                              y: rect.y,
                            },
                          });
                        }
                      }}
                      onMouseLeave={() => setTooltipData(null)}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {tooltipData && (
          <div className="absolute z-10 bg-white shadow-xl p-3 rounded-lg w-40 text-sm transform -translate-x-1/2 -translate-y-full">
            <p className="font-semibold text-gray-800">{tooltipData.name}</p>
            <p className="text-xl font-bold text-black">
              {tooltipData.orders.toLocaleString()}{" "}
              <span className="text-sm font-medium text-gray-600">orders</span>
            </p>
            <p className="text-gray-500 text-xs mt-1">July 31, 2023</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center hover:bg-purple-700"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center hover:bg-purple-700"
        >
          –
        </button>
      </div>

      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => setZoom(1)}
          className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center hover:bg-purple-700"
        >
          ⤢
        </button>
      </div>
    </div>
  );
};

export default CityOrderMap;
