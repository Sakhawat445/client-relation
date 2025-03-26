"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useState } from "react";
import { useCityOrders } from "./useCityOrderMap";

interface SelectedState {
  state: string;
  orderCount: number;
  date: string;
}

const CityOrderMap = () => {
  const orders = useCityOrders();
  const [selectedState, setSelectedState] = useState<SelectedState | null>(null);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md relative">
      <h2 className="text-lg font-semibold">City Order Statistics</h2>

      {/* US Map */}
      <ComposableMap projection="geoAlbersUsa" className="mt-2">
        <Geographies geography="/us-states.json">
          {({ geographies }: { geographies: { rsmKey: string; properties: { name: string } }[] }) =>
            geographies.map((geo) => {
              const CountryData = orders.find((o) => o.Country === geo.properties.name);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => setSelectedState(CountryData ? { state: CountryData.Country, orderCount: CountryData.orderCount, date: CountryData.date } : { state: geo.properties.name, orderCount: 0, date: new Date().toISOString() })}
                  fill={CountryData ? "#6A5ACD" : "#DDD"} // Default gray if no data
                  className="cursor-pointer hover:opacity-80"
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Order Info Popup */}
      {selectedState && (
        <div className="absolute bg-white p-3 rounded-lg shadow-lg top-16 left-10">
          <p className="text-lg font-bold">{selectedState.state}</p>
          <p>{selectedState.orderCount} orders</p>
          <p className="text-sm text-gray-500">{new Date(selectedState.date).toDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default CityOrderMap;
