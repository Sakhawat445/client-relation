import React from "react";
import { useCountrySalesData } from "./useCountrySalesData";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import Image from "next/image";

// Country coordinates for marker placement
const countryCoords: Record<string, [number, number]> = {
  "United States": [-99, 38],
  France: [2.35, 46.6],
  Canada: [-106, 56],
  Brazil: [-51, -10],
  Belgium: [4.4, 50.5],
  Pakistan: [69.34, 30.37],
  Italy: [12.5, 42.8],
  "United Kingdom": [-3.43, 55.38],
  Germany: [10.45, 51.16],
  India: [78.96, 20.59],
};

// Get country flag image URL (ISO 3166-1 alpha-2 country codes)
const getFlagUrl = (country: string) => {
  const countryCodes: Record<string, string> = {
    "United States": "us",
    France: "fr",
    Canada: "ca",
    Brazil: "br",
    Belgium: "be",
    Pakistan: "pk",
    Italy: "it",
    "United Kingdom": "gb",
    Germany: "de",
    India: "in",
  };
  return countryCodes[country] ? `https://flagcdn.com/w40/${countryCodes[country]}.png` : "";
};

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const CountrySalesStatistics = () => {
  const { totalOrders, salesData } = useCountrySalesData(); // 🔥 Fetch data from the hook

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold">Country Sales Statistics</h2>

      {/* World Map */}
      <ComposableMap projection="geoMercator">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} className="fill-gray-300 stroke-white" />
            ))
          }
        </Geographies>

        {salesData.map(({ country, sales }) =>
          countryCoords[country] ? (
            <Marker key={country} coordinates={countryCoords[country]}>
              <g transform="translate(-12, -12)">
                {/* Country Flag Image */}
                <image                  href={getFlagUrl(country)}
                  width="24"
                  height="16"
                  x="-12"
                  y="-18"
                />

                {/* Order Count */}
                <circle r={12} fill="#FF4D4D" stroke="white" strokeWidth={2} />
                <text x="0" y="4" textAnchor="middle" className="fill-white text-xs font-bold">
                  {sales.toLocaleString()}
                </text>
              </g>
            </Marker>
          ) : null
        )}
      </ComposableMap>

      {/* Sales Summary */}
      <div className="mt-4 text-center">
        <h3 className="text-2xl font-bold">{totalOrders.toLocaleString()} Orders</h3>
        <span className="text-green-500 text-sm">+5.6%</span>
      </div>

      {/* Sales List */}
      <div className="mt-4 space-y-3">
        {salesData.map(({ country, sales }) => (
          <div key={country} className="flex justify-between items-center border-b py-2">
            <div className="flex items-center">
              <Image src={getFlagUrl(country)|| "https://placehold.co/24x16"} width={24} height={16} alt={country} className="mr-2 rounded" />
              <span className="text-sm">{country}</span>
            </div>
            <span className="font-bold">{sales.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountrySalesStatistics;
